targetScope = 'resourceGroup'

@description('Name of the User-Assigned Managed Identity')
param name string

@description('Location for the Managed Identity')
param location string = resourceGroup().location

@description('Tags to apply to the Managed Identity')
param tags object = {}

resource userAssignedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: name
  location: location
  tags: tags
}

output id string = userAssignedIdentity.id
output name string = userAssignedIdentity.name
output principalId string = userAssignedIdentity.properties.principalId
output clientId string = userAssignedIdentity.properties.clientId
