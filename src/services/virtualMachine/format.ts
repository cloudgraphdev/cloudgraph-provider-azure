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
    storageProfile: { imageReference } = {},
    licenseType,
    resourceGroupId,
    Tags,
  } = service
  const storageImageReference: AzureVirtualMachineStorageImageReference =
    imageReference || {}
  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    plan: { name: planName, publisher: planPublisher, product: planProduct },
    vmSize,
    vmId,
    priority,
    billingProfileMaxPrice: maxPrice,
    additionalCapabilities: { ultraSSDEnabled, hibernationEnabled },
    osProfile: {
      computerName,
      windowsConfiguration: {
        provisionVMAgent: wProvisionVMAgent,
        enableAutomaticUpdates,
        timeZone,
      },
      linuxConfiguration: {
        disablePasswordAuthentication,
        provisionVMAgent: lProvisionVMAgent,
      },
      allowExtensionOperations,
      requireGuestProvisionSignal,
    },
    storageImageReference,
    bootDiagnostics,
    licenseType,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
  }
}
