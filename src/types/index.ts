import { AzureServiceClientOptions } from '@azure/ms-rest-azure-js'
import { ServiceClientCredentials } from '@azure/ms-rest-js'
import { LinkedSubscription } from '@azure/ms-rest-nodeauth'

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
