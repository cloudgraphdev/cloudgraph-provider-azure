import {
  WebSiteManagementClient,
  Site,
  SiteAuthSettings,
  SiteConfigResource,
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
  extends Omit<
    Site,
    'tags' | 'location' | 'identity' | 'extendedLocation' | 'siteConfig'
  > {
  appServicePlanId: string
  region: string
  resourceGroupId: string
  Tags: TagMap
  siteAuthSettings?: SiteAuthSettings
  siteConfig?: SiteConfigResource
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

    const appServiceWebApps: RawAzureAppServiceWebApp[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          appServicePlans.map(async appService => {
            const { resourceGroupId, name } = appService
            const webAppsIterable: PagedAsyncIterableIterator<Site> =
              client.appServicePlans.listWebApps(resourceGroupId, name)
            for await (const webApp of webAppsIterable) {
              if (webApp) {
                const { location, extendedLocation, identity, tags, ...rest } =
                  webApp
                const region = lowerCaseLocation(location)
                appServiceWebApps.push({
                  ...rest,
                  appServicePlanId: appService.id,
                  region,
                  resourceGroupId,
                  Tags: tags || {},
                })
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

    const siteAuthSettings: { [name: string]: SiteAuthSettings } = {}
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (appServiceWebApps || []).map(
            async ({
              name: webAppName,
              resourceGroup: webAppResourceGroupName,
            }) => {
              if (webAppResourceGroupName && webAppName) {
                const siteAuthSetting = await client.webApps.getAuthSettings(
                  webAppResourceGroupName,
                  webAppName
                )
                if (siteAuthSetting) {
                  siteAuthSettings[webAppName] = siteAuthSetting
                }
              }
            }
          )
        )
        logger.debug(
          lt.foundWebAppsSiteAuthSettings(Object.keys(siteAuthSettings).length)
        )
      },
      {
        service: serviceName,
        client,
        scope: 'siteAuthSettings',
        operation: 'getAuthSettings',
      }
    )

    const siteConfigs: SiteConfigResource[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (appServiceWebApps || []).map(
            async ({
              name: webAppName,
              resourceGroup: webAppResourceGroupName,
            }) => {
              const configuration = await client.webApps.getConfiguration(
                webAppResourceGroupName,
                webAppName
              )
              if (configuration) {
                siteConfigs.push({
                  ...configuration,
                })
              }
            }
          )
        )
        logger.debug(lt.foundWebAppsSiteConfigs(siteConfigs.length))
      },
      {
        service: serviceName,
        client,
        scope: 'siteConfigs',
        operation: 'getConfiguration',
      }
    )

    const result: { [property: string]: RawAzureAppServiceWebApp[] } = {}
    appServiceWebApps.map(({ name, region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          name,
          region,
          ...rest,
          siteAuthSettings: siteAuthSettings[name] || {},
          siteConfig: siteConfigs.find(i => i.name === name) || {},
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
