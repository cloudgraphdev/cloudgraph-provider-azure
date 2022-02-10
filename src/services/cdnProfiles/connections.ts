import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureCdnEndpoint } from '../cdnEndpoints/data'
import { RawAzureCdnProfile } from '../cdnProfiles/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureCdnProfile
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroup: rgName } = service

  /**
   * Find resource group related to cdn profile
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
          field: 'resourceGroups',
        })
      }
    }
  }

  /**
   * Find cdn endpoints related to this cdn profile
   */
  const cdnEndpoints: {
    name: string
    data: { [property: string]: RawAzureCdnEndpoint[] }
  } = data.find(({ name }) => name === services.cdnEndpoints)

  if (cdnEndpoints?.data?.[region]) {
    const cdnEndpointsInRegion: RawAzureCdnEndpoint[] = cdnEndpoints.data[
      region
    ].filter(({ profileId }: RawAzureCdnEndpoint) =>
      caseInsensitiveEqual(profileId, id)
    )

    if (!isEmpty(cdnEndpointsInRegion)) {
      for (const endpoint of cdnEndpointsInRegion) {
        connections.push({
          id: endpoint.id,
          resourceType: services.cdnEndpoints,
          relation: 'child',
          field: 'cdnEndpoints',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
