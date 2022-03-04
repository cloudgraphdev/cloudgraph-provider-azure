import cuid from 'cuid'
import { AzureDataFactory } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureDataFactory } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDataFactory
  account: string
  region: string
}): AzureDataFactory => {
  const {
    id,
    name,
    type,
    resourceGroupId,
    Tags,
    eTag,
    identity,
    provisioningState,
    createTime,
    version,
    publicNetworkAccess,
  } = service

  return {
    id: id || cuid(),
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
    eTag,
    identity: identity
      ? {
          type: identity.type,
          principalId: identity.principalId,
          tenantId: identity.tenantId,
        }
      : {},
    provisioningState,
    createTime,
    version,
    publicNetworkAccess,
  }
}
