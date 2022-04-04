import {
  WebSiteManagementClient,
  AppServiceEnvironmentResource,
} from '@azure/arm-appservice'
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
const serviceName = 'AppServiceEnvironment'

export interface RawAzureAppServiceEnvironment
  extends Omit<AppServiceEnvironmentResource, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAppServiceEnvironment[]
}> => {
  try {
    const existingData: {
      [property: string]: RawAzureAppServiceEnvironment[]
    } =
      rawData.find(({ name }) => name === services.appServiceEnvironment)
        ?.data || {}

    if (isEmpty(existingData)) {
      const { tokenCredentials, subscriptionId } = config
      const client = new WebSiteManagementClient(
        tokenCredentials,
        subscriptionId
      )

      const appServiceEnvironments: RawAzureAppServiceEnvironment[] = []
      const appServicePlanIterable: PagedAsyncIterableIterator<AppServiceEnvironmentResource> =
        client.appServiceEnvironments.list()
      await tryCatchWrapper(
        async () => {
          for await (const appServicePlan of appServicePlanIterable) {
            if (
              appServicePlan &&
              !appServicePlan.kind.includes(apiSelectors.functionApp)
            ) {
              const { location, tags, ...rest } = appServicePlan
              const resourceGroupId = getResourceGroupFromEntity(rest)
              const region = lowerCaseLocation(location)
              appServiceEnvironments.push({
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
          scope: 'appServiceEnvironments',
          operation: 'list',
        }
      )
      logger.debug(
        lt.foundAppServiceEnvironments(appServiceEnvironments.length)
      )

      const result: { [property: string]: RawAzureAppServiceEnvironment[] } = {}
      appServiceEnvironments.map(({ region, ...rest }) => {
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
