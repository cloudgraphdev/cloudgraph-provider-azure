import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { RawAzureNetworkInterface } from './data'
import { RawAzureNetworkSecurityGroup } from '../securityGroup/data'
import { RawAzurePublicIpAddress } from '../publicIp/data'
import { caseInsensitiveEqual } from '../../utils'
import { caseInsensitiveIncludes } from '../../utils/index'
import { RawAzureResourceGroup } from '../resourceGroup/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureNetworkInterface
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    ipConfigurations = [],
    networkSecurityGroup: { id: netSGId } = {},
    resourceGroup: rgName
  } = service
  const subnetsIds = []
  const publicIpAddressesIds = []
  ipConfigurations.length > 0 &&
    ipConfigurations.forEach(i => {
      const { subnet, publicIPAddress } = i
      subnet && subnetsIds.push(subnet.id)
      publicIPAddress && publicIpAddressesIds.push(publicIPAddress.id)
    })
  /**
   * Find resource group related to this network interface
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
   * Find security group related to this network interface
   */
  if (netSGId) {
    const securityGroups: {
      name: string
      data: { [property: string]: RawAzureNetworkSecurityGroup[] }
    } = data.find(({ name }) => name === services.securityGroup)

    if (securityGroups?.data?.[region]) {
      const securityGroupsInRegion: RawAzureNetworkSecurityGroup[] =
        securityGroups.data[region].filter(
          ({
            id: sgId,
            networkInterfaces = [],
          }: RawAzureNetworkSecurityGroup) =>
            caseInsensitiveEqual(sgId, netSGId) ||
            caseInsensitiveIncludes(
              networkInterfaces.map(({ id: netId }) => netId),
              id
            )
        )

      if (!isEmpty(securityGroupsInRegion)) {
        for (const sg of securityGroupsInRegion) {
          connections.push({
            id: sg.id,
            resourceType: services.securityGroup,
            relation: 'child',
            field: 'securityGroups',
          })
        }
      }
    }
  }
  /**
   * Find public ips related to this network interface
   */
  if (publicIpAddressesIds.length > 0) {
    const publicIps: {
      name: string
      data: { [property: string]: RawAzurePublicIpAddress[] }
    } = data.find(({ name }) => name === services.publicIp)

    if (publicIps?.data?.[region]) {
      const publicIpsInRegion: RawAzurePublicIpAddress[] = publicIps.data[
        region
      ].filter(({ id: publicIpId }: RawAzurePublicIpAddress) =>
        caseInsensitiveIncludes(publicIpAddressesIds, publicIpId)
      )

      if (!isEmpty(publicIpsInRegion)) {
        for (const sg of publicIpsInRegion) {
          connections.push({
            id: sg.id,
            resourceType: services.publicIp,
            relation: 'child',
            field: 'publicIps',
          })
        }
      }
    }
  }

  const netInterfaceResult = {
    [id]: connections,
  }
  return netInterfaceResult
}
