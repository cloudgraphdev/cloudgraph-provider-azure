import { NetworkWatcher, NetworkManagementClient } from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'NetworkWatcher'

export interface RawAzureNetworkWatcher
  extends Omit<NetworkWatcher, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureNetworkWatcher[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const networkWatcherData: NetworkWatcher[] = []
    await tryCatchWrapper(
      async () => {
        const networkWatcherIterable: PagedAsyncIterableIterator<NetworkWatcher> =
          client.networkWatchers.listAll()
        for await (const networkWatcher of networkWatcherIterable) {
          networkWatcher && networkWatcherData.push(networkWatcher)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'networkWatchers',
        operation: 'listAll'
      }
    )

    const result: {
      [property: string]: RawAzureNetworkWatcher[]
    } = {}
    let numOfGroups = 0
    networkWatcherData.map(({ tags, location, ...rest }) => {
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
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundNetworkWatchers(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
