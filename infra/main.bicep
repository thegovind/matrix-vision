targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the environment used to generate resource names')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Tags to apply to all resources')
param tags object = {}

@description('Custom domain for the web app (leave empty to skip)')
param webCustomDomain string = 'vla-tutorial.coreai.diy'

@description('Managed certificate name for custom domain (must match existing cert in Azure)')
param webManagedCertificateName string = 'vla-tutorial.coreai.diy-cae-eodg-260112065648'

// Generate unique suffix for resource names
var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))

// Compute tags with azd environment name
var computedTags = union(tags, {
  'azd-env-name': environmentName
})

// Resource group
resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: '${abbrs.resourcesResourceGroups}${environmentName}'
  location: location
  tags: computedTags
}

// Log Analytics workspace
module logAnalytics './modules/log-analytics.bicep' = {
  name: 'log-analytics'
  scope: rg
  params: {
    name: '${abbrs.operationalInsightsWorkspaces}${resourceToken}'
    location: location
    tags: computedTags
  }
}

// Container Registry
module containerRegistry './modules/container-registry.bicep' = {
  name: 'container-registry'
  scope: rg
  params: {
    name: '${abbrs.containerRegistryRegistries}${resourceToken}'
    location: location
    tags: computedTags
  }
}

// User-assigned managed identity
module userAssignedIdentity './modules/user-managed-identity.bicep' = {
  name: 'user-managed-identity'
  scope: rg
  params: {
    name: '${abbrs.managedIdentityUserAssignedIdentities}${resourceToken}'
    location: location
    tags: computedTags
  }
}

// Role assignment for ACR pull
module acrPullRole './modules/acr-pull-role.bicep' = {
  name: 'acr-pull-role'
  scope: rg
  params: {
    containerRegistryName: containerRegistry.outputs.name
    principalId: userAssignedIdentity.outputs.principalId
  }
}

// Container App Environment
module containerAppEnvironment './modules/container-app-environment.bicep' = {
  name: 'container-app-environment'
  scope: rg
  params: {
    name: '${abbrs.appManagedEnvironments}${resourceToken}'
    location: location
    tags: computedTags
    logAnalyticsWorkspaceName: logAnalytics.outputs.name
  }
}

// Container App for web frontend
module web './modules/container-app.bicep' = {
  name: 'web'
  scope: rg
  params: {
    name: '${abbrs.appContainerApps}web-${resourceToken}'
    location: location
    tags: union(computedTags, {
      'azd-service-name': 'web'
    })
    containerAppEnvironmentName: containerAppEnvironment.outputs.name
    containerRegistryName: containerRegistry.outputs.name
    userAssignedIdentityName: userAssignedIdentity.outputs.name
    targetPort: 8080
    external: true
    minReplicas: 1
    maxReplicas: 10
    customDomains: !empty(webCustomDomain) ? [
      {
        name: webCustomDomain
        bindingType: 'SniEnabled'
        certificateId: '${containerAppEnvironment.outputs.id}/managedCertificates/${webManagedCertificateName}'
      }
    ] : []
  }
  dependsOn: [
    acrPullRole
  ]
}

// Outputs
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output AZURE_RESOURCE_GROUP string = rg.name
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = containerRegistry.outputs.loginServer
output AZURE_CONTAINER_REGISTRY_NAME string = containerRegistry.outputs.name
output SERVICE_WEB_NAME string = web.outputs.name
output SERVICE_WEB_URI string = web.outputs.uri
