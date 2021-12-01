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
  }

  const tagResult = {
    [tag.id]: connections,
  }
  return tagResult
}
