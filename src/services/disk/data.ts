import CloudGraph from '@cloudgraph/sdk'
import { ComputeManagementClient } from '@azure/arm-compute'
import {
  Disk,
  DiskList,
  DisksListNextResponse,
  DisksListResponse,
} from '@azure/arm-compute/esm/models'

import azureLoggerText from '../../properties/logger'
import { getAllResources } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Disk'

export interface RawAzureDisk extends Omit<Disk, 'tags' | 'location'> {
  resourceGroup: string
  region: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{ [property: string]: RawAzureDisk[] }> => {
  const { credentials, subscriptionId } = config
  const client = new ComputeManagementClient(credentials, subscriptionId)

  try {
    const diskData: DiskList = await getAllResources({
      listCall: async (): Promise<DisksListResponse> => client.disks.list(),
      listNextCall: async (nextLink: string): Promise<DisksListNextResponse> =>
        client.disks.listNext(nextLink),
      debugScope: {
        service: serviceName,
        client,
        scope: 'disks',
      },
    })

    const result: { [property: string]: RawAzureDisk[] } = {}
    let numOfGroups = 0
    diskData.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroup = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          resourceGroup,
          region,
          Tags: tags || {},
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundDisks(numOfGroups))

    return result
  } catch (e) {
    logger.debug(e)
    return {}
  }
}
