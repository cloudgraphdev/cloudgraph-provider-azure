import { NetworkManagementClient, PublicIPAddress } from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'PublicIp'

export interface RawAzurePublicIpAddress
  extends Omit<PublicIPAddress, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzurePublicIpAddress[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const publicIpData: PublicIPAddress[] = []
    await tryCatchWrapper(
      async () => {
        const publicIpIterable: PagedAsyncIterableIterator<PublicIPAddress> =
          client.publicIPAddresses.listAll()
        for await (const publicIp of publicIpIterable) {
          publicIp && publicIpData.push(publicIp)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'publicIPAddresses',
        operation: 'listAll'
      }
    )

    const result: {
      [property: string]: RawAzurePublicIpAddress[]
    } = {}
    let numOfGroups = 0
    publicIpData.map(({ tags, location, ...rest }) => {
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
    logger.debug(lt.foundPublicIps(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
