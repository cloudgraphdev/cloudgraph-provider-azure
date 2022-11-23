import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import { regionMap } from '../../enums/regions'
import services from '../../enums/services'

import { RawAzureADApplication } from './data'
import { RawAzureADGroup } from '../adGroup/data'
import { RawAzureADUser } from '../adUser/data'
import { RawAzureADServicePrincipal } from '../adServicePrincipal/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureADApplication
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, appId, owners = [] } = service
  const ownerIds = owners.map(({ id: ownerId }) => ownerId) || []

  if (region === regionMap.global) {
    /**
     * Find AD Groups that own this AD Application
     */
    const groups: {
      name: string
      data: { [property: string]: RawAzureADGroup[] }
    } = data.find(({ name }) => name === services.adGroup)

    if (groups?.data?.global) {
      const groupsThatOwnThisApp: RawAzureADGroup[] = groups.data.global.filter(
        ({ id: ownerGroupsId }) => ownerIds.includes(ownerGroupsId)
      )

      if (!isEmpty(groupsThatOwnThisApp)) {
        for (const g of groupsThatOwnThisApp) {
          connections.push({
            id: g.id,
            resourceType: services.adGroup,
            relation: 'child',
            field: 'ownerGroups',
          })
        }
      }
    }
    /**
     * Find AD Users that own this AD Application
     */
    const users: {
      name: string
      data: { [property: string]: RawAzureADUser[] }
    } = data.find(({ name }) => name === services.adUser)

    if (users?.data?.global) {
      const usersThatOwnThisApp: RawAzureADUser[] = users.data.global.filter(
        ({ id: ownerUsersId }) => ownerIds.includes(ownerUsersId)
      )

      if (!isEmpty(usersThatOwnThisApp)) {
        for (const g of usersThatOwnThisApp) {
          connections.push({
            id: g.id,
            resourceType: services.adUser,
            relation: 'child',
            field: 'ownerUsers',
          })
        }
      }
    }
    /**
     * Find AD Service Principals that instance/own this AD Application
     */
    const servicePrincipals: {
      name: string
      data: { [property: string]: RawAzureADServicePrincipal[] }
    } = data.find(({ name }) => name === services.adServicePrincipal)

    if (servicePrincipals?.data?.global) {
      const sPsThatOwnThisApp: RawAzureADServicePrincipal[] =
        servicePrincipals.data.global.filter(
          ({ id: ownerServicePrincipalsId }) =>
            ownerIds.includes(ownerServicePrincipalsId)
        )

      if (!isEmpty(sPsThatOwnThisApp)) {
        for (const sP of sPsThatOwnThisApp) {
          connections.push({
            id: sP.id,
            resourceType: services.adServicePrincipal,
            relation: 'child',
            field: 'ownerServicePrincipals',
          })
        }
      }
      const servicePrincipalsThatInstancesThisApp: RawAzureADServicePrincipal[] =
        servicePrincipals.data.global.filter(
          ({ appId: instanceServicePrincipalsAppId }) =>
            instanceServicePrincipalsAppId === appId
        )

      if (!isEmpty(servicePrincipalsThatInstancesThisApp)) {
        for (const sP of servicePrincipalsThatInstancesThisApp) {
          connections.push({
            id: sP.id,
            resourceType: services.adServicePrincipal,
            relation: 'child',
            field: 'instancedBy',
          })
        }
      }
    }
  }

  const adAResult = {
    [id]: connections,
  }
  return adAResult
}
