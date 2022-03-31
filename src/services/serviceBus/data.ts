import { SBNamespace, ServiceBusManagementClient  } from '@azure/arm-servicebus'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Service Bus'

export interface RawAzureSBNamespace
  extends Omit<SBNamespace, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureSBNamespace[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new ServiceBusManagementClient(tokenCredentials, subscriptionId)

    const namespaces: SBNamespace[] = []
    await tryCatchWrapper(
      async () => {
        const namespacesIterable: PagedAsyncIterableIterator<SBNamespace> =
          client.namespaces.list()
        for await (const namespace of namespacesIterable) {
          namespace && namespaces.push(namespace)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'namespaces',
        operation: 'list'
      }
    )

    const result: { [property: string]: RawAzureSBNamespace[] } = {}
    let numOfGroups = 0
    namespaces.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          region,
          resourceGroupId,
          Tags: tags || {},
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundServiceBus(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
