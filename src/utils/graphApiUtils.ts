import { Client } from '@microsoft/microsoft-graph-client'
import { ClientOptions } from '@microsoft/microsoft-graph-client/lib/src/IClientOptions'
import { AzureServiceConfig } from '../types'
import { getAuthProviderViaMsalForGraph } from './authUtils'
import 'isomorphic-fetch'

export const fetchFromMSGraphClient = async ({
  config,
  path,
  scopes = ['https://graph.microsoft.com/.default'],
  defaultVersion = 'beta',
}: {
  config: AzureServiceConfig
  path: string
  scopes?: string[]
  defaultVersion?: string
}): Promise<any> => {
  const clientOptions: ClientOptions = {
    authProvider: await getAuthProviderViaMsalForGraph(config, scopes),
    defaultVersion,
  }
  const client = Client.initWithMiddleware(clientOptions)
  return client.api(path).get()
}

export class MSGraphClient {
  config: AzureServiceConfig

  basePath: string

  graphApiVersion: string

  permissionScopes: string[]

  constructor({
    apiVersion = 'v1.0',
    config,
    path,
    scopes = ['https://graph.microsoft.com/.default']
  }: {
    apiVersion?: string
    config: AzureServiceConfig
    path: string
    scopes?: string[]
  }) {
    this.config = config
    this.basePath = path
    this.graphApiVersion = apiVersion
    this.permissionScopes = scopes
  }

  async getData(path = ''): Promise<{
    '@odata.context'?: string
    '@odata.count'?: number
    value: any[]
  }> {
    return fetchFromMSGraphClient({
      config: this.config,
      path: `${this.basePath}${path}`,
      defaultVersion: this.graphApiVersion,
      scopes: this.permissionScopes
    })
  }
}
