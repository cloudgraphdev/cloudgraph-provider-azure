import { PagedAsyncIterableIterator } from '@azure/core-paging'
import { DefaultAzureCredential } from '@azure/identity'
import { PolicyClient, PolicyAssignment } from '@azure/arm-policy'

import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'PolicyAssigment'

export interface RawAzurePolicyAssigment
  extends Omit<PolicyAssignment, 'tags' | 'location'> {
  region: string
  resourceGroup: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzurePolicyAssigment[]
}> => {
  try {
    const { subscriptionId, tenantId } = config
    const credential = new DefaultAzureCredential({
      tenantId,
    })
    const client = new PolicyClient(credential, subscriptionId)

    const policyAssigmentsData: RawAzurePolicyAssigment[] = []
    const policyAssigmentsIterable: PagedAsyncIterableIterator<PolicyAssignment> =
      client.policyAssignments.list()

    await tryCatchWrapper(
      async () => {
        for await (const policyAssigment of policyAssigmentsIterable) {
          if (policyAssigment) {
            const { location, ...rest } = policyAssigment
            const resourceGroup = getResourceGroupFromEntity(rest)
            const region = (location && lowerCaseLocation(location)) || 'global'
            policyAssigmentsData.push({
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
        scope: 'policyAssigments',
        operation: 'list',
      }
    )

    const result: {
      [property: string]: RawAzurePolicyAssigment[]
    } = {}
    let numOfGroups = 0
    policyAssigmentsData.map(({ region, resourceGroup, ...rest }) => {
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
    logger.debug(lt.foundPolicyAssigments(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
