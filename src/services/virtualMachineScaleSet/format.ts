import { generateUniqueId } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import {
  VirtualMachineScaleSetOSProfile,
  VirtualMachineScaleSetStorageProfile,
  VirtualMachineScaleSetNetworkProfile,
  VirtualMachineScaleSetExtensionProfile,
} from '@azure/arm-compute'
import {
  AzureVirtualMachineScaleSet,
  AzureVirtualMachineScaleSetOsProfile,
  AzureVirtualMachineScaleSetStorageProfile,
  AzureVirtualMachineScaleSetNetworkProfile,
  AzureVirtualMachineScaleSetExtension,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureVirtualMachineScaleSet } from './data'

const formatOsProfile = (
  osProfile?: VirtualMachineScaleSetOSProfile
): AzureVirtualMachineScaleSetOsProfile => {
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
              id: generateUniqueId({ auc }),
              ...auc,
            })) || [],
          winRM: windowsConfiguration.winRM
            ? {
                listeners:
                  windowsConfiguration.winRM.listeners?.map(l => ({
                    id: generateUniqueId({
                      ...l,
                    }),
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
                    id: generateUniqueId({
                      ...pk,
                    }),
                    ...pk,
                  })) || [],
              }
            : {},
        }
      : {},
    secrets:
      secrets?.map(s => ({
        id: generateUniqueId({ ...s }),
        sourceVault: {
          id: s.sourceVault?.id,
        },
        vaultCertificates:
          s.vaultCertificates?.map(vc => ({
            id: generateUniqueId({
              ...vc,
            }),
            ...vc,
          })) || [],
      })) || [],
  }
}

const formatStorageProfile = (
  storageProfile?: VirtualMachineScaleSetStorageProfile
): AzureVirtualMachineScaleSetStorageProfile => {
  if (isEmpty(storageProfile)) {
    return {}
  }

  const { imageReference, osDisk } = storageProfile

  return {
    imageReference: imageReference
      ? {
          id: imageReference.id,
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
): AzureVirtualMachineScaleSetNetworkProfile => {
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
            id,
            ...networkInterface,
            networkSecurityGroup: {
              id: networkSecurityGroup?.id,
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
                  id: ipConfiguration.id,
                  ...ipConfiguration,
                  subnetId: subnet?.id,
                  applicationGatewayBackendAddressPools:
                    applicationGatewayBackendAddressPools?.map(agb => ({
                      id: agb.id,
                      ...agb,
                    })) || [],
                  applicationSecurityGroups:
                    applicationSecurityGroups?.map(asg => ({
                      id: asg.id,
                      ...asg,
                    })) || [],
                  loadBalancerBackendAddressPools:
                    loadBalancerBackendAddressPools?.map(lbb => ({
                      id: lbb.id,
                      ...lbb,
                    })) || [],
                  loadBalancerInboundNatPools:
                    loadBalancerInboundNatPools?.map(lbi => ({
                      id: lbi.id,
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
): AzureVirtualMachineScaleSetExtension[] => {
  if (isEmpty(extensionProfile)) {
    return []
  }

  const { extensions: extensionsList = [] } = extensionProfile

  return (
    extensionsList?.map(e => ({
      id: e.id,
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
  let extensions: AzureVirtualMachineScaleSetExtension[] = []
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
    id: id || uniqueId,
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
