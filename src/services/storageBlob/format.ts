import { generateUniqueId } from '@cloudgraph/sdk'
import {
  BlobProperties,
  ObjectReplicationPolicy,
  ObjectReplicationRule,
} from '@azure/storage-blob'

import {
  AzureStorageBlob,
  AzureStorageBlobProperties,
  AzureStorageBlobReplicationPolicy,
  AzureStorageBlobReplicationRule,
} from '../../types/generated'
import { RawAzureStorageBlob } from './data'
import t from '../../properties/translations'
import { formatTagsFromMap } from '../../utils/format'

const formatBlobUrl = (
  storageAccountName: string,
  storageContainerName: string,
  blobName: string
): string =>
  `https://${storageAccountName}.blob.core.windows.net/${storageContainerName}/${blobName}`

const formatReplicationRule = ({
  ruleId,
  replicationStatus,
}: ObjectReplicationRule): AzureStorageBlobReplicationRule => {
  return {
    ruleId,
    replicationStatus,
  }
}

const formatReplicationPolicy = ({
  policyId,
  rules,
}: ObjectReplicationPolicy): AzureStorageBlobReplicationPolicy => {
  return {
    id: generateUniqueId({
      policyId,
      rules,
    }),
    policyId,
    rules: rules?.map(rule => formatReplicationRule(rule)) || [],
  }
}

const formatBlobProperties = ({
  createdOn,
  lastModified,
  copyCompletedOn,
  deletedOn,
  accessTierChangedOn,
  expiresOn,
  lastAccessedOn,
  immutabilityPolicyExpiresOn,
  ...properties
}: BlobProperties): AzureStorageBlobProperties => {
  const {
    accessTier,
    accessTierInferred,
    archiveStatus,
    blobSequenceNumber,
    blobType,
    cacheControl,
    contentDisposition,
    contentEncoding,
    contentLanguage,
    contentLength,
    contentType,
    copyId,
    copyProgress,
    copySource,
    copyStatus,
    copyStatusDescription,
    customerProvidedKeySha256,
    destinationSnapshot,
    encryptionScope,
    etag,
    immutabilityPolicyMode,
    incrementalCopy,
    isSealed,
    leaseDuration,
    leaseState,
    leaseStatus,
    legalHold,
    rehydratePriority,
    remainingRetentionDays,
    serverEncrypted,
    tagCount,
  } = properties
  const contentCRC64 = properties['Content-CRC64'] || ''
  return {
    accessTier,
    accessTierInferred,
    archiveStatus,
    blobSequenceNumber,
    blobType,
    cacheControl,
    contentCRC64,
    contentDisposition,
    contentEncoding,
    contentLanguage,
    contentLength,
    contentType,
    copyId,
    copyProgress,
    copySource,
    copyStatus,
    copyStatusDescription,
    customerProvidedKeySha256,
    destinationSnapshot,
    encryptionScope,
    etag,
    immutabilityPolicyMode,
    incrementalCopy,
    isSealed,
    leaseDuration,
    leaseState,
    leaseStatus,
    legalHold,
    rehydratePriority,
    remainingRetentionDays,
    serverEncrypted,
    tagCount,
    createdOn: createdOn?.toUTCString() || '',
    lastModified: lastModified?.toUTCString() || '',
    copyCompletedOn: copyCompletedOn?.toUTCString() || '',
    deletedOn: deletedOn?.toUTCString() || '',
    accessTierChangedOn: accessTierChangedOn?.toUTCString() || '',
    expiresOn: expiresOn?.toUTCString() || '',
    lastAccessedOn: lastAccessedOn?.toUTCString() || '',
    immutabilityPolicyExpiresOn:
      immutabilityPolicyExpiresOn?.toUTCString() || '',
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureStorageBlob
  account: string
  region: string
}): AzureStorageBlob => {
  const {
    name,
    deleted,

    snapshot,
    versionId,
    properties,
    isCurrentVersion,
    hasVersionsOnly,
    storageContainerId,
    storageAccountName,
    storageContainerName,
    Tags = {},
    objectReplicationSourceProperties,
    resourceGroupId,
  } = service

  return {
    id: `${storageContainerId}/${name}`,
    name,
    url: formatBlobUrl(storageAccountName, storageContainerName, name),
    region,
    subscriptionId: account,
    snapshot,
    versionId,
    isCurrentVersion,
    hasVersionsOnly,
    deleted: deleted ? t.yes : t.no,
    tags: formatTagsFromMap(Tags),
    objectReplicationSourceProperties: objectReplicationSourceProperties?.map(
      replicationPolicy => formatReplicationPolicy(replicationPolicy)
    ),
    properties: formatBlobProperties(properties),
    resourceGroupId,
  }
}
