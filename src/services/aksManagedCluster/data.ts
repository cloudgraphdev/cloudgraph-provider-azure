import {
  ContainerServiceClient,
  ManagedCluster,
} from '@azure/arm-containerservice'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'AksManagedCluster'

export interface RawAzureAksManagedCluster
  extends Omit<ManagedCluster, 'tags' | 'location' | 'extendedLocation'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAksManagedCluster[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new ContainerServiceClient(tokenCredentials, subscriptionId)
    const managedClusterIterable: PagedAsyncIterableIterator<ManagedCluster> =
      client.managedClusters.list()

    const clusters: RawAzureAksManagedCluster[] = []
    await tryCatchWrapper(
      async () => {
        for await (const managedCluster of managedClusterIterable) {
          if (managedCluster) {
            const { location, tags, extendedLocation, ...rest } = managedCluster
            const resourceGroupId = getResourceGroupFromEntity(rest)
            const region = lowerCaseLocation(location)
            clusters.push({
              ...rest,
              region,
              resourceGroupId,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'managedClusters',
        operation: 'list',
      }
    )
    logger.debug(lt.foundAKSManagedClusters(clusters.length))

    const result: { [property: string]: RawAzureAksManagedCluster[] } = {}
    clusters.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          region,
          ...rest,
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
