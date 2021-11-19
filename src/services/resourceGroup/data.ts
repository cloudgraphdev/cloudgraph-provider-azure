import { ResourceManagementClient } from '@azure/arm-resources'
import {
  ResourceGroup,
  ResourceGroupListResult,
  ResourceGroupsListNextResponse,
  ResourceGroupsListResponse,
} from '@azure/arm-resources/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import { AzureServiceConfig, TagMap } from '../../types'
import { generateAzureDebugScope } from '../../utils'
import { getAllResources } from '../../utils/apiUtils'

const { logger } = CloudGraph
const serviceName = 'ResourceGroup'

export interface RawAzureResourceGroup
  extends Omit<ResourceGroup, 'tags' | 'location'> {
  subscriptionId: string
  region: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: {
  regions: string
  config: AzureServiceConfig
}): Promise<{ [property: string]: RawAzureResourceGroup[] }> => {
  try {
    const { credentials, subscriptionId } = config
    const client = new ResourceManagementClient(credentials, subscriptionId)

    const listResourceGroups = async (): Promise<ResourceGroupsListResponse> =>
      client.resourceGroups.list()
    const listNextResourceGroups = async (
      nextLink: string
    ): Promise<ResourceGroupsListNextResponse> =>
      client.resourceGroups.listNext(nextLink)

    const resourceGroupData: ResourceGroupListResult = await getAllResources(
      listResourceGroups,
      listNextResourceGroups,
      generateAzureDebugScope(serviceName, client, 'resourceGroups')
    )

    const result = {}
    resourceGroupData.map(({ tags, location: region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          ...rest,
          region,
          subscriptionId,
          Tags: tags || {},
        })
      }
    })

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
