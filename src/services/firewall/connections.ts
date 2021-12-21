import { AzureFirewall } from '@azure/arm-network/esm/models'
import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import services from '../../enums/services'
import { TagMap } from '../../types'

/**
 * Firewall
 */
export default ({
  service: firewall,
  data,
  region,
}: {
  data: { name: string; data: { [property: string]: any[] } }[]
  service: AzureFirewall & {
    Tags: TagMap
    region: string
  }
  region: string
}): { [key: string]: ServiceConnection[] } => {
  const connections: ServiceConnection[] = []

  const {
    id,
    ipConfigurations,
  } = firewall

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
          field: 'virtualNetwork',
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
          field: 'publicIp',
        })
      }
    }
  }
  const fwResult = {
    [id]: connections,
  }
  return fwResult;
}
