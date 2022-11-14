import { generateUniqueId } from '@cloudgraph/sdk'
import { RawAzureSynapseWorkspace } from './data'
import { AzureSynapseWorkspace } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureSynapseWorkspace
  account: string
}): AzureSynapseWorkspace => {
  const {
    id,
    name,
    type,
    region,
    identity,
    defaultDataLakeStorage,
    sqlAdministratorLoginPassword,
    managedResourceGroupName,
    provisioningState,
    sqlAdministratorLogin,
    virtualNetworkProfile,
    managedVirtualNetwork,
    privateEndpointConnections,
    encryption,
    workspaceUID,
    managedVirtualNetworkSettings,
    workspaceRepositoryConfiguration,
    purviewConfiguration,
    adlaResourceId,
    publicNetworkAccess,
    cspWorkspaceAdminProperties,
    azureADOnlyAuthentication,
    trustedServiceBypassEnabled,
    Tags,
  } = service

  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    identity: {
      ...identity,
      userAssignedIdentities: Object.entries(
        identity?.userAssignedIdentities || {}
      ).map(([key, value]) => ({
        id: generateUniqueId({
          id,
          key,
          value,
        }),
        key,
        value,
      })),
    },
    defaultDataLakeStorage,
    sqlAdministratorLoginPassword,
    managedResourceGroupName,
    provisioningState,
    sqlAdministratorLogin,
    virtualNetworkProfile,
    managedVirtualNetwork,
    privateEndpointConnections: privateEndpointConnections?.map(connection => ({
      ...connection,
      id: connection.id,
    })),
    encryption,
    workspaceUID,
    managedVirtualNetworkSettings,
    workspaceRepositoryConfiguration,
    purviewConfiguration,
    adlaResourceId,
    publicNetworkAccess,
    cspWorkspaceAdminProperties,
    azureADOnlyAuthentication,
    trustedServiceBypassEnabled,
    tags: formatTagsFromMap(Tags),
  }
}
