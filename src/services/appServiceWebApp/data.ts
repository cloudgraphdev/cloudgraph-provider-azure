import { WebSiteManagementClient, Site } from '@azure/arm-appservice'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import getAppServicePlansData, {
  RawAzureAppServicePlan,
} from '../appServicePlan/data'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'AppServiceWebApp'

export interface RawAzureAppServiceWebApp
  extends Omit<Site, 'tags' | 'location' | 'identity' | 'extendedLocation'> {
  appServicePlanId: string
  region: string
  resourceGroup: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAppServiceWebApp[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new WebSiteManagementClient(tokenCredentials, subscriptionId)

    const appServicePlans: RawAzureAppServicePlan[] = Object.values(
      await getAppServicePlansData({
        regions,
        config,
        rawData,
        opts,
      })
    ).flat()

    let appServiceWebApps: RawAzureAppServiceWebApp[] = []
    await tryCatchWrapper(
      async () => {
        appServiceWebApps = await Promise.all(
          appServicePlans.map(async appService => {
            const { resourceGroup, name } = appService
            const webAppsIterable: PagedAsyncIterableIterator<Site> =
              client.appServicePlans.listWebApps(resourceGroup, name)
            for await (const webApp of webAppsIterable) {
              if (webApp) {
                const { location, extendedLocation, identity, tags, ...rest } =
                  webApp
                const region = location && lowerCaseLocation(location) || regionMap.global
                return {
                  ...rest,
                  appServicePlanId: appService.id,
                  region,
                  resourceGroup,
                  Tags: tags || {},
                }
              }
            }
          })
        )
        logger.debug(lt.foundWebApps(appServiceWebApps.length))
      },
      {
        service: serviceName,
        client,
        scope: 'appServicePlans',
        operation: 'listWebApps',
      }
    )

    const result: { [property: string]: RawAzureAppServiceWebApp[] } = {}
    appServiceWebApps.map(({ region, ...rest }) => {
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
