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
            field: 'resourceGroups',
          })
        }
      }
    }
    /**
     * Find related App Service Plan
     */
     const appServicePlans: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.appServicePlan)
    if (appServicePlans?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        appServicePlans.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const appServicePlan of dataAtRegion) {
          const { id } = appServicePlan
          connections.push({
            id,
            resourceType: services.appServicePlan,
            relation: 'child',
            field: 'appServicePlans',
          })
        }
      }
    }
    /**
     * Find related App Service Web App
     */
     const appServiceWebApps: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.appServiceWebApp)
    if (appServiceWebApps?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        appServiceWebApps.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const appServiceWebApp of dataAtRegion) {
          const { id } = appServiceWebApp
          connections.push({
            id,
            resourceType: services.appServiceWebApp,
            relation: 'child',
            field: 'appServiceWebApps',
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
            field: 'functionApps',
          })
        }
      }
    }
    /**
     * Find related Azure KeyVault
     */
    const azureKeyVaults: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.keyVault)
    if (azureKeyVaults?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        azureKeyVaults.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureKeyVault of dataAtRegion) {
          const { id } = azureKeyVault
          connections.push({
            id,
            resourceType: services.keyVault,
            relation: 'child',
            field: 'keyVaults',
          })
        }
      }
    }
    /**
     * Find related network security groups
     */
    const securityGroups: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.securityGroup)
    if (securityGroups?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        securityGroups.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const securityGroup of dataAtRegion) {
          const { id } = securityGroup
          connections.push({
            id,
            resourceType: services.securityGroup,
            relation: 'child',
            field: 'securityGroups',
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
            field: 'virtualNetworks',
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
        for (const azureDisk of dataAtRegion) {
          const { id } = azureDisk
          connections.push({
            id,
            resourceType: services.disk,
            relation: 'child',
            field: 'disks',
          })
        }
      }
    }
    /**
     * Find related Firewall
     */
    const firewalls: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.firewall)
    if (firewalls?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        firewalls.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureFirewall of dataAtRegion) {
          const { id } = azureFirewall
          connections.push({
            id,
            resourceType: services.firewall,
            relation: 'child',
            field: 'firewalls',
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
            field: 'publicIps',
          })
        }
      }
    }

    /**
     * Find related Storage Accounts
     */
    const azureStorageAccounts: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.storageAccount)
    if (azureStorageAccounts?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        azureStorageAccounts.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureStorageAccount of dataAtRegion) {
          const { id } = azureStorageAccount
          connections.push({
            id,
            resourceType: services.storageAccount,
            relation: 'child',
            field: 'storageAccounts',
          })
        }
      }
    }
    /**
     * Find related Dns Zones
     */
    const dnsZones: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.dns)
    if (dnsZones?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        dnsZones.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const dnsZone of dataAtRegion) {
          const { id } = dnsZone
          connections.push({
            id,
            resourceType: services.dns,
            relation: 'child',
            field: 'dns',
          })
        }
      }
    }
    /**
     * Find related Virtual Machines
     */
    const virtualMachines: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.virtualMachine)
    if (virtualMachines?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        virtualMachines.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const virtualMachine of dataAtRegion) {
          const { id } = virtualMachine
          connections.push({
            id,
            resourceType: services.virtualMachine,
            relation: 'child',
            field: 'virtualMachines',
          })
        }
      }
    }
    /**
     * Find related CDN Profiles
     */
     const cdnProfiles: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.cdnProfiles)
    if (cdnProfiles?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        cdnProfiles.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const cdnProfile of dataAtRegion) {
          const { id } = cdnProfile
          connections.push({
            id,
            resourceType: services.cdnProfiles,
            relation: 'child',
            field: 'cdnProfiles',
          })
        }
      }
    }
    /**
     * Find related CDN Endpoints
     */
     const cdnEndpoints: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.cdnEndpoints)
    if (cdnEndpoints?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        cdnEndpoints.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const cdnEndpoint of dataAtRegion) {
          const { id } = cdnEndpoint
          connections.push({
            id,
            resourceType: services.cdnEndpoints,
            relation: 'child',
            field: 'cdnEndpoints',
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
