import { MonitorClient, ActivityLogAlertResource } from '@azure/arm-monitor'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ActivityLogAlerts'

export interface RawAzureActivityLogAlert extends ActivityLogAlertResource {
  resourceGroupId: string
  region: string
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureActivityLogAlert[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new MonitorClient(tokenCredentials, subscriptionId)
    const logAlertsIterable: PagedAsyncIterableIterator<ActivityLogAlertResource> =
      client.activityLogAlerts.listBySubscriptionId()

    const logAlerts: RawAzureActivityLogAlert[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        for await (const logAlert of logAlertsIterable) {
          if (logAlert) {
            const { tags, ...rest } = logAlert
            const resourceGroupId = getResourceGroupFromEntity(rest)
            const region = regionMap.global
            logAlerts.push({
              ...rest,
              region,
              resourceGroupId,
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'activityLogAlerts',
        operation: 'listBySubscriptionId',
      }
    )
    logger.debug(lt.foundActivityLogAlerts(logAlerts.length))

    logAlerts.map(({ region, ...rest }) => {
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
