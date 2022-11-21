import { UpdateHistoryProperty, TagProperty } from '@azure/arm-storage'
import { generateUniqueId } from '@cloudgraph/sdk'
import {
  AzureStorageContainer,
  AzureStorageContainerImmutabilityPolicyUpdateHistory,
  AzureStorageContainerLegalHoldTag,
} from '../../types/generated'
import { RawAzureStorageContainer } from './data'
import t from '../../properties/translations'

const formatImmutabilityPolicyUpdateHistory = ({
  update,
  immutabilityPeriodSinceCreationInDays,
  timestamp,
  objectIdentifier,
  tenantId,
  upn,
}: UpdateHistoryProperty): AzureStorageContainerImmutabilityPolicyUpdateHistory => {
  return {
    id: generateUniqueId({
      update,
      immutabilityPeriodSinceCreationInDays,
      timestamp,
      objectIdentifier,
      tenantId,
      upn,
    }),
    update,
    immutabilityPeriodSinceCreationInDays,
    timestamp: timestamp?.toUTCString() || '',
    objectIdentifier,
    tenantId,
    upn,
  }
}

const formatLegalHoldTag = ({
  tag,
  timestamp,
  objectIdentifier,
  tenantId,
  upn,
}: TagProperty): AzureStorageContainerLegalHoldTag => {
  return {
    id: generateUniqueId({
      tag,
      timestamp,
      objectIdentifier,
      tenantId,
      upn,
    }),
    tag,
    timestamp: timestamp?.toUTCString() || '',
    objectIdentifier,
    tenantId,
    upn,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureStorageContainer
  account: string
  region: string
}): AzureStorageContainer => {
  const {
    id,
    name,
    type,
    version,
    deleted,
    deletedTime,
    remainingRetentionDays,
    denyEncryptionScopeOverride,
    publicAccess,
    lastModifiedTime,
    leaseStatus,
    leaseDuration,
    immutabilityPolicy,
    legalHold,
    hasLegalHold,
    hasImmutabilityPolicy,
    resourceGroupId,
  } = service

  return {
    id,
    name,
    type,
    region,
    subscriptionId: account,
    version,
    deleted: deleted ? t.yes : t.no,
    deletedTime: deletedTime?.toUTCString() || '',
    remainingRetentionDays,
    denyEncryptionScopeOverride: denyEncryptionScopeOverride ? t.yes : t.no,
    publicAccess,
    lastModifiedTime: lastModifiedTime?.toUTCString() || '',
    leaseStatus,
    leaseDuration,
    immutabilityPolicyPeriodSinceCreationInDays:
      immutabilityPolicy?.immutabilityPeriodSinceCreationInDays || 0,
    immutabilityPolicyState: immutabilityPolicy?.state || '',
    immutabilityPolicyAllowProtectedAppendWrites:
      immutabilityPolicy?.allowProtectedAppendWrites ? t.yes : t.no,
    immutabilityPolicyUpdateHistory:
      immutabilityPolicy?.updateHistory?.map(history =>
        formatImmutabilityPolicyUpdateHistory(history)
      ) || [],
    legalHoldTags: legalHold?.tags?.map(tag => formatLegalHoldTag(tag)) || [],
    hasLegalHold: hasLegalHold ? t.yes : t.no,
    hasImmutabilityPolicy: hasImmutabilityPolicy ? t.yes : t.no,
    resourceGroupId,
  }
}
