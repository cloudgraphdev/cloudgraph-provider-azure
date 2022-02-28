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
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'NetworkSecurityGroup'

export interface RawAzureNetworkSecurityGroup
  extends Omit<NetworkSecurityGroup, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
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

    const networkInterfaceData: NetworkSecurityGroupListResult =
      await getAllResources({
        listCall: async (): Promise<NetworkSecurityGroupsListAllResponse> =>
          client.networkSecurityGroups.listAll(),
        listNextCall: async (
          nextLink: string
        ): Promise<NetworkSecurityGroupsListAllNextResponse> =>
          client.networkSecurityGroups.listAllNext(nextLink),
        debugScope: {
          service: serviceName,
          client,
          scope: 'networkSecurityGroups',
        },
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
    logger.debug(lt.foundSecurityGroups(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
