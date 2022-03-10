import { TokenCredential } from '@azure/core-http'
import { ClientSecretCredential } from '@azure/identity'
import { Opts } from '@cloudgraph/sdk'
import { Method } from 'axios'

export interface AzureCredentials {
  clientId: string
  tenantId: string
  clientSecret: string
  subscriptionId?: string
}

export interface rawDataInterface {
  name: string
  subscriptionId?: string
  data: any
}

export interface AzureConfig {
  credentials: ClientSecretCredential
  subscriptions: string[]
}

export interface Tags {
  key: string
  value: string
}

export interface TagMap {
  [property: string]: string
}

export interface RequestConfig {
  baseUrl?: string
  path: string
  data?: any
  verb?: Method
  headers?: { [key: string]: string }
}

export interface AzureServiceConfig {
  clientId?: string
  tenantId?: string
  clientSecret?: string
  subscriptionId: string
  credentials: ClientSecretCredential
  tokenCredentials: TokenCredential
}

export interface AzureServiceInput {
  regions: string
  config: AzureServiceConfig
  rawData: rawDataInterface[]
  opts: Opts
}

export interface AzureDebugScopeInitialData{
  service: string
  client: any
  scope: string
  operation?: string
}

export interface AzureDebugScope {
  service: string
  fullScope: string
}



export interface AzureRestApiNewClientParams {
  config: AzureServiceConfig
  scope: string
  kind: string
  options?: {
    $host?: string
    version: string
  }
  version?: string
  debug?: boolean
}

export interface AzureRestApiClientRequestParams {
  type: string
  resourceGroupName?: string
  filters?: string[]
}

export interface AzureDeliveryRuleConditionAction {
  name: string
  parameters: any
}