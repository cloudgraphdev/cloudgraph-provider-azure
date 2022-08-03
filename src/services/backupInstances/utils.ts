import { SystemData } from '@azure/arm-recoveryservices'

export interface Datasource {
  datasourceType?: string
  objectType?: string
  resourceID?: string
  resourceLocation?: string
  resourceName?: string
  resourceType?: string
  resourceUri?: string
}

export interface DatasourceSet {
  datasourceType?: string
  objectType?: string
  resourceID?: string
  resourceLocation?: string
  resourceName?: string
  resourceType?: string
  resourceUri?: string
}

export interface AzureOperationalStoreParameters {
  dataStoreType?: string
  objectType?: string
  resourceGroupId?: string
}

export interface PolicyParameters {
  dataStoreParametersList?: AzureOperationalStoreParameters[]
}

export interface PolicyInfo {
  policyId?: string
  policyParameters?: PolicyParameters
  policyVersion?: string
}

export interface InnerError {
  additionalInfo?: {
    [propertyName: string]: string
  }
  code?: string
}

export interface UserFacingError {
  code?: string
  innerError?: InnerError
  isRetryable?: boolean
  isUserError?: boolean
  message?: string
  properties?: {
    [propertyName: string]: string
  }
  recommendedAction?: string[]
  target?: string
}

export interface ProtectionStatusDetails {
  errorDetails?: UserFacingError
  status?: string
}

export interface BackupInstance {
  currentProtectionState?: string
  dataSourceInfo?: Datasource
  dataSourceSetInfo?: DatasourceSet
  friendlyName?: string
  objectType?: string
  policyInfo?: PolicyInfo
  protectionErrorDetails?: UserFacingError
  protectionStatus?: ProtectionStatusDetails
  provisioningState?: string
}

export interface BackupInstanceResource {
  id?: string
  name?: string
  properties?: BackupInstance
  systemData?: SystemData
  type?: string
}
