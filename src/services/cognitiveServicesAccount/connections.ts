import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureCognitiveServicesAccount } from './data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { regionMap } from '../../enums/regions'
import { RawAzureADApplication } from '../adApplication/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureCognitiveServicesAccount
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    resourceGroupId: rgName,
    properties: { apiProperties: { aadClientId } = {} } = {},
  } = service

  /**
   * Find resource group related to this action group
   */
  const resourceGroups: {
    name: string
    data: { [property: string]: RawAzureResourceGroup[] }
  } = data.find(({ name }) => name === services.resourceGroup)

  if (resourceGroups?.data?.[region]) {
    const resourceGroupsInRegion: RawAzureResourceGroup[] = resourceGroups.data[
      region
    ].filter(({ name: resourceGroupName }: RawAzureResourceGroup) =>
      caseInsensitiveEqual(resourceGroupName, rgName)
    )

    if (!isEmpty(resourceGroupsInRegion)) {
      for (const rg of resourceGroupsInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.resourceGroup,
          relation: 'child',
          field: 'resourceGroup',
        })
      }
    }
  }

  if (region === regionMap.global) {
    const applications: {
      name: string
      data: { [property: string]: RawAzureADApplication[] }
    } = data.find(({ name }) => name === services.adApplication)

    if (applications?.data?.global) {
      const appsWithThisAuthRoleAssignment: RawAzureADApplication[] =
        applications.data.global.filter(
          ({ id: applicationId }) => aadClientId === applicationId
        )

      if (!isEmpty(appsWithThisAuthRoleAssignment)) {
        for (const app of appsWithThisAuthRoleAssignment) {
          connections.push({
            id: app.id,
            resourceType: services.adApplication,
            relation: 'child',
            field: 'application',
          })
        }
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
