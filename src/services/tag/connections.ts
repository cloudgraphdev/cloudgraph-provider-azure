import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import regions from '../../enums/regions'
import services from '../../enums/services'

const findServiceInstancesWithTag = (tag: any, service: any): any => {
  const { id } = tag
  return service.filter(({ Tags }) => {
    for (const [key, value] of Object.entries(Tags)) {
      if (id === `${key}:${value}`) {
        return true
      }
    }
    return false
  })
}

export default ({
  service: tag,
  data,
}: {
  service: any
  data: Array<{ name: string; data: { [property: string]: any[] } }>
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  for (const region of regions) {
    /**
     * Find related Resource Groups
     */
    const resourceGroups: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.resourceGroup)
    if (resourceGroups?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        resourceGroups.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const resourceGroup of dataAtRegion) {
          const { id } = resourceGroup
          connections.push({
            id,
            resourceType: services.resourceGroup,
            relation: 'child',
            field: 'resourceGroup',
          })
        }
      }
    }
    /**
     * Find related Azure Functions
     */
    const azureFunctions: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.functionApp)
    if (azureFunctions?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        azureFunctions.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureFunction of dataAtRegion) {
          const { id } = azureFunction
          connections.push({
            id,
            resourceType: services.functionApp,
            relation: 'child',
            field: 'functionApp',
          })
        }
      }
    }
    /**
     * Find related Virtual Networks
     */
    const virtualNetworks: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.virtualNetwork)
    if (virtualNetworks?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        virtualNetworks.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const virtualNetwork of dataAtRegion) {
          const { id } = virtualNetwork
          connections.push({
            id,
            resourceType: services.virtualNetwork,
            relation: 'child',
            field: 'virtualNetwork',
          })
        }
      }
    }
    /**
     * Find related Azure Network Interfaces
     */
    const azureNetworkInterfaces: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.networkInterface)
    if (azureNetworkInterfaces?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        azureNetworkInterfaces.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const networkInterface of dataAtRegion) {
          const { id } = networkInterface
          connections.push({
            id,
            resourceType: services.networkInterface,
            relation: 'child',
            field: 'networkInterfaces',
          })
        }
      }
    }
    /**
     * Find related Disks
     */
     const disks: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.disk)
    if (disks?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        disks.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureFunction of dataAtRegion) {
          const { id } = azureFunction
          connections.push({
            id,
            resourceType: services.disk,
            relation: 'child',
            field: 'disk',
          })
        }
      }
    }
    /**
     * Find related Public Ips
     */
     const publicIps: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.publicIp)
    if (publicIps?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        publicIps.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const publicIp of dataAtRegion) {
          const { id } = publicIp
          connections.push({
            id,
            resourceType: services.publicIp,
            relation: 'child',
            field: 'publicIp',
          })
        }
      }
    }
  }

  const tagResult = {
    [tag.id]: connections,
  }
  return tagResult
}
