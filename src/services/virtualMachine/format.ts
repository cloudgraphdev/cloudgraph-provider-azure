import {
  AzureVirtualMachine,
  AzureVirtualMachineStorageImageReference,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureVirtualMachine } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureVirtualMachine
  account: string
  region: string
}): AzureVirtualMachine => {
  const {
    id,
    name,
    type,
    plan: {
      name: planName,
      publisher: planPublisher,
      product: planProduct,
    } = {},
    additionalCapabilities: { ultraSSDEnabled, hibernationEnabled } = {},
    hardwareProfile: { vmSize } = {},
    priority,
    billingProfile: { maxPrice } = {},
    vmId,
    diagnosticsProfile: {
      bootDiagnostics: { enabled: bootDiagnostics = false } = {},
    } = {},
    osProfile: {
      computerName,
      windowsConfiguration: {
        provisionVMAgent: wProvisionVMAgent,
        enableAutomaticUpdates,
        timeZone,
      } = {},
      linuxConfiguration: {
        disablePasswordAuthentication,
        provisionVMAgent: lProvisionVMAgent,
      } = {},
      allowExtensionOperations,
      requireGuestProvisionSignal,
    } = {},
    storageProfile: { imageReference = {} } = {},
    licenseType,
    resourceGroupId,
    Tags,
  } = service
  const {
    linuxConfiguration: linuxConfig = {},
    windowsConfiguration: { patchSettings: wps, ...windowsConfiguration } = {},
    ...osProfile
  } = restOsProfile
  const storageImageReference: AzureVirtualMachineStorageImageReference =
    imageReference || {}
  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    osProfile: {
      linuxConfiguration: {
        disablePasswordAuthentication: linuxConfig?.disablePasswordAuthentication,
        provisionVMAgent: linuxConfig?.provisionVMAgent,
      },
      windowsConfiguration,
      ...osProfile,
    },
    storageImageReference,
    bootDiagnostics,
    licenseType,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
  }
}
