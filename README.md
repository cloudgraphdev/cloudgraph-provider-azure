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

| Service                | Relations                                                              |
| ---------------------- | ---------------------------------------------------------------------- |
| authRoleAssignment     |                                                                        |
| authRoleDefinition     |                                                                        |
| disk                   | resourceGroup, virtualMachine                                          |
| dns                    | resourceGroup                                                          |
| firewall               | publicIp, virtualNetwork                                               |
| functionApp            | resourceGroup                                                          |
| keyVault               | resourceGroup                                                          |
| networkInterface       | publicIp, resourceGroup, securityGroup, virtualMachine, virtualNetwork |
| policyAssignment       |                                                                        |
| publicIp               | networkInterface, resourceGroup                                        |
| resourceGroup          | **all services**                                                       |
| securityAssessments    |                                                                        |
| securityGroup          | networkInterface, resourceGroup                                        |
| securityPricings       |                                                                        |
| securitySettings       |                                                                        |
| storageAccount         | resourceGroup, storageContainer                                        |
| storageContainer       | resourceGroup, storageAccount                                          |
| virtualMachine         | disk, networkInterface, resourceGroup, virtualNetwork                  |
| virtualMachineScaleSet | resourceGroup                                                          |
| virtualNetwork         | networkInterface, resourceGroup virtualMachine                         |

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
