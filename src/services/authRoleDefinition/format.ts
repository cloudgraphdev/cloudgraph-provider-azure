import cuid from 'cuid'
import { AzureAuthRoleDefinition } from '../../types/generated'
import { RawAzureAuthRoleDefinition } from './data'

export default ({
  service,
  account,
}: {
  service: RawAzureAuthRoleDefinition
  account: string
  region: string
}): AzureAuthRoleDefinition => {
  const {
    id,
    name,
    type,
    region,
    roleName,
    description,
    roleType,
    permissions,
    assignableScopes,
  } = service
  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    roleName,
    description,
    roleType,
    permissions: permissions.map(item => ({
      id: cuid(),
      ...item,
    })),
    assignableScopes,
  }
}
