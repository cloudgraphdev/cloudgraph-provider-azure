import { MonitorClient, ActionGroupResource } from '@azure/arm-monitor'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { regionMap } from '../../enums/regions'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ActionGroup'

export interface RawAzureActionGroup
  extends Omit<ActionGroupResource, 'location' | 'tags'> {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureActionGroup[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new MonitorClient(tokenCredentials, subscriptionId)
    const actionGroups: RawAzureActionGroup[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        const actionGroupsIterable: PagedAsyncIterableIterator<ActionGroupResource> =
          client.actionGroups.listBySubscriptionId()
        for await (const actionGroup of actionGroupsIterable) {
          if (actionGroup) {
            const { tags, ...restActionGroup } = actionGroup
            const region = regionMap.global
            const resourceGroupId = getResourceGroupFromEntity(actionGroup)
            actionGroups.push({
              ...restActionGroup,
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
        scope: 'actionGroups',
        operation: 'listBySubscriptionId',
      }
    )
    logger.debug(lt.foundActionGroups(actionGroups.length))

    actionGroups.map(({ region, ...rest }) => {
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
