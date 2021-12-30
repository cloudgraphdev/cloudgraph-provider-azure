import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual, caseInsensitiveIncludes } from '../../utils'
import { RawAzureDisk } from '../disk/data'
import { RawAzureNetworkInterface } from '../networkInterface/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureVirtualNetwork } from '../virtualNetwork/data'
import { RawAzureVirtualMachine } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureVirtualMachine
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    networkProfile: { networkInterfaces: rawNetworkInterfaces = [] },
    resourceGroup: rgName,
  } = service
  const networkInterfaces = rawNetworkInterfaces.map(
    ({ id: rawNIId }) => rawNIId
  )

  /**
   * Find resource group related to this virtual machine
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
   * Find Disks related to this Virtual Machine
   */
  const disks: {
    name: string
    data: { [property: string]: RawAzureDisk[] }
  } = data.find(({ name }) => name === services.disk)

  if (disks?.data?.[region]) {
    const disksInRegion: RawAzureDisk[] = disks.data[region].filter(
      ({ managedBy: vmId = '' }: RawAzureDisk) => caseInsensitiveEqual(vmId, id)
    )

    if (!isEmpty(disksInRegion)) {
      for (const disk of disksInRegion) {
        connections.push({
          id: disk.id,
          resourceType: services.disk,
          relation: 'child',
          field: 'disks',
        })
      }
    }
  }
  /**
   * Find Network Interfaces related to this Virtual Machine
   */
  const allNetworkInterfaces: {
    name: string
    data: { [property: string]: RawAzureNetworkInterface[] }
  } = data.find(({ name }) => name === services.networkInterface)

  if (allNetworkInterfaces?.data?.[region]) {
    const networkInterfacesInRegion: RawAzureNetworkInterface[] =
      allNetworkInterfaces.data[region].filter(
        ({
          id: networkInterfaceId,
          virtualMachine: { id: netVmId } = {},
        }: RawAzureNetworkInterface) =>
          caseInsensitiveIncludes(networkInterfaces, networkInterfaceId) ||
          caseInsensitiveEqual(id, netVmId)
      )

    if (!isEmpty(networkInterfacesInRegion)) {
      for (const netInterface of networkInterfacesInRegion) {
        connections.push({
          id: netInterface.id,
          resourceType: services.networkInterface,
          relation: 'child',
          field: 'networkInterfaces',
        })
      }
    }
  }

  /**
   * Find Virtual Networks related to this Virtual Machine
   */
  const virtualNetworks: {
    name: string
    data: { [property: string]: RawAzureVirtualNetwork[] }
  } = data.find(({ name }) => name === services.virtualNetwork)

  if (virtualNetworks?.data?.[region]) {
    const virtualNetworksInRegion: RawAzureVirtualNetwork[] =
      virtualNetworks.data[region].filter(
        ({ resourceGuid: rgId }: RawAzureVirtualNetwork) =>
          caseInsensitiveEqual(rgId, id)
      )

    if (!isEmpty(virtualNetworksInRegion)) {
      for (const virtualNw of virtualNetworksInRegion) {
        connections.push({
          id: virtualNw.id,
          resourceType: services.virtualNetwork,
          relation: 'child',
          field: 'virtualNetworks',
        })
      }
    }
  }

  const vmResult = {
    [id]: connections,
  }
  return vmResult
}
