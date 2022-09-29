import cuid from 'cuid'
import { isEmpty } from 'lodash'
import {
  VirtualMachineScaleSetOSProfile,
  VirtualMachineScaleSetStorageProfile,
  VirtualMachineScaleSetNetworkProfile,
  VirtualMachineScaleSetExtensionProfile,
} from '@azure/arm-compute'
import {
  AzureVmScaleSet,
  AzureVmScaleSetOsProfile,
  AzureVmScaleSetStorageProfile,
  AzureVmScaleSetNetworkProfile,
  AzureVmScaleSetExtension,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureVirtualMachineScaleSet } from './data'

const formatOsProfile = (
  osProfile?: VirtualMachineScaleSetOSProfile
): AzureVmScaleSetOsProfile => {
  if (isEmpty(osProfile)) {
    return {}
  }

  const {
    computerNamePrefix,
    adminUsername,
    allowExtensionOperations,
    windowsConfiguration,
    linuxConfiguration,
    secrets,
  } = osProfile

  return {
    computerNamePrefix,
    adminUsername,
    allowExtensionOperations,
    windowsConfiguration: windowsConfiguration
      ? {
          additionalUnattendContent:
            windowsConfiguration.additionalUnattendContent?.map(auc => ({
              id: cuid(),
              ...auc,
            })) || [],
          winRM: windowsConfiguration.winRM
            ? {
                listeners:
                  windowsConfiguration.winRM.listeners?.map(l => ({
                    id: cuid(),
                    ...l,
                  })) || [],
              }
            : {},
          ...windowsConfiguration,
        }
      : {},
    linuxConfiguration: linuxConfiguration
      ? {
          ssh: linuxConfiguration.ssh
            ? {
                publicKeys:
                  linuxConfiguration.ssh.publicKeys?.map(pk => ({
                    id: cuid(),
                    ...pk,
                  })) || [],
              }
            : {},
        }
      : {},
    secrets:
      secrets?.map(s => ({
        id: cuid(),
        sourceVault: {
          id: s.sourceVault?.id || cuid(),
        },
        vaultCertificates:
          s.vaultCertificates?.map(vc => ({
            id: cuid(),
            ...vc,
          })) || [],
      })) || [],
  }
}

const formatStorageProfile = (
  storageProfile?: VirtualMachineScaleSetStorageProfile
): AzureVmScaleSetStorageProfile => {
  if (isEmpty(storageProfile)) {
    return {}
  }

  const { imageReference, osDisk } = storageProfile

  return {
    imageReference: imageReference
      ? {
          id: imageReference.id || cuid(),
          publisher: imageReference.publisher,
          offer: imageReference.offer,
          sku: imageReference.sku,
          version: imageReference.version,
        }
      : {},
    osDisk: osDisk
      ? {
          caching: osDisk.caching,
          createOption: osDisk.createOption,
          osType: osDisk.osType,
          diskSizeGB: osDisk.diskSizeGB,
          writeAcceleratorEnabled: osDisk.writeAcceleratorEnabled,
          managedDisk: osDisk.managedDisk
            ? {
                storageAccountType: osDisk.managedDisk.storageAccountType,
              }
            : {},
        }
      : {},
  }
}

const formatNetworkProfile = (
  networkProfile?: VirtualMachineScaleSetNetworkProfile
): AzureVmScaleSetNetworkProfile => {
  if (isEmpty(networkProfile)) {
    return {}
  }

  const { networkInterfaceConfigurations = [] } = networkProfile

  return {
    networkInterfaceConfigurations:
      networkInterfaceConfigurations?.map(
        ({
          id,
          ipConfigurations = [],
          networkSecurityGroup,
          ...networkInterface
        }) => {
          return {
            id: id || cuid(),
            ...networkInterface,
            networkSecurityGroup: {
              id: networkSecurityGroup?.id || cuid(),
            },
            ipConfigurations:
              ipConfigurations?.map(
                ({
                  subnet,
                  publicIPAddressConfiguration,
                  applicationGatewayBackendAddressPools,
                  applicationSecurityGroups,
                  loadBalancerBackendAddressPools,
                  loadBalancerInboundNatPools,
                  ...ipConfiguration
                }) => ({
                  id: cuid(),
                  ...ipConfiguration,
                  subnetId: subnet?.id,
                  appGatewayAddressPools:
                    applicationGatewayBackendAddressPools?.map(agb => ({
                      id: agb.id || cuid(),
                      ...agb,
                    })) || [],
                  applicationSecurityGroups:
                    applicationSecurityGroups?.map(asg => ({
                      id: asg.id || cuid(),
                      ...asg,
                    })) || [],
                  loadBalancerAddressPools:
                    loadBalancerBackendAddressPools?.map(lbb => ({
                      id: lbb.id || cuid(),
                      ...lbb,
                    })) || [],
                  loadBalancerInboundNatPools:
                    loadBalancerInboundNatPools?.map(lbi => ({
                      id: lbi.id || cuid(),
                      ...lbi,
                    })) || [],
                })
              ) || [],
          }
        }
      ) || [],
  }
}

const formatExtensionProfile = (
  extensionProfile?: VirtualMachineScaleSetExtensionProfile
): AzureVmScaleSetExtension[] => {
  if (isEmpty(extensionProfile)) {
    return []
  }

  const { extensions: extensionsList = [] } = extensionProfile

  return (
    extensionsList?.map(e => ({
      id: e.id || cuid(),
      name: e.name,
      forceUpdateTag: e.forceUpdateTag,
      type: e.type,
      typeHandlerVersion: e.typeHandlerVersion,
      typePropertiesType: e.typePropertiesType,
      publisher: e.publisher,
      provisioningState: e.provisioningState,
      provisionAfterExtensions: e.provisionAfterExtensions,
      autoUpgradeMinorVersion: e.autoUpgradeMinorVersion,
      enableAutomaticUpgrade: e.enableAutomaticUpgrade,
      settings: e.settings ? JSON.stringify(e.settings) : '',
    })) || []
  )
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureVirtualMachineScaleSet
  account: string
  region: string
}): AzureVmScaleSet => {
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
  let extensions: AzureVmScaleSetExtension[] = []
  if (!isEmpty(extensionProfile)) {
    extensions = formatExtensionProfile(extensionProfile)
  }

  // Setting OS Profile
  let os = {}
  if (!isEmpty(osProfile)) {
    os = formatOsProfile(osProfile)
  }

  // Setting Network Profile
  let network = {}
  if (!isEmpty(networkProfile)) {
    network = formatNetworkProfile(networkProfile)
  }

  // Setting Storage Profile
  let storage = {}
  if (!isEmpty(storageProfile)) {
    storage = formatStorageProfile(storageProfile)
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
