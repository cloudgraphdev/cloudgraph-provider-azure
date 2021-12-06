# CloudGraph Azure Provider

Scan cloud infrastructure via the [Azure SDK](https://github.com/Azure/azure-sdk-for-js)

<!-- toc -->
- [Install](#install)
- [Authentication](#authentication)
- [Supported Services](#supported-services)
<!-- tocstop -->

## Install

Install the aws provider in CloudGraph

```console
cg init azure
```

## Authentication

Authenticate the CloudGraph Azure Provider any of the following ways:

- Credentials added using the init command

## Supported Services

| Service          | Relations |
| ---------------- | --------- |
| disk             |           |
| functionApp      |           |
| networkInterface |           |
| publicIp         |           |
| resourceGroup    |           |
| securityGroup    |           |
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
