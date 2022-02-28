import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { RawAzureLoadBalancer } from './data'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzurePublicIpAddress } from '../publicIp/data'
import { RawAzureVirtualNetwork } from '../virtualNetwork/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureLoadBalancer
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    resourceGroupId: rgName,
    frontendIPConfigurations = [],
    backendAddressPools = [],
  } = service

  const frontendNIPublicAdressesIds: string[] =
    frontendIPConfigurations.map(({ publicIPAddress }) =>
      publicIPAddress?.id.toLowerCase()
    ) || []
  const frontendNIGatewayLBIds: string[] =
    frontendIPConfigurations.map(({ gatewayLoadBalancer }) =>
      gatewayLoadBalancer?.id.toLowerCase()
    ) || []
  const backendAPPublicIPAddressesIds: string[] =
    backendAddressPools
      .map(({ backendIPConfigurations = [] }) =>
        backendIPConfigurations.map(({ publicIPAddress }) =>
          publicIPAddress?.id.toLowerCase()
        )
      )
      .flat() || []

  const backendAPVirtualNetworksIds: string[] =
    backendAddressPools
      .map(({ loadBalancerBackendAddresses = [] }) =>
        loadBalancerBackendAddresses.map(({ virtualNetwork }) =>
          virtualNetwork?.id.toLowerCase()
        )
      )
      .flat() || []

  /**
   * Find resource groups related to this load balancer
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
   * Find public Ips related to this load balancer
   */
  const publicIps: {
    name: string
    data: { [property: string]: RawAzurePublicIpAddress[] }
  } = data.find(({ name }) => name === services.publicIp)

  if (publicIps?.data?.[region]) {
    const frontendPublicIps: RawAzurePublicIpAddress[] = publicIps.data[
      region
    ].filter(({ id: frontendPublicIpId }: RawAzurePublicIpAddress) =>
      frontendNIPublicAdressesIds.includes(frontendPublicIpId.toLowerCase())
    )

    if (!isEmpty(frontendPublicIps)) {
      for (const fPIp of frontendPublicIps) {
        connections.push({
          id: fPIp.id,
          resourceType: services.publicIp,
          relation: 'child',
          field: 'frontendPublicIps',
        })
      }
    }

    const backendPublicIps: RawAzurePublicIpAddress[] = publicIps.data[
      region
    ].filter(({ id: backendPublicIpId }: RawAzurePublicIpAddress) =>
      backendAPPublicIPAddressesIds.includes(backendPublicIpId.toLowerCase())
    )

    if (!isEmpty(backendPublicIps)) {
      for (const bPIp of backendPublicIps) {
        connections.push({
          id: bPIp.id,
          resourceType: services.publicIp,
          relation: 'child',
          field: 'backendPublicIps',
        })
      }
    }
  }

  /**
   * Find gateway load balancers related to this load balancer
   */
  const loadBalancers: {
    name: string
    data: { [property: string]: RawAzureLoadBalancer[] }
  } = data.find(({ name }) => name === services.loadBalancer)

  if (loadBalancers?.data?.[region]) {
    const loadBalancersInRegion: RawAzureLoadBalancer[] = loadBalancers.data[
      region
    ].filter(({ id: loadBalancerId }: RawAzureLoadBalancer) =>
      frontendNIGatewayLBIds.includes(loadBalancerId.toLowerCase())
    )

    if (!isEmpty(loadBalancersInRegion)) {
      for (const gLb of loadBalancersInRegion) {
        connections.push({
          id: gLb.id,
          resourceType: services.loadBalancer,
          relation: 'child',
          field: 'gatewayLoadBalancers',
          insertAfterNodeInsertion: true,
        })
      }
    }
  }

  /**
   * Find gateway load balancers related to this load balancer
   */
  const virtualNetworks: {
    name: string
    data: { [property: string]: RawAzureVirtualNetwork[] }
  } = data.find(({ name }) => name === services.virtualNetwork)

  if (virtualNetworks?.data?.[region]) {
    const virtualNetworksInRegion: RawAzureVirtualNetwork[] =
      virtualNetworks.data[region].filter(
        ({ id: virtualNetworkId }: RawAzureVirtualNetwork) =>
          backendAPVirtualNetworksIds.includes(virtualNetworkId.toLowerCase())
      )

    if (!isEmpty(virtualNetworksInRegion)) {
      for (const bVn of virtualNetworksInRegion) {
        connections.push({
          id: bVn.id,
          resourceType: services.virtualNetwork,
          relation: 'child',
          field: 'loadBalancerBackendVirtualNetworks',
          insertAfterNodeInsertion: true,
        })
      }
    }
  }

  const netInterfaceResult = {
    [id]: connections,
  }
  return netInterfaceResult
}
