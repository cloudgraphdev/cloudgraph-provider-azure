import { formatTagsFromMap } from '../../utils/format'
import { RawAzureMySqlServer } from './data'
import { AzureMySqlServer } from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureMySqlServer
  account: string
  region: string
}): AzureMySqlServer => {
  const {
    id,
    name,
    type,
    identity,
    administratorLogin,
    version,
    sslEnforcement,
    minimalTlsVersion,
    byokEnforcement,
    infrastructureEncryption,
    userVisibleState,
    fullyQualifiedDomainName,
    earliestRestoreDate,
    storageProfile,
    replicationRole,
    masterServerId,
    replicaCapacity,
    publicNetworkAccess,
    privateEndpointConnections,
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
    identity,
    administratorLogin,
    version,
    sslEnforcement,
    minimalTlsVersion,
    byokEnforcement,
    infrastructureEncryption,
    userVisibleState,
    fullyQualifiedDomainName,
    earliestRestoreDate: earliestRestoreDate?.toISOString(),
    storageProfile,
    replicationRole,
    masterServerId,
    replicaCapacity,
    publicNetworkAccess,
    privateEndpointConnections: privateEndpointConnections?.map(connection => ({
      ...connection,
      id: connection.id,
    })), 
    tags: formatTagsFromMap(Tags),
  }
}