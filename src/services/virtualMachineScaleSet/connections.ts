import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureVirtualMachine } from '../virtualMachine/data'
import { RawAzureVirtualMachineScaleSet } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureVirtualMachineScaleSet
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName } = service

  /**
   * Find resource group related to this VM Scale set
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
   * Find VMs related to this VM Scale set
   */
  const virtualMachines: {
    name: string
    data: { [property: string]: RawAzureVirtualMachine[] }
  } = data.find(({ name }) => name === services.virtualMachine)

  if (virtualMachines?.data?.[region]) {
    const virtualMachineInRegion: RawAzureVirtualMachine[] = virtualMachines.data[
      region
    ].filter(({virtualMachineScaleSet}: RawAzureVirtualMachine) =>
      virtualMachineScaleSet?.id && virtualMachineScaleSet.id === id
    )

    if (!isEmpty(virtualMachineInRegion)) {
      for (const vm of virtualMachineInRegion) {
        connections.push({
          id: vm.id,
          resourceType: services.virtualMachine,
          relation: 'child',
          field: 'virtualMachines',
        })
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
