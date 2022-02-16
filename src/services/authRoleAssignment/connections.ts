import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import apiSelectors from '../../enums/apiSelectors'

import { regionMap } from '../../enums/regions'
import services from '../../enums/services'
import { RawAzureADApplication } from '../adApplication/data'
import { RawAzureADGroup } from '../adGroup/data'
import { RawAzureADServicePrincipal } from '../adServicePrincipal/data'
import { RawAzureADUser } from '../adUser/data'
import { RawAzureAuthRoleDefinition } from '../authRoleDefinition/data'
import { RawAzureAuthRoleAssignment } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureAuthRoleAssignment
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id: authRoleAssignmentId,
    principalId,
    principalType,
    roleDefinitionId: roleAssignmentRoleDefinitionId,
  } = service

  if (region === regionMap.global) {
    const applications: {
      name: string
      data: { [property: string]: RawAzureADApplication[] }
    } = data.find(({ name }) => name === services.adApplication)

    if (
      applications?.data?.global &&
      principalType === apiSelectors.applicationAdPrincipalType
    ) {
      const appsWithThisAuthRoleAssignment: RawAzureADApplication[] =
        applications.data.global.filter(
          ({ id: applicationId }) => principalId === applicationId
        )

      if (!isEmpty(appsWithThisAuthRoleAssignment)) {
        for (const app of appsWithThisAuthRoleAssignment) {
          connections.push({
            id: app.id,
            resourceType: services.adApplication,
            relation: 'child',
            field: 'applications',
          })
        }
      }
    }
    const groups: {
      name: string
      data: { [property: string]: RawAzureADGroup[] }
    } = data.find(({ name }) => name === services.adGroup)

    if (
      groups?.data?.global &&
      principalType === apiSelectors.groupAdPrincipalType
    ) {
      const groupsWithThisAuthRoleAssignment: RawAzureADGroup[] =
        groups.data.global.filter(({ id: groupId }) => principalId === groupId)

      if (!isEmpty(groupsWithThisAuthRoleAssignment)) {
        for (const g of groupsWithThisAuthRoleAssignment) {
          connections.push({
            id: g.id,
            resourceType: services.adGroup,
            relation: 'child',
            field: 'groups',
          })
        }
      }
    }
    const servicePrincipals: {
      name: string
      data: { [property: string]: RawAzureADServicePrincipal[] }
    } = data.find(({ name }) => name === services.adServicePrincipal)

    if (
      servicePrincipals?.data?.global &&
      principalType === apiSelectors.servicePrincipalAdPrincipalType
    ) {
      const servicePrincipalsWithThisAuthRoleAssignment: RawAzureADServicePrincipal[] =
        servicePrincipals.data.global.filter(
          ({ id: servicePrincipalId }) => principalId === servicePrincipalId
        )

      if (!isEmpty(servicePrincipalsWithThisAuthRoleAssignment)) {
        for (const sP of servicePrincipalsWithThisAuthRoleAssignment) {
          connections.push({
            id: sP.id,
            resourceType: services.adServicePrincipal,
            relation: 'child',
            field: 'servicePrincipals',
          })
        }
      }
    }
    const users: {
      name: string
      data: { [property: string]: RawAzureADUser[] }
    } = data.find(({ name }) => name === services.adUser)

    if (
      users?.data?.global &&
      principalType === apiSelectors.userAdPrincipalType
    ) {
      const usersWithThisAuthRoleAssignment: RawAzureADUser[] =
        users.data.global.filter(({ id: userId }) => principalId === userId)

      if (!isEmpty(usersWithThisAuthRoleAssignment)) {
        for (const u of usersWithThisAuthRoleAssignment) {
          connections.push({
            id: u.id,
            resourceType: services.adUser,
            relation: 'child',
            field: 'users',
          })
        }
      }
    }
    const roleDefinitions: {
      name: string
      data: { [property: string]: RawAzureAuthRoleDefinition[] }
    } = data.find(({ name }) => name === services.authRoleDefinition)

    if (roleDefinitions?.data?.global) {
      const roleDefinition: RawAzureAuthRoleDefinition =
        roleDefinitions.data.global.find(
          ({ id: roleDefinitionId }) =>
            roleAssignmentRoleDefinitionId === roleDefinitionId
        )

      if (roleDefinition) {
        connections.push({
          id: roleDefinition.id,
          resourceType: services.authRoleDefinition,
          relation: 'child',
          field: 'roleDefinition',
        })
      }
    }
  }

  const authRoleAssigmentsResult = {
    [authRoleAssignmentId]: connections,
  }
  return authRoleAssigmentsResult
}
