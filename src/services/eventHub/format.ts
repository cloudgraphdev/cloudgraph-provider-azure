import cuid from 'cuid'
import { AzureEventHub } from '../../types/generated'
import { RawAzureEventHub } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureEventHub
  account: string
  region: string
}): AzureEventHub => {
  const {
    id,
    name,
    type,
    systemData: {
      createdBy,
      createdByType,
      createdAt: systemDataCreatedAt,
      lastModifiedBy,
      lastModifiedByType,
      lastModifiedAt,
    } = {},
    partitionIds = [],
    createdAt,
    updatedAt,
    messageRetentionInDays,
    partitionCount,
    status,
    captureDescription,
  } = service
  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    createdBy,
    createdByType,
    createdAt: createdAt?.toISOString() || systemDataCreatedAt?.toISOString(),
    lastModifiedBy,
    lastModifiedByType,
    lastModifiedAt: lastModifiedAt?.toISOString(),
    partitionIds,
    updatedAt: updatedAt?.toISOString(),
    messageRetentionInDays,
    partitionCount,
    status,
    captureDescription,
  }
}
