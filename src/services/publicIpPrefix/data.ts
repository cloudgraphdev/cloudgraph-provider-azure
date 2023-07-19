import { NetworkManagementClient, PublicIPPrefix } from '@azure/arm-network'
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

export interface RawAzurePublicIpPrefix
  extends Omit<PublicIPPrefix, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzurePublicIpPrefix[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const publicIpPrefixData: PublicIPPrefix[] = []
    await tryCatchWrapper(
      async () => {
        const publicIpPrefixIterable: PagedAsyncIterableIterator<PublicIPPrefix> =
          client.publicIPPrefixes.listAll()
        for await (const publicIpPrefix of publicIpPrefixIterable) {
          publicIpPrefix && publicIpPrefixData.push(publicIpPrefix)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'publicIPPrefixes',
        operation: 'listAll',
      }
    )

    const result: {
      [property: string]: RawAzurePublicIpPrefix[]
    } = {}
    let numOfGroups = 0
    publicIpPrefixData.forEach(({ tags, location, ...rest }) => {
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
    logger.debug(lt.foundPublicIpPrefixes(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
