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

Install the aws provider in CloudGraph

```console
cg init azure
```

## Authentication

Authenticate the CloudGraph Azure Provider any of the following ways:

- Credentials added using the init command

CloudGraph needs read permissions in order to ingest your data. To keep things easy you can use the same permissions that we use internally when we run CloudGraph to power AutoCloud. Here are the [Azure Docs](https://docs.autocloud.dev/connect-an-environment/azure) for generating the correct Service Principal with a Client Secret (feel free to leave out AutoCloud specific configuration).

## Supported Services

| Service                                     | Relations                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| adApplication                               | authRoleAssignment, adGroup, adServicePrincipal, adUser                   |
| adGroup                                     | adApplication, authRoleAssignment                                         |
| adIdentitySecurityDefaultsEnforcementPolicy |                                                                           |
| adServicePrincipal                          | adApplication, authRoleAssignment                                         |
| adUser                                      | adApplication, authRoleAssignment                                         |
| appServicePlan                              | resourceGroup, appServiceWebApp                                           |
| appServiceWebApp                            | resourceGroup, appServicePlan, storageAccount                             |
| authRoleAssignment                          | adApplication, adGroup, adServicePrincipal, adUser, authRoleDefinition    |
| authRoleDefinition                          | authRoleAssignment                                                        |
| containerRegistry                           | keyVault, resourceGroup                                                   |
| cdnCustomDomains                            | cdnEndpoints, resourceGroup                                               |
| cdnEndpoints                                | cdnCustomDomains, cdnOrigins, cdnOriginGroups, cdnProfiles, resourceGroup |
| cdnProfiles                                 | cdnEndpoints, resourceGroup                                               |
| cdnOrigins                                  | cdnEndpoints, cdnOriginGroups, resourceGroup                              |
| cdnOriginGroups                             | cdnEndpoints, cdnOrigins, resourceGroup                                   |
| databaseMySql                               | resourceGroup                                                             |
| databasePostgreSql                          | resourceGroup                                                             |
| databaseSql                                 | resourceGroup                                                             |
| databaseSqlVm                               | resourceGroup                                                             |
| disk                                        | resourceGroup, virtualMachine                                             |
| dns                                         | resourceGroup                                                             |
| eventGrid                                   | resourceGroup                                                             |
| eventHub                                    | resourceGroup, storageAccount                                             |
| firewall                                    | publicIp, virtualNetwork                                                  |
| functionApp                                 | resourceGroup                                                             |
| keyVault                                    | resourceGroup                                                             |
| monitorInsightsActivityLogAlertRule         |                                                                           |
| networkInterface                            | publicIp, resourceGroup, securityGroup, virtualMachine, virtualNetwork    |
| policyAssignment                            |                                                                           |
| privateDns                                  | resourceGroup                                                             |
| publicIp                                    | networkInterface, resourceGroup                                           |
| resourceGroup                               | **all services**                                                          |
| securityAssessments                         |                                                                           |
| securityGroup                               | networkInterface, resourceGroup                                           |
| securityPricings                            |                                                                           |
| securitySettings                            |                                                                           |
| storageAccount                              | resourceGroup, storageContainer                                           |
| storageContainer                            | resourceGroup, storageAccount                                             |
| virtualMachine                              | disk, networkInterface, resourceGroup, virtualNetwork                     |
| virtualMachineScaleSet                      | resourceGroup                                                             |
| virtualNetwork                              | networkInterface, resourceGroup virtualMachine                            |

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
