import cuid from 'cuid'
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
    id: cuid(),
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
  const contentCRC64 = properties['Content-CRC64'] || ''
  delete properties['Content-CRC64']
  delete properties.contentMD5
  return {
    ...properties,
    contentCRC64,
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
    Tags = {},
    objectReplicationSourceProperties,
  } = service

  return {
    id: `${storageContainerId}/${name}`,
    name,
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
  }
}
