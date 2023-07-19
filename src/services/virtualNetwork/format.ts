import { AzureVirtualNetwork } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureVirtualNetwork } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzureVirtualNetwork
  account: string
  region: string
}): AzureVirtualNetwork => {
  const {
    id,
    name,
    type,
    addressSpacePrefixes,
    dnsServers,
    ddosProtectionPlans,
    flowTimeoutInMinutes,
    provisioningState,
    resourceGuid,
    enableDdosProtection,
    enableVmProtection,
    resourceGroupId,
    Tags,
    subnets = []
  } = service
  const subnetsIds = []
  const serviceEndpointPoliciesIds = []

  subnets.forEach(s => {
    const { id, serviceEndpointPolicies = [] } = s
    subnetsIds.push(id)
    serviceEndpointPoliciesIds.push(...serviceEndpointPolicies.map(p => p.id))
  })

  return {
    id,
    name,
    type,
    subscriptionId,
    region,
    addressSpacePrefixes,
    dnsServers,
    ddosProtectionPlans: ddosProtectionPlans.map(
      ({
        id: ddId,
        name: ddName,
        type: ddType,
        resourceGuid: ddResourceGuid,
        etag,
      }) => ({
        id: ddId,
        name: ddName,
        type: ddType,
        resourceGuid: ddResourceGuid,
        etag,
      })
    ),
    enableDdosProtection,
    enableVmProtection,
    flowTimeoutInMinutes,
    provisioningState,
    resourceGuid,
    resourceGroupId,
    subnetsIds,
    serviceEndpointPoliciesIds,
    tags: formatTagsFromMap(Tags),
  }
}
