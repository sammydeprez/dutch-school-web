@description('Location for all resources')
param location string = 'westeurope'

@description('Name of the Static Web App')
param staticWebAppName string = 'dutch-school-nairobi'

@description('SKU for the Static Web App')
@allowed(['Free', 'Standard'])
param sku string = 'Free'

// Azure Static Web App
resource staticWebApp 'Microsoft.Web/staticSites@2022-09-01' = {
  name: staticWebAppName
  location: location
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
  }
  tags: {
    project: 'dutch-school-web'
    environment: 'production'
  }
}

// Outputs
output staticWebAppName string = staticWebApp.name
output staticWebAppHostname string = staticWebApp.properties.defaultHostname
output staticWebAppId string = staticWebApp.id
