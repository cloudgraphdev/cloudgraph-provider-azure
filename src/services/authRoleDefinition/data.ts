import { AuthorizationManagementClient } from '@azure/arm-authorization'
import {
  RoleDefinition,
  RoleDefinitionsListResponse,
  RoleDefinitionsListNextResponse,
} from '@azure/arm-authorization/esm/models'
import CloudGraph from '@cloudgraph/sdk'
import { regionMap } from '../../enums/regions'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'AuthorizationRoleDefinition'

export interface RawAzureAuthRoleDefinition extends RoleDefinition {
  resourceGroupId: string
  region: string
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAuthRoleDefinition[]
}> => {
  try {
    const { credentials, subscriptionId } = config
    const client = new AuthorizationManagementClient(
      credentials,
      subscriptionId
    )
    const scope = `/subscriptions/${subscriptionId}`
    const roleAssignmentData: RoleDefinition[] = await getAllResources({
      listCall: async (): Promise<RoleDefinitionsListResponse> =>
        client.roleDefinitions.list(scope),
      listNextCall: async (
        nextLink: string
      ): Promise<RoleDefinitionsListNextResponse> =>
        client.roleDefinitions.listNext(nextLink),
      debugScope: {
        service: serviceName,
        client,
        scope: 'roleDefinitions',
      },
    })

    const result: {
      global: RawAzureAuthRoleDefinition[]
    } = { global: [] }
    result.global = roleAssignmentData.map(role => {
      const resourceGroupId = getResourceGroupFromEntity(role)
      return {
        resourceGroupId,
        region: regionMap.global,
        ...role,
      }
    })
    logger.debug(lt.foundAuthRoleDefinitions(roleAssignmentData.length))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
