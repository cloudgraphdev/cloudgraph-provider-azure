import cuid from 'cuid'
import { RawAzureSynapseSqlPool } from './data'
import { AzureSynapseSqlPool } from '../../types/generated'

export default ({
  service,
  account: subscriptionId
}: {
  service : RawAzureSynapseSqlPool
  account: string
}): AzureSynapseSqlPool => {
  const {
    id,
    name,
    type,
    region,
    sku,
    maxSizeBytes,
    collation,
    sourceDatabaseId,
    recoverableDatabaseId,
    provisioningState,
    status,
    restorePointInTime,
    createMode,
    creationDate,
    storageAccountType,
    sourceDatabaseDeletionDate,
    Tags,
  } = service

  return {
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    sku,
    maxSizeBytes,
    collation,
    sourceDatabaseId,
    recoverableDatabaseId,
    provisioningState,
    status,
    restorePointInTime: restorePointInTime?.toISOString(),
    createMode,
    creationDate: creationDate?.toISOString(),
    storageAccountType,
    sourceDatabaseDeletionDate: sourceDatabaseDeletionDate?.toISOString(),
  }
}
