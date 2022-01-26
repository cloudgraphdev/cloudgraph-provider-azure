import { AzureAuthRoleAssignment } from '../../types/generated'
import { RawAzureAuthRoleAssignment } from './data'

export default ({
  service,
  account,
}: {
  service: RawAzureAuthRoleAssignment
  account: string
  region: string
}): AzureAuthRoleAssignment => {
  const {
    id,
    name,
    type,
    region,
    scope,
    roleDefinitionId,
    principalId,
    principalType,
    canDelegate,
  } = service
  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    scope,
    roleDefinitionId,
    principalId,
    principalType,
    canDelegate,
  }
}
