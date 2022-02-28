import {
  NetworkManagementClient,
  NetworkSecurityGroup,
} from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
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
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const securityGroupData: NetworkSecurityGroup[] = []
    await tryCatchWrapper(
      async () => {
        const securityGroupITerable: PagedAsyncIterableIterator<NetworkSecurityGroup> =
          client.networkSecurityGroups.listAll()
        for await (const securityGroup of securityGroupITerable) {
          securityGroup && securityGroupData.push(securityGroup)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'networkSecurityGroups',
      }
    )

    const result: {
      [property: string]: RawAzureNetworkSecurityGroup[]
    } = {}
    let numOfGroups = 0
    securityGroupData.map(({ tags, location, ...rest }) => {
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
