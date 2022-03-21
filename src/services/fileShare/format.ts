import cuid from 'cuid'

import { AzureFileShare } from '../../types/generated'
import { RawAzureFileShareItem } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureFileShareItem
  account: string
  region: string
}): AzureFileShare => {
  const {
    id,
    name,
    resourceGroupId,
    lastModifiedTime,
    shareQuota,
    enabledProtocols,
    rootSquash,
    version,
    deleted,
    deletedTime,
    remainingRetentionDays,
    accessTier,
    accessTierChangeTime,
    accessTierStatus,
    shareUsageBytes,
    leaseStatus,
    leaseState,
    leaseDuration,
    snapshotTime,
  } = service

  return {
    id: id || cuid(),
    name,
    subscriptionId: account,
    resourceGroupId,
    region,
    lastModifiedTime: lastModifiedTime?.toISOString(),
    shareQuota,
    enabledProtocols,
    rootSquash,
    version,
    deleted,
    deletedTime: deletedTime?.toISOString(),
    remainingRetentionDays,
    accessTier,
    accessTierChangeTime: accessTierChangeTime?.toISOString(),
    accessTierStatus,
    shareUsageBytes,
    leaseStatus,
    leaseState,
    leaseDuration,
    snapshotTime: snapshotTime?.toISOString(),
  }
}
