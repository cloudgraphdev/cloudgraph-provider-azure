import {
  ConnectedCluster,
  ConnectedKubernetesClient,
} from '@azure/arm-hybridkubernetes'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ArcConnectedCluster'

export interface RawAzureArcConnectedCluster
  extends Omit<ConnectedCluster, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureArcConnectedCluster[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new ConnectedKubernetesClient(
      tokenCredentials,
      subscriptionId
    )
    const managedClusterIterable: PagedAsyncIterableIterator<ConnectedCluster> =
      client.connectedClusterOperations.listBySubscription()

    const clusters: RawAzureArcConnectedCluster[] = []
    await tryCatchWrapper(
      async () => {
        for await (const managedCluster of managedClusterIterable) {
          if (managedCluster) {
            const { location, tags, ...rest } = managedCluster
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
        scope: 'connectedClusterOperations',
        operation: 'listBySubscription',
      }
    )
    logger.debug(lt.foundArcConnectedClusters(clusters.length))

    const result: { [property: string]: RawAzureArcConnectedCluster[] } = {}
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
