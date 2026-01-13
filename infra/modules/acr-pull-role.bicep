targetScope = 'resourceGroup'

@description('Name of the Container Registry')
param containerRegistryName string

@description('Principal ID of the managed identity')
param principalId string

// AcrPull role definition ID
var acrPullRoleDefinitionId = '7f951dda-4ed3-4680-a7ca-43fe172d538d'

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-11-01-preview' existing = {
  name: containerRegistryName
}

resource acrPullRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(containerRegistry.id, principalId, acrPullRoleDefinitionId)
  scope: containerRegistry
  properties: {
    principalId: principalId
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', acrPullRoleDefinitionId)
    principalType: 'ServicePrincipal'
  }
}
