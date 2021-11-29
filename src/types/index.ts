import { AzureServiceClientOptions } from '@azure/ms-rest-azure-js'
import { ServiceClientCredentials } from '@azure/ms-rest-js'
import { LinkedSubscription } from '@azure/ms-rest-nodeauth'
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

export interface BaseClientOptions extends AzureServiceClientOptions {
  baseUri?: string
}

export interface AzureConfig {
  credentials: ServiceClientCredentials
  subscriptions: LinkedSubscription[]
  options?: BaseClientOptions
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
  credentials: ServiceClientCredentials
}

export interface AzureServiceInput {
  regions: string
  config: AzureServiceConfig
  rawData: rawDataInterface[]
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
