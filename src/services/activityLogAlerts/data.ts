import { MonitorClient, ActivityLogAlertResource } from '@azure/arm-monitor'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { regionMap } from '../../enums/regions'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ActivityLogAlerts'

export interface RawAzureActivityLogAlert extends ActivityLogAlertResource {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureActivityLogAlert[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new MonitorClient(tokenCredentials, subscriptionId)
    const logAlerts: RawAzureActivityLogAlert[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        const logAlertsIterable: PagedAsyncIterableIterator<ActivityLogAlertResource> =
          client.activityLogAlerts.listBySubscriptionId()
        for await (const logAlert of logAlertsIterable) {
          if (logAlert) {
            const {
              id,
              name,
              type,
              location,
              scopes,
              enabled,
              condition,
              actions,
              description,
              tags,
            } = logAlert
            const region = regionMap.global
            const resourceGroupId = getResourceGroupFromEntity(logAlert)
            logAlerts.push({
              id,
              name,
              type,
              location,
              scopes,
              enabled,
              condition,
              actions,
              description,
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
