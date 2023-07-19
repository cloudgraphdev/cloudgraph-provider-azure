import { NetworkManagementClient, Route, RouteTable } from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'RouteTable'

export interface RawAzureRouteTable
  extends Omit<RouteTable, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
  routes: Route[]
}

const listRouteTableRoute = async (
  client: NetworkManagementClient,
  resourceGroup: string,
  routeTableName: string
): Promise<Route[]> => {
  const routes: Route[] = []
  const routesIterable = client.routes.list(resourceGroup, routeTableName)
  await tryCatchWrapper(
    async () => {
      for await (const route of routesIterable) {
        if (route) {
          routes.push(route)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'routes',
      operation: 'list',
    }
  )
  return routes
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureRouteTable[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const routeTableData: RouteTable[] = []
    await tryCatchWrapper(
      async () => {
        const routeTableIterable: PagedAsyncIterableIterator<RouteTable> =
          client.routeTables.listAll()
        for await (const routeTable of routeTableIterable) {
          routeTable && routeTableData.push(routeTable)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'routeTables',
        operation: 'listAll',
      }
    )

    const result: {
      [property: string]: RawAzureRouteTable[]
    } = {}
    let numOfGroups = 0
    await Promise.all(
      routeTableData.map(async ({ name, tags, location, ...rest }) => {
        const region = lowerCaseLocation(location)
        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          const resourceGroupId = getResourceGroupFromEntity(rest)
          result[region].push({
            ...rest,
            region,
            resourceGroupId,
            Tags: tags || {},
            routes: await listRouteTableRoute(client, resourceGroupId, name),
          })
          numOfGroups += 1
        }
      })
    )
    logger.debug(lt.foundRouteTables(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
