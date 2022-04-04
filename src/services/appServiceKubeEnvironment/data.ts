import { WebSiteManagementClient, KubeEnvironment } from '@azure/arm-appservice'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'AppServiceKubeEnvironment'

export interface RawAzureAppServiceKubeEnvironment
  extends Omit<KubeEnvironment, 'tags' | 'location' | 'extendedLocation'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAppServiceKubeEnvironment[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new WebSiteManagementClient(tokenCredentials, subscriptionId)

    const k8s: RawAzureAppServiceKubeEnvironment[] = []
    await tryCatchWrapper(
      async () => {
        const k8Iterable: PagedAsyncIterableIterator<KubeEnvironment> =
          client.kubeEnvironments.listBySubscription()
        for await (const k8 of k8Iterable) {
          if (k8) {
            const { location, extendedLocation, tags, ...rest } = k8
            const resourceGroupId = getResourceGroupFromEntity(rest)
            const region = lowerCaseLocation(location)
            k8s.push({
              ...rest,
              region,
              resourceGroupId,
              Tags: tags || {},
            })
          }
        }
        logger.debug(lt.foundKubesEnvs(k8s.length))
      },
      {
        service: serviceName,
        client,
        scope: 'kubeEnvironments',
        operation: 'listBySubscription',
      }
    )

    const result: { [property: string]: RawAzureAppServiceKubeEnvironment[] } = {}
    k8s.map(({ region, ...rest }) => {
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
