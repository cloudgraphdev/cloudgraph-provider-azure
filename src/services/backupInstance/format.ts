import cuid from 'cuid'
import {
  ProtectedItem,
  ProtectionState,
  AzureFileshareProtectedItemExtendedInfo,
  HealthStatus,
  AzureIaaSVMHealthDetails,
  ExtendedProperties,
  ErrorDetail,
  ProtectedItemHealthStatus,
} from '@azure/arm-recoveryservicesbackup'
import { isEmpty } from 'lodash'
import { RawAzureProtectedItemResource } from './data'
import {
  AzureBackupInstance,
  AzureBackupInstanceProperties,
  AzureBackupInstanceKpisHealths,
  AzureBackupInstanceKeyValue,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'

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
  kpisHealths?: AzureBackupInstanceKpisHealths
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
  sourceAssociations?: AzureBackupInstanceKeyValue[]
  fabricName?: string
  computerName?: string
  deferredDeleteSyncTimeInUTC?: number
}

const formatProperties = (
  properties?: RawAzureProtectedItem
): AzureBackupInstanceProperties => {
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
      id: cuid(),
      key,
      value: {
        resourceHealthStatus: kpisHealths[key]?.resourceHealthStatus,
        resourceHealthDetails:
          kpisHealths[key]?.resourceHealthDetails?.map(hd => ({
            id: cuid(),
            ...hd,
          })) || [],
      },
    })),
    healthDetails: healthDetails?.map(hd => ({ id: cuid(), ...hd })) || [],
    sourceAssociations: Object.keys(sourceAssociations ?? {}).map(key => ({
      id: cuid(),
      key,
      value: sourceAssociations[key],
    })),
    ...rest,
  }
}

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureProtectedItemResource
  account: string
}): AzureBackupInstance => {
  const { id, name, type, region, eTag, properties, resourceGroupId } =
    service
  return {
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    eTag,
    properties: formatProperties(properties as RawAzureProtectedItem),
  }
}
