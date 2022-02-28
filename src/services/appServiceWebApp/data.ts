import {
  WebSiteManagementClient,
  Site,
  SiteAuthSettings,
} from '@azure/arm-appservice'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import getAppServicePlansData, {
  RawAzureAppServicePlan,
} from '../appServicePlan/data'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'AppServiceWebApp'

export interface RawAzureAppServiceWebApp
  extends Omit<Site, 'tags' | 'location' | 'identity' | 'extendedLocation'> {
  appServicePlanId: string
  region: string
  resourceGroupId: string
  Tags: TagMap
  AuthSettings?: SiteAuthSettings
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
            const { resourceGroupId, name } = appService
            const webAppsIterable: PagedAsyncIterableIterator<Site> =
              client.appServicePlans.listWebApps(resourceGroupId, name)
            for await (const webApp of webAppsIterable) {
              if (webApp) {
                const {
                  name: webAppName,
                  location,
                  extendedLocation,
                  identity,
                  tags,
                  ...rest
                } = webApp
                const region = lowerCaseLocation(location)
                const authSettings = await client.webApps.getAuthSettings(
                  resourceGroupId,
                  webAppName
                )
                return {
                  ...rest,
                  appServicePlanId: appService.id,
                  region,
                  resourceGroupId,
                  Tags: tags || {},
                  AuthSettings: authSettings,
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
