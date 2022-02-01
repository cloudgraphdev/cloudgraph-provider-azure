import { PagedAsyncIterableIterator } from '@azure/core-paging'
import { PolicyClient, PolicyAssignment } from '@azure/arm-policy'

import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'PolicyAssignment'

export interface RawAzurePolicyAssignment
  extends Omit<PolicyAssignment, 'tags' | 'location'> {
  region: string
  resourceGroup: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzurePolicyAssignment[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const client = new PolicyClient(tokenCredentials, subscriptionId)

    const policyAssignmentsData: RawAzurePolicyAssignment[] = []
    const policyAssignmentsIterable: PagedAsyncIterableIterator<PolicyAssignment> =
      client.policyAssignments.list()

    await tryCatchWrapper(
      async () => {
        for await (const policyAssignment of policyAssignmentsIterable) {
          if (policyAssignment) {
            const { location, ...rest } = policyAssignment
            const resourceGroup = getResourceGroupFromEntity(rest)
            const region = (location && lowerCaseLocation(location)) || 'global'
            policyAssignmentsData.push({
              ...rest,
              region,
              resourceGroup,
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'policyAssignments',
        operation: 'list',
      }
    )

    const result: {
      [property: string]: RawAzurePolicyAssignment[]
    } = {}
    let numOfGroups = 0
    policyAssignmentsData.map(({ region, resourceGroup, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          ...rest,
          region,
          resourceGroup
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundPolicyAssignments(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
