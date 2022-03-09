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
    diagnosticsProfile: {
      bootDiagnostics: { enabled: bootDiagnostics = false } = {},
    } = {},
    osProfile: { adminUsername, adminPassword, secrets, ...restOsProfile } = {},
    storageProfile: { imageReference } = {},
    licenseType,
    resourceGroupId,
    Tags,
  } = service
  const {
    linuxConfiguration: {
      patchSettings: lps,
      ssh: lssh,
      ...linuxConfiguration
    } = {},
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
    osProfile: { linuxConfiguration, windowsConfiguration, ...osProfile },
    storageImageReference,
    bootDiagnostics,
    licenseType,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
  }
}
