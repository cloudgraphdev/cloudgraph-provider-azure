import { NetworkManagementClient } from '@azure/arm-network'
import {
  NetworkInterface,
  NetworkInterfaceListResult,
  NetworkInterfacesListAllNextResponse,
  NetworkInterfacesListAllResponse,
} from '@azure/arm-network/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
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
    const { credentials, subscriptionId } = config
    const client = new NetworkManagementClient(credentials, subscriptionId)

    const networkInterfaceData: NetworkInterfaceListResult =
      await getAllResources({
        listCall: async (): Promise<NetworkInterfacesListAllResponse> =>
          client.networkInterfaces.listAll(),
        listNextCall: async (
          nextLink: string
        ): Promise<NetworkInterfacesListAllNextResponse> =>
          client.networkInterfaces.listAllNext(nextLink),
        debugScope: {
          service: serviceName,
          client,
          scope: 'networkInterfaces',
        },
      })

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
