import {
  NetworkManagementClient,
  NetworkSecurityGroup,
  NetworkWatcher,
  FlowLog,
} from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'NetworkSecurityGroup'

export interface RawAzureFlowLog extends Omit<FlowLog, 'tags' | 'location'> {
  Tags: TagMap
}

export interface RawAzureNetworkSecurityGroup
  extends Omit<NetworkSecurityGroup, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
  flowLogs: RawAzureFlowLog[]
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureNetworkSecurityGroup[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const securityGroupData: NetworkSecurityGroup[] = []
    await tryCatchWrapper(
      async () => {
        const securityGroupITerable: PagedAsyncIterableIterator<NetworkSecurityGroup> =
          client.networkSecurityGroups.listAll()
        for await (const securityGroup of securityGroupITerable) {
          securityGroup && securityGroupData.push(securityGroup)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'networkSecurityGroups',
      }
    )

    const networkWatchers: NetworkWatcher[] = []
    await tryCatchWrapper(
      async () => {
        const networkWatchersIterable: PagedAsyncIterableIterator<NetworkWatcher> =
          client.networkWatchers.listAll()
        for await (const networkWatcher of networkWatchersIterable) {
          networkWatcher && networkWatchers.push(networkWatcher)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'networkWatchers',
        operation: 'listAll',
      }
    )

    let flowLogs: RawAzureFlowLog[] = []
    await tryCatchWrapper(
      async () => {
        flowLogs = await Promise.all(
          networkWatchers.map(async networkWatcher => {
            const { name } = networkWatcher
            const resourceGroup = getResourceGroupFromEntity(networkWatcher)

            const flowLogsIterable: PagedAsyncIterableIterator<FlowLog> =
              client.flowLogs.list(resourceGroup, name)

            for await (const flowLog of flowLogsIterable) {
              if (flowLog) {
                const { tags, ...rest } = flowLog
                return {
                  ...rest,
                  Tags: tags || {},
                }
              }
            }
          })
        )
        logger.debug(lt.foundSecurityGroupFlowLogs(flowLogs.length))
      },
      {
        service: serviceName,
        client,
        scope: 'flowLogs',
        operation: 'list',
      }
    )

    const result: {
      [property: string]: RawAzureNetworkSecurityGroup[]
    } = {}
    let numOfGroups = 0
    securityGroupData.map(({ id, tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          id,
          region,
          resourceGroupId,
          Tags: tags || {},
          flowLogs: flowLogs?.filter(l => l && l.targetResourceId === id) || [],
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundSecurityGroups(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
