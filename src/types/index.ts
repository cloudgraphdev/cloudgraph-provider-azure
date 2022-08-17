import { TokenCredential } from '@azure/core-http'
import { ClientSecretCredential } from '@azure/identity'
import { Opts } from '@cloudgraph/sdk'
import { Method } from 'axios'
import { SystemData } from '@azure/arm-recoveryservices'

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

export interface AzureDebugScopeInitialData {
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

export interface AzureError extends Error {
  statusCode?: any
}

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

export interface AzureBackupParams {
  backupType?: string
  objectType?: string
}

export interface DataStoreInfoBase {
  dataStoreType?: string
  objectType?: string
}

export interface RetentionTag {
  id?: string
  tagName: string
  eTag?: string
}

export interface Day {
  date?: number
  isLast?: boolean
}

export interface ScheduleBasedBackupCriteria {
  absoluteCriteria?: string[]
  daysOfMonth?: Day[]
  daysOfTheWeek?: string[]
  monthsOfYear?: string[]
  objectType?: string
  scheduleTimes?: string[]
  weeksOfTheMonth?: string[]
}

export interface TaggingCriteria {
  tagInfo?: RetentionTag
  isDefault?: boolean
  taggingPriority?: number
  criteria?: ScheduleBasedBackupCriteria[]
}

export interface BackupSchedule {
  repeatingTimeIntervals: string[]
  timeZone?: string
}

export interface TriggerContext {
  objectType?: string
  schedule?: BackupSchedule
  taggingCriteria?: TaggingCriteria[]
}

export interface AbsoluteOption {
  duration?: string
  objectType?: string
}

export interface TargetCopySetting {
  copyAfter?: AbsoluteOption
  dataStore?: DataStoreInfoBase
}

export interface SourceLifeCycle {
  deleteAfter?: AbsoluteOption
  sourceDataStore?: DataStoreInfoBase
  targetDataStoreCopySettings?: TargetCopySetting[]
}

export interface AzureBackupRule {
  backupParameters?: AzureBackupParams
  dataStore?: DataStoreInfoBase
  name?: string
  objectType?: string
  trigger?: TriggerContext
  isDefault?: boolean
  lifecycles?: SourceLifeCycle[]
}

export interface BackupPolicy {
  datasourceTypes?: string[]
  objectType?: string
  policyRules?: AzureBackupRule[]
}

export interface BackupPolicyResource {
  id?: string
  name?: string
  properties?: BackupPolicy
  systemData?: SystemData
  type?: string
}

export interface DppIdentityDetails {
  type?: string
  principalId?: string
  tenantId?: string
}

export interface StorageSetting {
  datastoreType?: string
  type?: string
}

export interface BackupVault {
  provisioningState?: string
  storageSettings?: StorageSetting[]
  isVaultProtectedByResourceGuard?: boolean
}

export interface BackupVaultResource {
  id?: string
  name?: string
  type?: string
  location?: string
  tags?: {
    [propertyName: string]: string
  }
  eTag?: string
  identity: DppIdentityDetails
  properties: BackupVault
  region: string
  resourceGroupId: string
}
