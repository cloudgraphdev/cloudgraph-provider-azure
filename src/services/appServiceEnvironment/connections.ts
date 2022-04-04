import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureAppServiceEnvironment } from './data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureVirtualNetwork } from '../virtualNetwork/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureAppServiceEnvironment
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName, virtualNetwork } = service

  /**
   * Find resource group related to this app service environment
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
   * Find Virtual Network
   * related to this app service environment
   */
  const virtualNetworks: {
    name: string
    data: { [property: string]: RawAzureVirtualNetwork[] }
  } = data.find(({ name }) => name === services.virtualNetwork)
  if (virtualNetworks?.data?.[region]) {
    const virtualNetworksInRegion = virtualNetworks.data[region].filter(vn =>
      vn?.subnets.find(subnet => virtualNetwork.id === subnet.id)
    )

    if (!isEmpty(virtualNetworksInRegion)) {
      for (const vn of virtualNetworksInRegion) {
        const { id: vnId } = vn
        connections.push({
          id: vnId,
          resourceType: services.virtualNetwork,
          relation: 'child',
          field: 'virtualNetwork',
        })
      }
    }
  }

  const aSPResult = {
    [id]: connections,
  }
  return aSPResult
}
