import { MonitorClient, MetricAlertResource } from '@azure/arm-monitor'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { regionMap } from '../../enums/regions'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'MetricAlert'

export interface RawAzureMetricAlert extends MetricAlertResource {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureMetricAlert[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new MonitorClient(tokenCredentials, subscriptionId)
    const metricAlerts: RawAzureMetricAlert[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        const metricAlertsIterable: PagedAsyncIterableIterator<MetricAlertResource> =
          client.metricAlerts.listBySubscription()
        for await (const metricAlert of metricAlertsIterable) {
          if (metricAlert) {
            const { tags, ...rest } = metricAlert
            const region = regionMap.global
            const resourceGroupId = getResourceGroupFromEntity(metricAlert)
            metricAlerts.push({
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
        scope: 'metricAlerts',
        operation: 'listBySubscription',
      }
    )
    logger.debug(lt.foundMetricAlerts(metricAlerts.length))

    metricAlerts.map(({ region, ...rest }) => {
      result.global.push({
        ...rest,
        region,
      })
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
