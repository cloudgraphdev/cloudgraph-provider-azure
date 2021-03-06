import { AzureFirewall, NetworkManagementClient } from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Firewall'

export interface RawAzureFirewall
  extends Omit<AzureFirewall, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureFirewall[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const firewallData: AzureFirewall[] = []
    await tryCatchWrapper(
      async () => {
        const firewallIterable: PagedAsyncIterableIterator<AzureFirewall> =
          client.azureFirewalls.listAll()
        for await (const firewall of firewallIterable) {
          firewall && firewallData.push(firewall)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'firewall',
        operation: 'listAll'
      }
    )

    const result: { [property: string]: RawAzureFirewall[] } = {}
    let numOfGroups = 0
    firewallData.map(({ tags, location, ...rest }) => {
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
    logger.debug(lt.foundFirewalls(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
