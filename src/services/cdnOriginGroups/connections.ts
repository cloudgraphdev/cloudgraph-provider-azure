import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureCdnOrigin } from '../cdnOrigins/data'
import { RawAzureCdnOriginGroup } from '../cdnOriginGroups/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureCdnOriginGroup
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName, origins } = service

  /**
   * Find resource group related to this cdn origin group
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

  /**
   * Find cdn origins related to this cdn origin group
   */
  const cdnOrigins: {
    name: string
    data: { [property: string]: RawAzureCdnOrigin[] }
  } = data.find(({ name }) => name === services.cdnOrigins)

  const originIds = origins?.map(o => o.id)

  if (cdnOrigins?.data?.[region] && !isEmpty(originIds)) {
    const cdnOriginsInRegion: RawAzureCdnOrigin[] = cdnOrigins.data[
      region
    ].filter(({ id: originId }: RawAzureCdnOrigin) =>
      originIds.includes(originId)
    )

    if (!isEmpty(cdnOriginsInRegion)) {
      for (const origin of cdnOriginsInRegion) {
        connections.push({
          id: origin.id,
          resourceType: services.cdnOrigins,
          relation: 'child',
          field: 'cdnOrigins',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
