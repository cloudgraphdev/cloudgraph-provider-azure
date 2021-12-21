import { AzureVirtualMachine } from '../../types/generated'
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
    storageProfile: { imageReference: storageImageReference = {} } = {},
    licenseType,
    resourceGroup,
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
    resourceGroup,
    tags: formatTagsFromMap(Tags),
  }
}
