import {
  EventHubManagementClient,
  EHNamespace,
  Eventhub,
} from '@azure/arm-eventhub'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'EventHub'

export interface RawAzureEventHub extends Omit<Eventhub, 'location'> {
  region: string
  resourceGroup: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureEventHub[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new EventHubManagementClient(
      tokenCredentials,
      subscriptionId
    )

    const namespacesIterable = client.namespaces.list()
    const namespaces: EHNamespace[] = []
    await tryCatchWrapper(
      async () => {
        for await (const namespace of namespacesIterable) {
          namespaces.push(namespace)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'namespaces',
        operation: 'list',
      }
    )

    const eventHubs: Eventhub[] = []
    await Promise.all(
      (namespaces || []).map(async ({ name, ...rest }) => {
        const resourceGroup = getResourceGroupFromEntity(rest)
        const eventHubIterable = client.eventHubs.listByNamespace(
          resourceGroup,
          name
        )
        await tryCatchWrapper(
          async () => {
            for await (const eventuHub of eventHubIterable) {
              eventHubs.push(eventuHub)
            }
          },
          {
            service: serviceName,
            client,
            scope: 'eventHubs',
            operation: 'listByNamespace',
          }
        )
      })
    )
    logger.debug(lt.foundEventHubNamespaces(namespaces.length))

    const result = {}
    let numOfGroups = 0
    eventHubs.map(({ location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroup = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          region,
          resourceGroup,
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundEventHubs(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
