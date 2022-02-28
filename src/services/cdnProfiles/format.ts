import cuid from 'cuid'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureCdnProfile } from './data'
import { AzureCdnProfile } from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureCdnProfile
  account: string
  region: string
}): AzureCdnProfile => {
  const {
    id,
    name,
    type,
    Tags,
    resourceState,
    provisioningState,
    frontdoorId,
    resourceGroupId,
    sku,
  } = service
  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    resourceState,
    provisioningState,
    frontdoorId,
    resourceGroupId,
    sku: sku?.name || '',
    tags: formatTagsFromMap(Tags),
  }
}
