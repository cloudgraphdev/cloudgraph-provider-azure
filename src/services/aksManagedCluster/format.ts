import {
  ContainerServiceNetworkProfile,
  ManagedClusterAADProfile,
  ManagedClusterAgentPoolProfile,
} from '@azure/arm-containerservice'
import cuid from 'cuid'
import {
  AzureAksManagedCluster,
  AzureAksManagedClusterAadProfile,
  AzureAksManagedClusterAgentPoolProfile,
  AzureAksManagedClusterNetworkProfile,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureAksManagedCluster } from './data'

const formatAgentPoolProfiles = (
  arr: ManagedClusterAgentPoolProfile[]
): AzureAksManagedClusterAgentPoolProfile[] => {
  return arr.map(
    ({
      creationData,
      gpuInstanceProfile,
      powerState: { code: powerStateCode },
      upgradeSettings: { maxSurge: upgradeMaxSurge } = {},
      nodeLabels,
      tags,
      ...rest
    }) => ({
      id: cuid(),
      powerStateCode,
      upgradeMaxSurge,
      ...rest,
    })
  )
}

const formatNetworkProfile = ({
  loadBalancerProfile,
  natGatewayProfile,
  ...rest
}: ContainerServiceNetworkProfile): AzureAksManagedClusterNetworkProfile => rest

interface ExtendedAadProfile extends ManagedClusterAADProfile{
  adminUsers?: any
}

const formatAadProfile = ({
  serverAppSecret,
  adminUsers,
  ...rest
}: ExtendedAadProfile): AzureAksManagedClusterAadProfile => rest

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureAksManagedCluster
  account: string
  region: string
}): AzureAksManagedCluster => {
  const {
    id,
    name,
    type,
    Tags = {},
    resourceGroupId,
    sku: { name: skuName, tier: skuTier } = {},
    identity: identityProp,
    provisioningState,
    powerState: { code: powerStateCode } = {},
    maxAgentPools,
    kubernetesVersion,
    dnsPrefix,
    fqdnSubdomain,
    fqdn,
    privateFqdn,
    azurePortalFqdn,
    agentPoolProfiles = [],
    servicePrincipalProfile: { clientId: servicePrincipalProfileClientId } = {},
    podIdentityProfile: {
      enabled: podIdentityProfileEnabled,
      allowNetworkPluginKubenet: podIdentityProfileAllowNetworkPluginKubenet,
    } = {},
    nodeResourceGroup,
    enableRbac,
    networkProfile = {},
    aadProfile = {},
    autoUpgradeProfile: { upgradeChannel: autoUpgradeChannel } = {},
    autoScalerProfile = {},
    apiServerAccessProfile,
    diskEncryptionSetID,
    disableLocalAccounts,
    httpProxyConfig: { trustedCa, ...restOfhttpProxyConfig } = {},
    securityProfile: {
      azureDefender: { enabled: azureDefenderEnabled = false } = {},
    } = {},
    publicNetworkAccess,
  } = service

  const identity =
    (identityProp && {
      principalId: identityProp.principalId,
      tenantId: identityProp.tenantId,
      type: identityProp.type,
    }) ||
    {}

  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
    aadProfile: formatAadProfile(aadProfile),
    agentPoolProfiles: formatAgentPoolProfiles(agentPoolProfiles),
    apiServerAccessProfile,
    autoScalerProfile,
    autoUpgradeChannel,
    azureDefenderEnabled,
    azurePortalFqdn,
    disableLocalAccounts,
    diskEncryptionSetID,
    dnsPrefix,
    enableRbac,
    fqdn,
    fqdnSubdomain,
    httpProxyConfig: restOfhttpProxyConfig,
    identity,
    kubernetesVersion,
    maxAgentPools,
    networkProfile: formatNetworkProfile(networkProfile),
    nodeResourceGroup,
    podIdentityProfileAllowNetworkPluginKubenet,
    podIdentityProfileEnabled,
    powerStateCode,
    privateFqdn,
    provisioningState,
    publicNetworkAccess,
    servicePrincipalProfileClientId,
    skuName,
    skuTier,
  }
}
