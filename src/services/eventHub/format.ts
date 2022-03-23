import cuid from 'cuid'
import { AzureEventHub } from '../../types/generated'
import { transformSystemData } from '../../utils/format'
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
    systemData,
    partitionIds = [],
    createdAt,
    updatedAt,
    messageRetentionInDays,
    partitionCount,
    status,
    captureDescription,
    resourceGroupId,
  } = service
  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    ...transformSystemData(systemData),
    createdAt: createdAt?.toISOString(),
    partitionIds,
    updatedAt: updatedAt?.toISOString(),
    messageRetentionInDays,
    partitionCount,
    status,
    captureDescription,
    resourceGroupId,
  }
}
