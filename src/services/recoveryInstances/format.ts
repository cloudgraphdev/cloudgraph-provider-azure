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
import cuid from 'cuid'
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
}

const formatProperties = (
  properties?: RawAzureProtectedItem
): AzureRecoveryInstanceProperties => {
  if (isEmpty(properties)) {
    return {}
  }
  const {
    protectedItemType,
    backupManagementType,
    workloadType,
    containerName,
    sourceResourceId,
    policyId,
    backupSetName,
    createMode,
    isScheduledForDeferredDelete,
    deferredDeleteTimeRemaining,
    isDeferredDeleteScheduleUpcoming,
    isRehydrate,
    resourceGuardOperationRequests,
    isArchiveEnabled,
    policyName,
    friendlyName,
    protectionStatus,
    protectionState,
    lastBackupStatus,
    virtualMachineId,
    healthStatus,
    protectedItemDataId,
    serverName,
    parentName,
    parentType,
    protectedItemDataSourceId,
    protectedItemHealthStatus,
    backupEngineName,
    protectedItemId,
    fabricName,
    computerName,
    deferredDeleteSyncTimeInUTC,
    lastRecoveryPoint,
    deferredDeleteTimeInUTC,
    lastBackupTime,
    extendedInfo = {},
    kpisHealths = {},
    healthDetails = [],
    sourceAssociations = [],
  } = properties
  const {
    oldestRecoveryPoint,
    resourceStateSyncTime,
    lastRefreshedAt,
    recoveryPointCount,
    policyState,
    resourceState,
    policyInconsistent,
  } = extendedInfo

  return {
    protectedItemType,
    backupManagementType,
    workloadType,
    containerName,
    sourceResourceId,
    policyId,
    backupSetName,
    createMode,
    isScheduledForDeferredDelete,
    deferredDeleteTimeRemaining,
    isDeferredDeleteScheduleUpcoming,
    isRehydrate,
    resourceGuardOperationRequests,
    isArchiveEnabled,
    policyName,
    friendlyName,
    protectionStatus,
    protectionState,
    lastBackupStatus,
    virtualMachineId,
    healthStatus,
    protectedItemDataId,
    serverName,
    parentName,
    parentType,
    protectedItemDataSourceId,
    protectedItemHealthStatus,
    backupEngineName,
    protectedItemId,
    fabricName,
    computerName,
    deferredDeleteSyncTimeInUTC,
    lastRecoveryPoint: lastRecoveryPoint?.toISOString(),
    deferredDeleteTimeInUTC: deferredDeleteTimeInUTC?.toISOString(),
    lastBackupTime: lastBackupTime?.toISOString(),
    extendedInfo: {
      oldestRecoveryPoint: oldestRecoveryPoint?.toISOString(),
      resourceStateSyncTime: resourceStateSyncTime?.toISOString(),
      lastRefreshedAt: lastRefreshedAt?.toISOString(),
      recoveryPointCount,
      policyState,
      resourceState,
      policyInconsistent,
    },
    kpisHealths: Object.keys(kpisHealths ?? {}).map(key => ({
      id: cuid(),
      key,
      value: {
        resourceHealthStatus: kpisHealths[key]?.resourceHealthStatus,
        resourceHealthDetails:
          kpisHealths[key]?.resourceHealthDetails?.map(hd => ({
            id: cuid(),
            code: hd.code,
            title: hd.title,
            message: hd.message,
            recommendations: hd.recommendations || [],
          })) || [],
      },
    })),
    healthDetails: healthDetails?.map(hd => ({ id: cuid(), ...hd })) || [],
    sourceAssociations: Object.keys(sourceAssociations ?? {}).map(key => ({
      id: cuid(),
      key,
      value: sourceAssociations[key],
    })),
  }
}

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureProtectedItemResource
  account: string
}): AzureBackupInstance => {
  const { id, name, type, region, eTag, properties, resourceGroupId } = service
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
