import cuid from 'cuid'
import { isEmpty } from 'lodash'
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
    resourceGroupId,
    provisioningState,
    overprovision,
    doNotRunExtensionsOnOverprovisionedVMs,
    singlePlacementGroup,
    platformFaultDomainCount,
    scaleInPolicy = { rules: [] },
    virtualMachineProfile = {},
    Tags,
  } = service

  const {
    osProfile,
    storageProfile,
    networkProfile,
    diagnosticsProfile,
    extensionProfile,
  } = virtualMachineProfile

  // Setting Diagnostics Profile
  let bootDiagnostics = {}
  if (!isEmpty(diagnosticsProfile?.bootDiagnostics)) {
    const { enabled } = diagnosticsProfile.bootDiagnostics
    bootDiagnostics = {
      enabled,
    }
  }

  // Setting Extension Profile
  let extensions = []
  if (!isEmpty(extensionProfile)) {
    const { extensions: extensionsList = [] } = extensionProfile
    extensions = extensionsList.map(({ settings, ...extension }) => ({
      id: cuid(),
      ...extension,
      settings: JSON.stringify(settings),
    }))
  }

  // Setting OS Profile
  let os = {}
  if (!isEmpty(osProfile)) {
    const {
      computerNamePrefix,
      adminUsername,
      linuxConfiguration = {},
      windowsConfiguration = {},
      secrets = [],
    } = osProfile
    os = {
      computerNamePrefix,
      adminUsername,
      linuxConfiguration,
      windowsConfiguration,
      secrets,
    }
  }

  // Setting Network Profile
  let network = {}
  if (!isEmpty(networkProfile)) {
    const { networkInterfaceConfigurations = [] } = networkProfile

    const networkInterfaces = networkInterfaceConfigurations.map(
      ({ ipConfigurations = [], ...networkInterface }) => {
        return {
          id: cuid(),
          ...networkInterface,
          ipConfigurations: ipConfigurations.map(
            ({ subnet, ...ipConfiguration }) => ({
              id: cuid(),
              ...ipConfiguration,
              subnetId: subnet?.id,
            })
          ),
        }
      }
    )

    network = { networkInterfaceConfigurations: networkInterfaces }
  }

  // Setting Storage Profile
  let storage = {}
  if (!isEmpty(storageProfile)) {
    const { imageReference = {}, osDisk = {} } = storageProfile
    storage = { imageReference, osDisk }
  }

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
    virtualMachineProfile: {
      diagnosticsProfile: { bootDiagnostics },
      extensionProfile: {
        extensions,
      },
      storageProfile: storage,
      networkProfile: network,
      osProfile: os,
    },
    uniqueId,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
  }
}
