import { NetworkManagementClient, RouteFilter } from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'RouteFilter'

export interface RawAzureRouteFilter
  extends Omit<RouteFilter, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureRouteFilter[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const routeFilterData: RawAzureRouteFilter[] = []
    await tryCatchWrapper(
      async () => {
        const routeFilterIterable: PagedAsyncIterableIterator<RouteFilter> =
          client.routeFilters.list()
        for await (const routeFilter of routeFilterIterable) {
          if (routeFilter) {
            const { location, tags, ...rest } = routeFilter
            const resourceGroupId = getResourceGroupFromEntity(rest)
            const region = lowerCaseLocation(location)
            routeFilterData.push({
              ...rest,
              region,
              resourceGroupId,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'routeFilters',
        operation: 'list',
      }
    )
    const result: { [property: string]: RawAzureRouteFilter[] } = {}
    let numOfGroups = 0
    routeFilterData.forEach(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          region,
          ...rest,
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundRouteFilters(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
