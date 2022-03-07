import cuid from 'cuid'
import { AzureArcConnectedCluster } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureArcConnectedCluster } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureArcConnectedCluster
  account: string
  region: string
}): AzureArcConnectedCluster => {
  const {
    id,
    name,
    type,
    Tags = {},
    resourceGroupId,
    identity: identityProp,
    provisioningState,
    kubernetesVersion,
    agentPublicKeyCertificate,
    totalNodeCount,
    totalCoreCount,
    agentVersion,
    distribution,
    infrastructure,
    offering,
    managedIdentityCertificateExpirationTime,
    lastConnectivityTime,
    connectivityStatus,
    systemData,
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
    identity,
    provisioningState,
    kubernetesVersion,
    agentPublicKeyCertificate,
    totalNodeCount,
    totalCoreCount,
    agentVersion,
    distribution,
    infrastructure,
    offering,
    managedIdentityCertificateExpirationTime:
      managedIdentityCertificateExpirationTime.toISOString() || '',
    lastConnectivityTime: lastConnectivityTime.toISOString() || '',
    connectivityStatus,
    ...(systemData
      ? {
          createdBy: systemData.createdBy,
          createdByType: systemData.createdByType,
          createdAt: systemData.createdAt.toISOString() || '',
          lastModifiedBy: systemData.lastModifiedBy,
          lastModifiedByType: systemData.lastModifiedByType,
          lastModifiedAt: systemData.lastModifiedAt.toISOString() || '',
        }
      : {}),
  }
}
