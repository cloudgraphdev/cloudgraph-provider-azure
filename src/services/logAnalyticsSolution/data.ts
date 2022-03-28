import CloudGraph from '@cloudgraph/sdk'
import {
  OperationsManagementClient,
  OperationsManagementModels,
} from '@azure/arm-operations'
import azureLoggerText from '../../properties/logger'

import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'

export interface RawAzureLogAnalyticsSolution
  extends Omit<OperationsManagementModels.Solution, 'tags' | 'location'> {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'LogAnalyticsSolution'

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureLogAnalyticsSolution[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const client = new OperationsManagementClient(
      tokenCredentials,
      subscriptionId,
      '',
      '',
      ''
    )

    const workspaceData: OperationsManagementModels.Solution[] = []

    await tryCatchWrapper(
      async () => {
        const { value: solutions = [] } =
          await client.solutions.listBySubscription()

        if (solutions) {
          workspaceData.push(...solutions)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'logAnalyticsSolutions',
        operation: 'list',
      }
    )

    const result: {
      [property: string]: RawAzureLogAnalyticsSolution[]
    } = {}
    let numOfGroups = 0
    workspaceData.map(({ location, tags, ...rest }) => {
      const region = lowerCaseLocation(location)
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
    logger.debug(lt.foundLogAnalyticsSolutions(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
