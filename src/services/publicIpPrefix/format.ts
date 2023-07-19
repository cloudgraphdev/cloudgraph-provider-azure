import { AzurePublicIpPrefix } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzurePublicIpPrefix } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzurePublicIpPrefix
  account: string
  region: string
}): AzurePublicIpPrefix => {
  const { id, name, ipTags, resourceGroupId, Tags } = service
  return {
    id,
    name,
    region,
    resourceGroupId,
    subscriptionId,
    ipTags,
    tags: formatTagsFromMap(Tags),
  }
}
