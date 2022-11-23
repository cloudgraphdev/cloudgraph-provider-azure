import { AzureMachineLearningWorkspaces, Workspace } from '@azure/arm-machinelearningservices'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Machine Learning Workspace'

export interface RawAzureMachineLearningWorkspace
  extends Omit<Workspace, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureMachineLearningWorkspace[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new AzureMachineLearningWorkspaces(
      tokenCredentials,
      subscriptionId
    )
    const workspaces: Workspace[] = []
    const workspaceIterable: PagedAsyncIterableIterator<Workspace> =
      client.workspaces.listBySubscription()
    await tryCatchWrapper(
      async () => {
        for await (const workspace of workspaceIterable) {
          workspace && workspaces.push(workspace)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'workspaces',
        operation: 'listBySubscription',
      }
    )
    logger.debug(lt.foundMachineLearningWorkspaces(workspaces.length))

    const result: { [property: string]: RawAzureMachineLearningWorkspace[] } = {}
    workspaces.map(({ location, tags, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          region,
          ...rest,
          resourceGroupId,
          Tags: tags || {},
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
