import cuid from 'cuid'
import { AzureRedisCache } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureRedisCache } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzureRedisCache
  account: string
  region: string
}): AzureRedisCache => {
  const {
    id,
    name,
    zones,
    identity,
    redisConfiguration,
    redisVersion,
    enableNonSslPort,
    replicasPerMaster,
    replicasPerPrimary,
    tenantSettings,
    shardCount,
    minimumTlsVersion,
    publicNetworkAccess,
    sku,
    subnetId,
    staticIP,
    provisioningState,
    hostName,
    port,
    sslPort,
    accessKeys,
    linkedServers,
    instances,
    privateEndpointConnections,
    resourceGroupId,
    Tags,
  } = service

  return {
    id,
    name,
    region,
    resourceGroupId,
    subscriptionId,
    zones,
    identity: {
      ...identity,
      userAssignedIdentities: Object.keys(identity?.userAssignedIdentities || {}).map(key => ({
        id: cuid(),
        key,
        value: identity?.userAssignedIdentities[key],
      })),
    },
    redisConfiguration,
    redisVersion,
    enableNonSslPort,
    replicasPerMaster,
    replicasPerPrimary,
    tenantSettings: Object.keys(tenantSettings || {}).map(key => ({
      id: cuid(),
      key,
      value: tenantSettings[key],
    })),
    shardCount,
    minimumTlsVersion,
    publicNetworkAccess,
    sku,
    subnetId,
    staticIP,
    provisioningState,
    hostName,
    port,
    sslPort,
    accessKeys,
    linkedServers: linkedServers?.map(server => ({
      id: server?.id,
    })),
    instances: instances?.map(instance => ({
      id: cuid(),
      ...instance,
    })),
    privateEndpointConnections: privateEndpointConnections?.map(connection => ({
      id: cuid(),
      ...connection,
    })),
    tags: formatTagsFromMap(Tags),
  }
}
