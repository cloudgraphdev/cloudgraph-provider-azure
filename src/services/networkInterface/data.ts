import { NetworkInterface, NetworkManagementClient } from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'NetworkInterface'

export interface RawAzureNetworkInterface
  extends Omit<NetworkInterface, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureNetworkInterface[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const networkInterfaceData: NetworkInterface[] = []
    await tryCatchWrapper(
      async () => {
        const networkInterfaceIterable: PagedAsyncIterableIterator<NetworkInterface> =
          client.networkInterfaces.listAll()
        for await (const networkInterface of networkInterfaceIterable) {
          networkInterface && networkInterfaceData.push(networkInterface)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'networkInterfaces',
      }
    )

    const result: {
      [property: string]: RawAzureNetworkInterface[]
    } = {}
    let numOfGroups = 0
    networkInterfaceData.map(({ tags, location, ...rest }) => {
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
    logger.debug(lt.foundNetworkInterfaces(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
