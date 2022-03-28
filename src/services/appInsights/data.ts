import CloudGraph from '@cloudgraph/sdk'
import {
  ApplicationInsightsManagementClient,
  ApplicationInsightsManagementModels,
} from '@azure/arm-appinsights'
import azureLoggerText from '../../properties/logger'

import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

export interface RawAzureAppInsight
  extends Omit<
    ApplicationInsightsManagementModels.ApplicationInsightsComponent,
    'tags' | 'location'
  > {
  resourceGroupId: string
  region: string
  Tags: TagMap
  etag?: string
}

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'AppInsights'

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAppInsight[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const client = new ApplicationInsightsManagementClient(
      tokenCredentials,
      subscriptionId
    )

    const appInsightsData: ApplicationInsightsManagementModels.ApplicationInsightsComponent[] =
      []

    await tryCatchWrapper(
      async () => {
        const appInsights = await client.components.list()
        if (appInsights) {
          appInsightsData.push(...appInsights)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'AppInsight',
        operation: 'list',
      }
    )

    const result: {
      [property: string]: RawAzureAppInsight[]
    } = {}
    let numOfGroups = 0
    appInsightsData.map(({ location: region, tags, ...rest }) => {
      const resourceGroupId = getResourceGroupFromEntity({
        id: rest.id,
      })

      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          ...rest,
          resourceGroupId,
          region,
          Tags: tags || {},
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundAppInsights(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
