# CloudGraph Azure Provider

Scan cloud infrastructure via the [Azure SDK](https://github.com/Azure/azure-sdk-for-js)

<!-- toc -->

- [Install](#install)
- [Authentication](#authentication)
- [Supported Services](#supported-services)
<!-- tocstop -->

## Docs

⭐ [CloudGraph Readme](https://github.com/cloudgraphdev/cli)

💻 [Full CloudGraph Documentation Including Azure Examples](https://docs.cloudgraph.dev)

## Install

Install the azure provider in CloudGraph

```console
cg init azure
```

## Authentication

Authenticate the CloudGraph Azure Provider any of the following ways:

- Credentials added using the init command

CloudGraph needs read permissions in order to ingest your data. To keep things easy you can use the same permissions that we use internally when we run CloudGraph to power AutoCloud. Here are the [Azure Docs](https://docs.autocloud.dev/connect-an-environment/azure) for generating the correct Service Principal with a Client Secret (feel free to leave out AutoCloud specific configuration).

## Supported Services

| Service                                     | Relations                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------------- |
| actionGroup                                 | resourceGroup, authRoleDefinition, eventHub, functionApp                      |
| activityLogAlerts                           | resourceGroup                                                                 |
| adApplication                               | authRoleAssignment, adGroup, adServicePrincipal, adUser                       |
| adGroup                                     | adApplication, authRoleAssignment                                             |
| adIdentitySecurityDefaultsEnforcementPolicy |                                                                               |
| adServicePrincipal                          | adApplication, authRoleAssignment                                             |
| adUser                                      | adApplication, authRoleAssignment                                             |
| aksManagedCluster                           | resourceGroup, virtualMachineScaleSet                                         |
| applicationGateway                          | resourceGroup                                                                 |
| appInsights                                 | resourceGroup                                                                 |
| appServiceEnvironment                       | resourceGroup, virtualNetwork                                                 |
| appServicePlan                              | resourceGroup, appServiceWebApp                                               |
| appServiceWebApp                            | resourceGroup, appServicePlan, storageAccount                                 |
| arcConnectedCluster                         | resourceGroup                                                                 |
| authRoleAssignment                          | adApplication, adGroup, adServicePrincipal, adUser, authRoleDefinition        |
| authRoleDefinition                          | actionGroup, authRoleAssignment                                               |
| autoProvisioningSettings                    |                                                                               |
| backupInstance                              | backupVaults, resourceGroup                                                   |
| backupPolicy                                | backupVaults, resourceGroup                                                   |
| backupVaults                                | backupInstances, backupPolicies, resourceGroup                                |
| cdnCustomDomains                            | cdnEndpoints, resourceGroup                                                   |
| cdnEndpoints                                | cdnCustomDomains, cdnOrigins, cdnOriginGroups, cdnProfiles, resourceGroup     |
| cdnProfiles                                 | cdnEndpoints, resourceGroup                                                   |
| cdnOrigins                                  | cdnEndpoints, cdnOriginGroups, resourceGroup                                  |
| cdnOriginGroups                             | cdnEndpoints, cdnOrigins, resourceGroup                                       |
| cognitiveServicesAccount                    | resourceGroup                                                                 |
| containerRegistry                           | keyVault, resourceGroup                                                       |
| cosmosDb                                    | resourceGroup                                                                 |
| dataCollectionRule                          | resourceGroup, logAnalyticsWorkspace                                          |
| dataFactory                                 | integrationRuntime, resourceGroup                                             |
| databaseManagedSqlInstance                  | resourceGroup                                                                 |
| databaseMySql                               | resourceGroup, mySqlServers                                                   |
| databasePostgreSql                          | resourceGroup, postgreSqlServers                                              |
| databaseSql                                 | resourceGroup, sqlServers                                                     |
| databaseSqlVm                               | resourceGroup                                                                 |
| dataLakeStorageAccounts                     | resourceGroup                                                                 |
| diagnosticSettings                          | resourceGroup, storageAccount                                                 |
| disk                                        | resourceGroup, virtualMachine                                                 |
| dns                                         | resourceGroup                                                                 |
| eventGrid                                   | resourceGroup                                                                 |
| eventHub                                    | resourceGroup, actionGroup, storageAccount                                    |
| expressRouteGateways                        | resourceGroup                                                                 |
| fileShare                                   | resourceGroup, storageAccount                                                 |
| firewall                                    | publicIp, virtualNetwork                                                      |
| functionApp                                 | resourceGroup, actionGroup                                                    |
| integrationRuntime                          | dataFactory, resourceGroup                                                    |
| keyVault                                    | resourceGroup                                                                 |
| loadBalancer                                | loadBalancer, publicIp, resourceGroup, virtualNetwork                         |
| logAnalyticsSolution                        | resourceGroup, logAnalyticsWorkspace                                          |
| logAnalyticsWorkspace                       | resourceGroup, dataCollectionRule, logAnalyticsSolution                       |
| logProfiles                                 | storageAccount                                                                |
| machineLearningWorkspaces                   | resourceGroup                                                                 |
| metricAlert                                 | resourceGroup                                                                 |
| mySqlServers                                | resourceGroup, databaseMySql                                                  |
| networkInterface                            | publicIp, resourceGroup, securityGroup, virtualMachine, virtualNetwork        |
| networkWatcher                              | resourceGroup                                                                 |
| policyAssignment                            |                                                                               |
| postgreSqlServers                           | resourceGroup, databasePostgreSql                                             |
| privateDns                                  | resourceGroup                                                                 |
| publicIp                                    | networkInterface, resourceGroup                                               |
| recoveryInstances                           | recoveryVaults, resourceGroup                                                 |
| recoveryPolicies                            | recoveryVaults, resourceGroup                                                 |
| recoveryVaults                              | recoveryInstances, recoveryPolicies, resourceGroup                            |
| redisCaches                                 | resourceGroup                                                                 |
| replicationAppliances                       | resourceGroup                                                                 |
| replicationCenters                          | resourceGroup                                                                 |
| replicationNetworks                         | resourceGroup                                                                 |
| replicationPolicies                         | resourceGroup                                                                 |
| resourceGroup                               | **all services**                                                              |
| routeFilter                                 |                                                                               |
| routeTable                                  |                                                                               |
| securityAssessments                         |                                                                               |
| securityContacts                            |                                                                               |
| securityGroup                               | networkInterface, resourceGroup                                               |
| securityPricings                            |                                                                               |
| securitySettings                            |                                                                               |
| serviceBus                                  | resourceGroup                                                                 |
| sqlServers                                  | databaseSql, resourceGroup                                                    |
| storageAccount                              | diagnosticSetting, logProfiles, resourceGroup, storageContainer               |
| storageBlob                                 | resourceGroup, storageContainer                                               |
| storageContainer                            | resourceGroup, storageAccount                                                 |
| synapseBigDataPools                         | resourceGroup, synapseWorkspaces                                              |
| synapseSqlPools                             | resourceGroup, synapseWorkspaces                                              |
| synapseWorkspaces                           | resourceGroup, synapseBigDataPools, synapseSqlPools                           |
| trafficManager                              | resourceGroup                                                                 |
| virtualMachine                              | disk, networkInterface, resourceGroup, virtualNetwork, virtualMachineScaleSet |
| virtualMachineScaleSet                      | resourceGroup, virtualMachine, aksManagedCluster                              |
| virtualNetwork                              | appServiceEnvironment,networkInterface, resourceGroup virtualMachine          |

## Development

Install all the dependencies:

```console
yarn
```

Generate types and compile:

```console
yarn build
```

## Testing

<!-- testing -->

<!-- testingstop -->
