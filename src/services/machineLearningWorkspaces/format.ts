import { generateUniqueId } from '@cloudgraph/sdk'
import { formatTagsFromMap, transformSystemData } from '../../utils/format'
import { RawAzureMachineLearningWorkspace } from './data'
import { AzureMachineLearningWorkspace } from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureMachineLearningWorkspace
  account: string
  region: string
}): AzureMachineLearningWorkspace => {
  const {
    id,
    name,
    type,
    sku,
    systemData,
    workspaceId,
    description,
    friendlyName,
    keyVault,
    applicationInsights,
    containerRegistry,
    storageAccount,
    discoveryUrl,
    provisioningState,
    encryption,
    hbiWorkspace,
    serviceProvisionedResourceGroup,
    privateLinkCount,
    imageBuildCompute,
    allowPublicAccessWhenBehindVnet,
    publicNetworkAccess,
    privateEndpointConnections,
    sharedPrivateLinkResources,
    notebookInfo,
    serviceManagedResourcesSettings,
    primaryUserAssignedIdentity,
    tenantId,
    storageHnsEnabled,
    mlFlowTrackingUri,
    resourceGroupId,
    Tags,
  } = service

  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    resourceGroupId,
    sku,
    ...transformSystemData(systemData),
    workspaceId,
    description,
    friendlyName,
    keyVault,
    applicationInsights,
    containerRegistry,
    storageAccount,
    discoveryUrl,
    provisioningState,
    encryption,
    hbiWorkspace,
    serviceProvisionedResourceGroup,
    privateLinkCount,
    imageBuildCompute,
    allowPublicAccessWhenBehindVnet,
    publicNetworkAccess,
    privateEndpointConnections: privateEndpointConnections?.map(connection => ({
      id: connection?.id,
      ...connection,
      ...transformSystemData(connection?.systemData),
    })),
    sharedPrivateLinkResources: sharedPrivateLinkResources?.map(resource => ({
      id: generateUniqueId({
        ...resource
      }),
      ...resource,
    })),
    notebookInfo: {
      fqdn: notebookInfo?.fqdn,
      resourceId: notebookInfo?.resourceId,
      notebookPreparationError: notebookInfo?.notebookPreparationError,
    },
    serviceManagedResourcesSettings,
    primaryUserAssignedIdentity,
    tenantId,
    storageHnsEnabled,
    mlFlowTrackingUri,
    tags: formatTagsFromMap(Tags),
  }
}