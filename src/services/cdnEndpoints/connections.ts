import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureCdnEndpoint } from '../cdnEndpoints/data'
import { RawAzureCdnCustomDomain } from '../cdnCustomDomains/data'
import { RawAzureCdnOrigin } from '../cdnOrigins/data'
import { RawAzureCdnOriginGroup } from '../cdnOriginGroups/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureCdnEndpoint
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroup: rgName } = service

  /**
   * Find resource group related to this cdn endpoint
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
   * Find cdn custom domains related to this cdn endpoint
   */
  const cdnCustomDomains: {
    name: string
    data: { [property: string]: RawAzureCdnCustomDomain[] }
  } = data.find(({ name }) => name === services.cdnCustomDomains)

  if (cdnCustomDomains?.data?.[region]) {
    const cdnCustomDomainsInRegion: RawAzureCdnCustomDomain[] =
      cdnCustomDomains.data[region].filter(
        ({ endpointId }: RawAzureCdnCustomDomain) =>
          caseInsensitiveEqual(endpointId, id)
      )

    if (!isEmpty(cdnCustomDomainsInRegion)) {
      for (const customDomain of cdnCustomDomainsInRegion) {
        connections.push({
          id: customDomain.id,
          resourceType: services.cdnCustomDomains,
          relation: 'child',
          field: 'cdnCustomDomains',
        })
      }
    }
  }

  /**
   * Find cdn origins related to this cdn endpoint
   */
  const cdnOrigins: {
    name: string
    data: { [property: string]: RawAzureCdnOrigin[] }
  } = data.find(({ name }) => name === services.cdnOrigins)

  if (cdnOrigins?.data?.[region]) {
    const cdnOriginsInRegion: RawAzureCdnOrigin[] = cdnOrigins.data[
      region
    ].filter(({ endpointId }: RawAzureCdnOrigin) =>
      caseInsensitiveEqual(endpointId, id)
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

  /**
   * Find cdn origin groups related to this cdn endpoint
   */
  const cdnOriginGroups: {
    name: string
    data: { [property: string]: RawAzureCdnOriginGroup[] }
  } = data.find(({ name }) => name === services.cdnOriginGroups)

  if (cdnOriginGroups?.data?.[region]) {
    const cdnOriginGroupsInRegion: RawAzureCdnOriginGroup[] =
      cdnOriginGroups.data[region].filter(
        ({ endpointId }: RawAzureCdnOriginGroup) =>
          caseInsensitiveEqual(endpointId, id)
      )

    if (!isEmpty(cdnOriginGroupsInRegion)) {
      for (const originGroup of cdnOriginGroupsInRegion) {
        connections.push({
          id: originGroup.id,
          resourceType: services.cdnOriginGroups,
          relation: 'child',
          field: 'cdnOriginGroups',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
