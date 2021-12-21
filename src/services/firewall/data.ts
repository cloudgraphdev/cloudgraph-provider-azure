import { NetworkManagementClient } from '@azure/arm-network'
import {
  AzureFirewall,
  AzureFirewallListResult,
  AzureFirewallsListAllNextResponse,
  AzureFirewallsListAllResponse,
} from '@azure/arm-network/esm/models'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Firewall'

export interface RawAzureFirewall
  extends Omit<AzureFirewall, 'tags' | 'location'> {
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureFirewall[]
}> => {
  try {
    const { credentials, subscriptionId } = config
    const client = await new NetworkManagementClient(credentials, subscriptionId)

    const firewallData: AzureFirewallListResult = await getAllResources({
      listCall: async (): Promise<AzureFirewallsListAllResponse> =>
        client.azureFirewalls.listAll(),
      listNextCall: async (
        nextLink: string
      ): Promise<AzureFirewallsListAllNextResponse> =>
        client.azureFirewalls.listAllNext(nextLink),
      debugScope: {
        service: serviceName,
        client,
        scope: 'firewall',
      },
    })

    const result: { [property: string]: RawAzureFirewall[] } = {}
    let numOfGroups = 0

    firewallData.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          ...rest,
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
