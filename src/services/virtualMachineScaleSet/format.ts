import cuid from 'cuid'
import { AzureVirtualMachineScaleSet } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureVirtualMachineScaleSet } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureVirtualMachineScaleSet
  account: string
  region: string
}): AzureVirtualMachineScaleSet => {
  const {
    id,
    name,
    uniqueId,
    provisioningState,
    overprovision,
    doNotRunExtensionsOnOverprovisionedVMs,
    singlePlacementGroup,
    platformFaultDomainCount,
    scaleInPolicy,
    virtualMachineProfile,
    resourceGroup,
    Tags,
  } = service

  return {
    // If the id is not present use uniqueId
    // uniqueId is an additional unique Guid that identifies the resource
    // if uniqueId doesn't exist, then create a random uid to ensure id consistency for connections
    id: id || uniqueId || cuid(),
    name,
    region,
    subscriptionId: account,
    provisioningState,
    overprovision,
    doNotRunExtensionsOnOverprovisionedVMs,
    singlePlacementGroup,
    platformFaultDomainCount,
    scaleInPolicy,
    virtualMachineProfile,
    uniqueId,
    resourceGroup,
    tags: formatTagsFromMap(Tags),
  }
}
