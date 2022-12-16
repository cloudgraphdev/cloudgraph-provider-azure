import {
  AzureFileshareProtectedItemExtendedInfo,
  AzureIaaSVMHealthDetails,
  ErrorDetail,
  ExtendedProperties,
  HealthStatus,
  ProtectedItem,
  ProtectedItemHealthStatus,
  ProtectionState,
} from '@azure/arm-recoveryservicesbackup'
import { generateUniqueId } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import {
  AzureRecoveryInstance,
  AzureRecoveryInstanceKeyValue,
  AzureRecoveryInstanceKpisHealths,
  AzureRecoveryInstanceProperties,
} from '../../types/generated'
import { RawAzureProtectedItemResource } from './data'

export interface RawAzureAzureFileshareProtectedItemExtendedInfo
  extends AzureFileshareProtectedItemExtendedInfo {
  policyInconsistent?: boolean
  lastRefreshedAt?: Date
}

export interface RawAzureProtectedItem extends ProtectedItem {
  friendlyName?: string
  protectionStatus?: string
  protectionState?: ProtectionState
  lastBackupStatus?: string
  lastBackupTime?: Date
  kpisHealths?: AzureRecoveryInstanceKpisHealths
  extendedInfo?: RawAzureAzureFileshareProtectedItemExtendedInfo
  virtualMachineId?: string
  healthStatus?: HealthStatus
  healthDetails?: AzureIaaSVMHealthDetails[]
  protectedItemDataId?: string
  extendedProperties?: ExtendedProperties
  serverName?: string
  parentName?: string
  parentType?: string
  lastBackupErrorDetail?: ErrorDetail
  protectedItemDataSourceId?: string
  protectedItemHealthStatus?: ProtectedItemHealthStatus
  backupEngineName?: string
  policyState?: string
  protectedItemId?: number
  sourceAssociations?: AzureRecoveryInstanceKeyValue[]
  fabricName?: string
  computerName?: string
  deferredDeleteSyncTimeInUTC?: number
  softDeleteRetentionPeriod?: number
  ConfiguredRPGenerationFrequency?: string
  vaultId?: string
}

const formatProperties = (
  properties?: RawAzureProtectedItem
): AzureRecoveryInstanceProperties => {
  if (isEmpty(properties)) {
    return {}
  }
  const {
    lastRecoveryPoint,
    deferredDeleteTimeInUTC,
    lastBackupTime,
    extendedInfo = {},
    kpisHealths = {},
    healthDetails = [],
    sourceAssociations = [],
    ConfiguredRPGenerationFrequency,
    ...rest
  } = properties
  const {
    oldestRecoveryPoint,
    resourceStateSyncTime,
    lastRefreshedAt,
    ...restExtendedInfo
  } = extendedInfo

  return {
    lastRecoveryPoint: lastRecoveryPoint?.toISOString(),
    deferredDeleteTimeInUTC: deferredDeleteTimeInUTC?.toISOString(),
    lastBackupTime: lastBackupTime?.toISOString(),
    extendedInfo: {
      oldestRecoveryPoint: oldestRecoveryPoint?.toISOString(),
      resourceStateSyncTime: resourceStateSyncTime?.toISOString(),
      lastRefreshedAt: lastRefreshedAt?.toISOString(),
      ...restExtendedInfo,
    },
    kpisHealths: Object.keys(kpisHealths ?? {}).map(key => ({
      id: generateUniqueId({
        ...kpisHealths[key]
      }),
      key,
      value: {
        resourceHealthStatus: kpisHealths[key]?.resourceHealthStatus,
        resourceHealthDetails:
          kpisHealths[key]?.resourceHealthDetails?.map(hd => ({
            id: generateUniqueId({
              ...hd
            }),
            ...hd,
          })) || [],
      },
    })),
    healthDetails:
      healthDetails?.map(hd => ({
        id: generateUniqueId({
          ...hd,
        }),
        ...hd,
      })) || [],
    sourceAssociations: Object.keys(sourceAssociations ?? {}).map(key => ({
      id: generateUniqueId({
        key,
        value: sourceAssociations[key],
      }),
      key,
      value: sourceAssociations[key],
    })),
    configuredRPGenerationFrequency: ConfiguredRPGenerationFrequency,
    ...rest,
  }
}

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureProtectedItemResource
  account: string
}): AzureRecoveryInstance => {
  const { id, name, type, region, eTag, properties, resourceGroupId } = service
  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    eTag,
    properties: formatProperties(properties as RawAzureProtectedItem),
  }
}
