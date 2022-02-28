import { PagedAsyncIterableIterator } from '@azure/core-paging'
import { PolicyClient, PolicyAssignment } from '@azure/arm-policy'

import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'PolicyAssignment'

export interface RawAzurePolicyAssignment
  extends Omit<PolicyAssignment, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
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
            const resourceGroupId = getResourceGroupFromEntity(rest)
            const region = lowerCaseLocation(location)
            policyAssignmentsData.push({
              ...rest,
              region,
              resourceGroupId,
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
    policyAssignmentsData.map(({ region, resourceGroupId, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          ...rest,
          region,
          resourceGroupId,
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
