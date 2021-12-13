# CloudGraph Azure Provider

Scan cloud infrastructure via the [Azure SDK](https://github.com/Azure/azure-sdk-for-js)

<!-- toc -->
- [Docs](#docs)
- [Install](#install)
- [Authentication](#authentication)
- [Supported Services](#supported-services)
<!-- tocstop -->

# Docs

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

| Service          | Relations |
| ---------------- | --------- |
| disk             |           |
| dns              |           |
| functionApp      |           |
| networkInterface |           |
| publicIp         |           |
| resourceGroup    |           |
| securityGroup    |           |
| storageAccount   |           |
| virtualNetwork   |           |


## Development

Install all the dependencies:

```
yarn
```

Generate types and compile:

```
yarn build
```

## Testing

<!-- testing -->

<!-- testingstop -->
