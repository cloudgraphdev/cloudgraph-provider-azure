import CloudGraph from '@cloudgraph/sdk'
import {
  OperationalInsightsManagementClient,
  Workspace,
} from '@azure/arm-operationalinsights'
import azureLoggerText from '../../properties/logger'

import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

export interface RawAzureLogAnalyticsWorkspace
  extends Omit<Workspace, 'tags' | 'location'> {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'LogAnalyticsWorkspace'

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureLogAnalyticsWorkspace[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const client = new OperationalInsightsManagementClient(
      tokenCredentials,
      subscriptionId
    )

    const workspaceData: Workspace[] = []

    const workspacesListIterable = client.workspaces.list()
    await tryCatchWrapper(
      async () => {
        for await (const workspaceItem of workspacesListIterable) {
          if (workspaceItem) {
            workspaceData.push({
              ...workspaceItem,
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'logAnalyticsWorkspaces',
        operation: 'list',
      }
    )

    const result: {
      [property: string]: RawAzureLogAnalyticsWorkspace[]
    } = {}
    let numOfGroups = 0
    workspaceData.map(({ location: region, tags, ...rest }) => {
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
    logger.debug(lt.foundLogAnalyticsWorkspaces(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
