import { NetworkManagementClient } from '@azure/arm-network'
import {
  NetworkSecurityGroup,
  NetworkSecurityGroupsListAllResponse,
  NetworkSecurityGroupsListAllNextResponse,
  NetworkSecurityGroupListResult,
} from '@azure/arm-network/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'NetworkSecurityGroup'

export interface RawAzureNetworkSecurityGroup
  extends Omit<NetworkSecurityGroup, 'tags' | 'location'> {
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureNetworkSecurityGroup[]
}> => {
  try {
    const { credentials, subscriptionId } = config
    const client = new NetworkManagementClient(credentials, subscriptionId)

    const listAllSecurityGroups =
      async (): Promise<NetworkSecurityGroupsListAllResponse> =>
        client.networkSecurityGroups.listAll()
    const listAllNextSecurityGroups = async (
      nextLink: string
    ): Promise<NetworkSecurityGroupsListAllNextResponse> =>
      client.networkSecurityGroups.listAllNext(nextLink)

    const networkInterfaceData: NetworkSecurityGroupListResult =
      await getAllResources(listAllSecurityGroups, listAllNextSecurityGroups, {
        service: serviceName,
        client,
        scope: 'networkSecurityGroups',
      })

    const result: {
      [property: string]: RawAzureNetworkSecurityGroup[]
    } = {}
    let numOfGroups = 0
    networkInterfaceData.map(({ tags, location, ...rest }) => {
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
    logger.debug(lt.foundSecurityGroups(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
