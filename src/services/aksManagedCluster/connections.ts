import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureVirtualMachineScaleSet } from '../virtualMachineScaleSet/data'
import { RawAzureAksManagedCluster } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureAksManagedCluster
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName, nodeResourceGroup: nodeRgName } = service

  /**
   * Find resource group related to this kubernetes environment
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
   * Find VMSS related to this kubernetes environment
   */
  const vmssList: {
    name: string
    data: { [property: string]: RawAzureVirtualMachineScaleSet[] }
  } = data.find(({ name }) => name === services.virtualMachineScaleSet)

  if (vmssList?.data?.[region]) {
    const vmssInRegion: RawAzureVirtualMachineScaleSet[] = vmssList.data[
      region
    ].filter(({resourceGroupId: vmssRgName}: RawAzureVirtualMachineScaleSet) => 
      caseInsensitiveEqual(vmssRgName, nodeRgName)
    )

    if (!isEmpty(vmssInRegion)) {
      for (const vmss of vmssInRegion) {
        connections.push({
          id: vmss.id,
          resourceType: services.virtualMachineScaleSet,
          relation: 'child',
          field: 'virtualMachineScaleSets',
        })
      }
    }
  }

  const kResult = {
    [id]: connections,
  }
  return kResult
}
