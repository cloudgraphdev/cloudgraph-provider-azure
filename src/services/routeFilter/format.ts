import { RawAzureRouteFilter } from './data'
import { AzureRouteFilter } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureRouteFilter
  account: string
}): AzureRouteFilter => {
  const { id, name, type, region, Tags } = service

  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    tags: formatTagsFromMap(Tags),
  }
}
