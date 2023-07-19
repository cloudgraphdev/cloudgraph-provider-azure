import { RawAzureRouteTable } from './data'
import { AzureRouteTable, AzureRouteTableRoute } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureRouteTable
  account: string
}): AzureRouteTable => {
  const { id, name, type, region, Tags, routes = [] } = service

  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    tags: formatTagsFromMap(Tags),
    routes:
      routes?.map(
        ({
          id: routeId,
          name: routeName,
          type: routeType,
        }): AzureRouteTableRoute => ({
          id: routeId,
          name: routeName,
          type: routeType,
        })
      ) ?? [],
  }
}
