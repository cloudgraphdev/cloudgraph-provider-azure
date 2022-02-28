import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureFirewall } from './data'

/**
 * Firewall
 */
export default ({
  service: firewall,
  data,
  region,
}: {
  data: { name: string; data: { [property: string]: any[] } }[]
  service: RawAzureFirewall
  region: string
}): { [key: string]: ServiceConnection[] } => {
  const connections: ServiceConnection[] = []

  const {
    id,
    ipConfigurations,
    resourceGroupId: rgName
  } = firewall
  /**
   * Find resource group related to this firewall
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
   * related to the cloudTrail
   */
  const virtualNetworks = data.find(({ name }) => name === services.virtualNetwork)
  if (virtualNetworks?.data?.[region]) {
    const ipConfigSubnets = ipConfigurations?.map(({subnet}) => subnet?.id) || []
    const virtualNetworksInRegion = virtualNetworks.data[region]
      .filter(vn => vn?.subnets
        .find(subnet => ipConfigSubnets.includes(subnet.id)) || false
      )

    if (!isEmpty(virtualNetworksInRegion)) {
      for (const virtualNetwork of virtualNetworksInRegion) {
        const { id: vnId } = virtualNetwork
        connections.push({
          id: vnId,
          resourceType: services.virtualNetwork,
          relation: 'child',
          field: 'virtualNetworks',
        })
      }
    }
  }
  /**
   * Find Public IP
   * related to the cloudTrail
   */
  const publicIps = data.find(({ name }) => name === services.publicIp)
  if (publicIps?.data?.[region]) {
    const ipConfigPublisIpAddresses = ipConfigurations?.map(({publicIPAddress}) => publicIPAddress?.id) || []
    const publicIpsInRegion = publicIps.data[region]
      .filter(({id: pubIpId}) => ipConfigPublisIpAddresses.includes(pubIpId))

    if (!isEmpty(publicIpsInRegion)) {
      for (const publicIp of publicIpsInRegion) {
        const { id: pubIpId } = publicIp
        connections.push({
          id: pubIpId,
          resourceType: services.publicIp,
          relation: 'child',
          field: 'publicIps',
        })
      }
    }
  }
  const fwResult = {
    [id]: connections,
  }
  return fwResult;
}
