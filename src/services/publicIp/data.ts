import { NetworkManagementClient } from '@azure/arm-network'
import {
  PublicIPAddress,
  PublicIPAddressesListAllNextResponse,
  PublicIPAddressesListAllResponse,
  PublicIPAddressListResult,
} from '@azure/arm-network/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'PublicIp'

export interface RawAzurePublicIpAddress
  extends Omit<PublicIPAddress, 'tags' | 'location'> {
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzurePublicIpAddress[]
}> => {
  try {
    const { credentials, subscriptionId } = config
    const client = new NetworkManagementClient(credentials, subscriptionId)

    const listAllPublicIps =
      async (): Promise<PublicIPAddressesListAllResponse> =>
        client.publicIPAddresses.listAll()
    const listAllNextPublicIps = async (
      nextLink: string
    ): Promise<PublicIPAddressesListAllNextResponse> =>
      client.publicIPAddresses.listAllNext(nextLink)

    const networkInterfaceData: PublicIPAddressListResult =
      await getAllResources(listAllPublicIps, listAllNextPublicIps, {
        service: serviceName,
        client,
        scope: 'publicIPAddresses',
      })

    const result: {
      [property: string]: RawAzurePublicIpAddress[]
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
    logger.debug(lt.foundPublicIps(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
