import CloudGraph from '@cloudgraph/sdk'
import { ComputeManagementClient, Disk } from '@azure/arm-compute'

import azureLoggerText from '../../properties/logger'
import { lowerCaseLocation } from '../../utils/format'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Disk'

export interface RawAzureDisk extends Omit<Disk, 'tags' | 'location'> {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{ [property: string]: RawAzureDisk[] }> => {
  const { tokenCredentials, subscriptionId } = config
  const client = new ComputeManagementClient(tokenCredentials, subscriptionId)

  try {
    const disks: Disk[] = []
    const diskListIterable = client.disks.list()
    await tryCatchWrapper(
      async () => {
        for await (const disk of diskListIterable) {
          if (disk) {
            disks.push(disk)
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'disks',
      }
    )

    const result: { [property: string]: RawAzureDisk[] } = {}
    let numOfGroups = 0
    disks.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          resourceGroupId,
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
