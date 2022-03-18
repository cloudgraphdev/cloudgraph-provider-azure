import { MonitorClient, ActivityLogAlertResource } from '@azure/arm-monitor'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import getResourceGroupData from '../resourceGroup/data'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { getResourceGroupNames } from '../../utils/format'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ActivityLogAlerts'

export interface RawAzureActivityLogAlert extends ActivityLogAlertResource {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureActivityLogAlert[]
}> => {
  try {
    const resourceGroups = await getResourceGroupData({
      regions,
      config,
      rawData,
      opts,
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)
    const { tokenCredentials, subscriptionId } = config
    const client = new MonitorClient(tokenCredentials, subscriptionId)
    const logAlerts: RawAzureActivityLogAlert[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (resourceGroupsNames || []).map(async (rgName: string) => {
            const logAlertsIterable: PagedAsyncIterableIterator<ActivityLogAlertResource> =
              client.activityLogAlerts.listByResourceGroup(rgName)
            for await (const logAlert of logAlertsIterable) {
              if (logAlert) {
                const { tags, ...rest } = logAlert
                const region = regionMap.global
                logAlerts.push({
                  ...rest,
                  region,
                  resourceGroupId: rgName,
                  Tags: tags || {},
                })
              }
            }
          })
        )
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
