import { MonitorClient, DataCollectionRuleResource } from '@azure/arm-monitor'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { regionMap } from '../../enums/regions'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'DataCollectionRule'

export interface RawAzureDataCollectionRule extends DataCollectionRuleResource {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDataCollectionRule[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new MonitorClient(tokenCredentials, subscriptionId)
    const dataCollectionRules: RawAzureDataCollectionRule[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        const dataCollectionRulesIterable: PagedAsyncIterableIterator<DataCollectionRuleResource> =
          client.dataCollectionRules.listBySubscription()
        for await (const metricAlert of dataCollectionRulesIterable) {
          if (metricAlert) {
            const { tags, ...rest } = metricAlert
            const region = regionMap.global
            const resourceGroupId = getResourceGroupFromEntity(metricAlert)
            dataCollectionRules.push({
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
        scope: 'dataCollectionRules',
        operation: 'listBySubscription',
      }
    )
    logger.debug(lt.foundDataCollectionRules(dataCollectionRules.length))

    dataCollectionRules.map(({ region, ...rest }) => {
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
