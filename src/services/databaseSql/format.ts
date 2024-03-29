import { generateUniqueId } from '@cloudgraph/sdk'
import { AzureDatabaseSql } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureDatabaseSql } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDatabaseSql
  account: string
  region: string
}): AzureDatabaseSql => {
  const {
    id,
    name,
    type,
    kind,
    resourceGroupId,
    managedBy,
    sku,
    identity,
    createMode,
    collation,
    maxSizeBytes,
    sampleName,
    elasticPoolId,
    sourceDatabaseId,
    status,
    databaseId,
    creationDate,
    currentServiceObjectiveName,
    requestedServiceObjectiveName,
    defaultSecondaryLocation,
    failoverGroupId,
    restorePointInTime,
    sourceDatabaseDeletionDate,
    recoveryServicesRecoveryPointId,
    longTermRetentionBackupResourceId,
    recoverableDatabaseId,
    restorableDroppedDatabaseId,
    catalogCollation,
    zoneRedundant,
    licenseType,
    maxLogSizeBytes,
    earliestRestoreDate,
    readScale,
    highAvailabilityReplicaCount,
    secondaryType,
    currentSku,
    autoPauseDelay,
    currentBackupStorageRedundancy,
    requestedBackupStorageRedundancy,
    minCapacity,
    pausedDate,
    resumedDate,
    maintenanceConfigurationId,
    isLedgerOn,
    isInfraEncryptionEnabled,
    federatedClientId,
    primaryDelegatedIdentityClientId,
    transparentDataEncryptions,
    Tags,
  } = service

  return {
    id,
    name,
    region,
    subscriptionId: account,
    type,
    kind,
    resourceGroupId,
    managedBy,
    sku,
    identity: {
      ...identity,
      userAssignedIdentities: Object.keys(identity?.userAssignedIdentities ?? {}).map(key => ({
        id: generateUniqueId({id, key}),
        key,
        value: identity?.userAssignedIdentities[key],
      })),
      delegatedResources: Object.keys(identity?.delegatedResources ?? {}).map(key => ({
        id: generateUniqueId({id, key}),
        key,
        value: identity?.delegatedResources[key],
      })),
    },
    createMode,
    collation,
    maxSizeBytes: maxSizeBytes?.toString(),
    sampleName,
    elasticPoolId,
    sourceDatabaseId,
    status,
    databaseId,
    creationDate: creationDate?.toISOString(),
    currentServiceObjectiveName,
    requestedServiceObjectiveName,
    defaultSecondaryLocation,
    failoverGroupId,
    restorePointInTime: restorePointInTime?.toISOString(),
    sourceDatabaseDeletionDate: sourceDatabaseDeletionDate?.toISOString(),
    recoveryServicesRecoveryPointId,
    longTermRetentionBackupResourceId,
    recoverableDatabaseId,
    restorableDroppedDatabaseId,
    catalogCollation,
    zoneRedundant,
    licenseType,
    maxLogSizeBytes,
    earliestRestoreDate: earliestRestoreDate?.toISOString(),
    readScale,
    highAvailabilityReplicaCount,
    secondaryType,
    currentSku,
    autoPauseDelay,
    currentBackupStorageRedundancy,
    requestedBackupStorageRedundancy,
    minCapacity,
    pausedDate: pausedDate?.toISOString(),
    resumedDate: resumedDate?.toISOString(),
    maintenanceConfigurationId,
    isLedgerOn,
    isInfraEncryptionEnabled,
    federatedClientId,
    primaryDelegatedIdentityClientId,
    transparentDataEncryptions: transparentDataEncryptions?.map(tde => ({
      ...tde,
      id: tde.id,
    })),
    tags: formatTagsFromMap(Tags),
  }
}
