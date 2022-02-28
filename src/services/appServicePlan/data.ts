import { WebSiteManagementClient, AppServicePlan } from '@azure/arm-appservice'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import isEmpty from 'lodash/isEmpty'

import apiSelectors from '../../enums/apiSelectors'
import azureLoggerText from '../../properties/logger'
import services from '../../enums/services'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'AppServicePlan'

export interface RawAzureAppServicePlan
  extends Omit<AppServicePlan, 'tags' | 'location' | 'extendedLocation'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAppServicePlan[]
}> => {
  try {
    const existingData: { [property: string]: RawAzureAppServicePlan[] } =
      rawData.find(({ name }) => name === services.appServicePlan)?.data || {}

    if (isEmpty(existingData)) {
      const { tokenCredentials, subscriptionId } = config
      const client = new WebSiteManagementClient(
        tokenCredentials,
        subscriptionId
      )

      const appServicePlans: RawAzureAppServicePlan[] = []
      const appServicePlanIterable: PagedAsyncIterableIterator<AppServicePlan> =
        client.appServicePlans.list()
      await tryCatchWrapper(
        async () => {
          for await (const appServicePlan of appServicePlanIterable) {
            if (
              appServicePlan &&
              !appServicePlan.kind.includes(apiSelectors.functionApp)
            ) {
              const { location, tags, extendedLocation, ...rest } =
                appServicePlan
              const resourceGroupId = getResourceGroupFromEntity(rest)
              const region = lowerCaseLocation(location)
              appServicePlans.push({
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
          scope: 'appServicePlans',
          operation: 'list',
        }
      )
      logger.debug(lt.foundAppServicePlans(appServicePlans.length))

      const result: { [property: string]: RawAzureAppServicePlan[] } = {}
      appServicePlans.map(({ region, ...rest }) => {
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
    }
    return existingData
  } catch (e) {
    logger.error(e)
    return {}
  }
}
