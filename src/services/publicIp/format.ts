import { AzurePublicIp } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzurePublicIpAddress } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzurePublicIpAddress
  account: string
  region: string
}): AzurePublicIp => {
  const {
    id,
    name,
    sku: { tier = '' } = {},
    dnsSettings,
    ipTags,
    ipAddress,
    idleTimeoutInMinutes,
    publicIPAllocationMethod: allocationMethod,
    publicIPAddressVersion: ipVersion,
    resourceGuid,
    zones = [],
    resourceGroupId,
    Tags,
  } = service
  return {
    id,
    name,
    region,
    resourceGroupId,
    subscriptionId,
    tier,
    allocationMethod,
    ipVersion,
    dnsSettings,
    ipTags,
    ipAddress,
    idleTimeoutInMinutes,
    resourceGuid,
    zones,
    tags: formatTagsFromMap(Tags),
  }
}
