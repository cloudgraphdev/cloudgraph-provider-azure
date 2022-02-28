import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureNetworkInterface } from '../networkInterface/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureVirtualNetwork } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureVirtualNetwork
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, subnets = [], resourceGroupId: rgName } = service
  const ipConfigsIds: string[] =
    (subnets || [])
      .map(
        ({ ipConfigurations = [] }) =>
          ipConfigurations.map(({ id: ipConfigId }) => ipConfigId) || []
      )
      .flat() || []

  /**
   * Find resource group related to this virtual network
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

  if (ipConfigsIds.length > 0) {
    /**
     * Find network interfaces related to this virtual network
     */
    const networkInterfaces: {
      name: string
      data: { [property: string]: RawAzureNetworkInterface[] }
    } = data.find(({ name }) => name === services.networkInterface)

    if (networkInterfaces?.data?.[region]) {
      const networkInterfacesInRegion: RawAzureNetworkInterface[] =
        networkInterfaces.data[region].filter(
          ({ ipConfigurations: netIpConfigs }: RawAzureNetworkInterface) =>
            netIpConfigs
              .map(({ id: netIpConfigId }) => netIpConfigId)
              .some(netConfigId => ipConfigsIds.includes(netConfigId))
        )

      if (!isEmpty(networkInterfacesInRegion)) {
        for (const networkInterface of networkInterfacesInRegion) {
          connections.push({
            id: networkInterface.id,
            resourceType: services.networkInterface,
            relation: 'child',
            field: 'networkInterfaces',
          })
        }
      }
    }
  }

  // TODO Virtual Network <-> Virtual Network, wait until CG-210 is approved

  const vNResult = {
    [id]: connections,
  }
  return vNResult
}
