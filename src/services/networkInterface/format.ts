import cuid from 'cuid'
import {
  AzureNetworkInterface,
  AzureNetworkInterfaceIpConfiguration,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureNetworkInterface } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureNetworkInterface
  account: string
  region: string
}): AzureNetworkInterface => {
  const {
    id,
    enableAcceleratedNetworking,
    virtualMachine: { id: virtualMachineId = '' } = {},
    enableIPForwarding: enableIpForwarding,
    macAddress,
    ipConfigurations = [],
    dnsSettings: {
      appliedDnsServers = [],
      dnsServers = [],
      internalDnsNameLabel = '',
      internalDomainNameSuffix = '',
    } = {},
    resourceGroupId,
    Tags,
  } = service
  let ipConfiguration: AzureNetworkInterfaceIpConfiguration = {}
  let privateIpAddress = ''
  if (ipConfigurations.length > 0) {
    const {
      etag,
      gatewayLoadBalancer,
      id: ipConfigId,
      name,
      primary,
      privateIPAddress,
      privateIPAddressVersion,
      privateIPAllocationMethod,
      privateLinkConnectionProperties,
      provisioningState,
      subnet: { id: subnetId },
      type,
    } = ipConfigurations[0]
    ipConfiguration =
      ({
        etag,
        gatewayLoadBalancer,
        id: ipConfigId,
        name,
        primary,
        privateIPAddress,
        privateIPAddressVersion,
        privateIPAllocationMethod,
        privateLinkConnectionProperties,
        provisioningState,
        subnetId,
        type,
      } as AzureNetworkInterfaceIpConfiguration) || {}
    privateIpAddress = ipConfigurations[0].privateIPAddress
  }
  return {
    id: id || cuid(),
    subscriptionId: account,
    region,
    resourceGroupId,
    macAddress,
    privateIpAddress,
    internalDnsNameLabel,
    enableIpForwarding,
    virtualMachineId,
    enableAcceleratedNetworking,
    internalDomainNameSuffix,
    ipConfiguration,
    appliedDnsServers,
    dnsServers,
    tags: formatTagsFromMap(Tags),
  }
}
