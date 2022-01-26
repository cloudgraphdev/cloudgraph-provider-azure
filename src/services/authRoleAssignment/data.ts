import { AuthorizationManagementClient } from '@azure/arm-authorization'
import {
  RoleAssignment,
  RoleAssignmentsListResponse,
  RoleAssignmentsListNextResponse,
} from '@azure/arm-authorization/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'AuthorizationRoleAssignment'

export interface RawAzureAuthRoleAssignment extends RoleAssignment {
  resourceGroup: string
  region: string
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAuthRoleAssignment[]
}> => {
  try {
    const { credentials, subscriptionId } = config
    const client = new AuthorizationManagementClient(
      credentials,
      subscriptionId
    )
    const roleAssignmentData: RoleAssignment[] = await getAllResources({
      listCall: async (): Promise<RoleAssignmentsListResponse> =>
        client.roleAssignments.list(),
      listNextCall: async (
        nextLink: string
      ): Promise<RoleAssignmentsListNextResponse> =>
        client.roleAssignments.listNext(nextLink),
      debugScope: {
        service: serviceName,
        client,
        scope: 'roleAssignments',
      },
    })

    const result: {
      global: RawAzureAuthRoleAssignment[]
    } = { global: [] }
    result.global = roleAssignmentData.map(role => {
      const resourceGroup = getResourceGroupFromEntity(role)
      return {
        resourceGroup,
        region: 'global',
        ...role,
      }
    })
    logger.debug(lt.foundAuthRoleAssignments(roleAssignmentData.length))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
