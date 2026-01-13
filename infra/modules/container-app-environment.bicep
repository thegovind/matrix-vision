targetScope = 'resourceGroup'

@description('Name of the Container App Environment')
param name string

@description('Location for the Container App Environment')
param location string = resourceGroup().location

@description('Tags to apply to the Container App Environment')
param tags object = {}

@description('Name of the Log Analytics workspace')
param logAnalyticsWorkspaceName string

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' existing = {
  name: logAnalyticsWorkspaceName
}

resource containerAppEnvironment 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: name
  location: location
  tags: tags
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalyticsWorkspace.properties.customerId
        sharedKey: logAnalyticsWorkspace.listKeys().primarySharedKey
      }
    }
    zoneRedundant: false
    workloadProfiles: [
      {
        name: 'Consumption'
        workloadProfileType: 'Consumption'
      }
    ]
  }
}

output id string = containerAppEnvironment.id
output name string = containerAppEnvironment.name
output defaultDomain string = containerAppEnvironment.properties.defaultDomain
