import { SynapseManagementClient, Workspace } from '@azure/arm-synapse'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'SynapseWorkspaces'

export interface RawAzureSynapseWorkspace
  extends Omit<Workspace, 'tags' | 'location'> {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureSynapseWorkspace[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new SynapseManagementClient(tokenCredentials, subscriptionId)
    const workspaces: RawAzureSynapseWorkspace[] = []
    await tryCatchWrapper(
      async () => {
        const workspacesIterable: PagedAsyncIterableIterator<Workspace> =
          client.workspaces.list()
        for await (const workspace of workspacesIterable) {
          if (workspace) {
            const resourceGroupId = getResourceGroupFromEntity(workspace)
            const { location, tags, ...rest } = workspace
            workspaces.push({
              ...rest,
              region: lowerCaseLocation(location),
              resourceGroupId,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'workspaces',
        operation: 'list',
      }
    )
    logger.debug(lt.foundSynapseWorkspaces(workspaces.length))

    const result: { [property: string]: RawAzureSynapseWorkspace[] } = {}
    workspaces.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          region,
          ...rest,
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}