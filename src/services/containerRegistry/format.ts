import cuid from 'cuid'
import { formatTagsFromMap, transformSystemData } from '../../utils/format'
import { RawAzureContainerRegistry } from './data'
import { AzureContainerRegistry } from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureContainerRegistry
  account: string
  region: string
}): AzureContainerRegistry => {
  const {
    id,
    name,
    type,
    Tags,
    sku = {},
    identity: { userAssignedIdentities, ...restOfIdentity } = {},
    loginServer,
    creationDate,
    provisioningState,
    status: { timestamp: statusTimestamp, ...restOfStatus } = {},
    adminUserEnabled,
    networkRuleSet = {},
    policies: {
      quarantinePolicy,
      trustPolicy,
      retentionPolicy: {
        lastUpdatedTime: retentionPolicyLastUpdatedTime,
        ...restOfRetentionPolicy
      } = {},
      exportPolicy,
    } = {},
    encryption: {
      status: encryptionStatus,
      keyVaultProperties: {
        lastKeyRotationTimestamp,
        ...restOfKeyVaultProperties
      } = {},
    } = {},
    dataEndpointEnabled,
    dataEndpointHostNames = [],
    privateEndpointConnections = [],
    publicNetworkAccess,
    networkRuleBypassOptions,
    zoneRedundancy,
  } = service
  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    sku,
    identity: restOfIdentity,
    loginServer,
    creationDate: creationDate?.toISOString(),
    provisioningState,
    status: {
      timestamp: statusTimestamp?.toISOString(),
      ...restOfStatus,
    },
    adminUserEnabled,
    networkRuleSet,
    policies: {
      quarantinePolicy,
      trustPolicy,
      retentionPolicy: {
        lastUpdatedTime: retentionPolicyLastUpdatedTime?.toISOString(),
        ...restOfRetentionPolicy,
      },
      exportPolicy,
    },
    encryption: {
      status: encryptionStatus,
      keyVaultProperties: {
        lastKeyRotationTimestamp: lastKeyRotationTimestamp?.toISOString(),
        ...restOfKeyVaultProperties,
      },
    },
    dataEndpointEnabled,
    dataEndpointHostNames,
    privateEndpointConnections:
      privateEndpointConnections.map(
        ({
          id: privateEndpointId,
          privateLinkServiceConnectionState,
          privateEndpoint,
          systemData,
          name: peName,
          type: peType,
          provisioningState: peProvisioningState,
        }) => ({
          id: privateEndpointId || cuid(),
          name: peName,
          type: peType,
          provisioningState: peProvisioningState,
          privateLinkServiceConnectionStateStatus:
            privateLinkServiceConnectionState?.status,
          privateLinkServiceConnectionStateActionsRequired:
            privateLinkServiceConnectionState?.actionsRequired,
          privateLinkServiceConnectionStateDescription:
            privateLinkServiceConnectionState?.description,
          privateEndpoint: {
            id: privateEndpoint.id || cuid(),
          },
          ...transformSystemData(systemData),
        })
      ) || [],
    publicNetworkAccess,
    networkRuleBypassOptions,
    zoneRedundancy,
    tags: formatTagsFromMap(Tags),
  }
}
