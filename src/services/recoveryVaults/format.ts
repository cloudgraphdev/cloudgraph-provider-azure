import { VaultProperties } from '@azure/arm-recoveryservices'
import cuid from 'cuid'
import { isEmpty } from 'lodash'
import {
  AzureRecoveryVault,
  AzureRecoveryVaultProperties,
} from '../../types/generated'
import { formatTagsFromMap, transformSystemData } from '../../utils/format'
import { RawAzureRecoveryVault } from './data'

const formatProperties = (
  vaultProperties?: VaultProperties
): AzureRecoveryVaultProperties => {
  if (isEmpty(vaultProperties)) {
    return {}
  }
  const {
    upgradeDetails = {},
    privateEndpointConnections = [],
    encryption = {},
    moveDetails = {},
    ...rest
  } = vaultProperties
  const {
    startTimeUtc,
    lastUpdatedTimeUtc,
    endTimeUtc,
    ...restUpgradeDetails
  } = upgradeDetails
  const { keyVaultProperties, kekIdentity, ...restEncryption } = encryption
  const {
    startTimeUtc: moveDetailsStartTimeUtc,
    completionTimeUtc: moveDetailsCompletionTimeUtc,
    ...restMoveDetails
  } = moveDetails
  return {
    upgradeDetails: {
      startTimeUtc: startTimeUtc?.toISOString(),
      lastUpdatedTimeUtc: lastUpdatedTimeUtc?.toISOString(),
      endTimeUtc: endTimeUtc?.toISOString(),
      ...restUpgradeDetails,
    },
    privateEndpointConnections:
      privateEndpointConnections?.map(
        ({ id: endpointId, properties, ...pe }) => ({
          id: endpointId || cuid(),
          properties: {
            provisioningState: properties?.provisioningState,
            privateEndpointId: properties?.privateEndpoint?.id,
            privateLinkServiceConnectionState:
              properties?.privateLinkServiceConnectionState || {},
          },
          ...pe,
        })
      ) || [],
    encryption: {
      keyUri: keyVaultProperties?.keyUri || '',
      kekIdentity: kekIdentity || {},
      ...restEncryption,
    },
    moveDetails: {
      startTimeUtc: moveDetailsStartTimeUtc?.toISOString(),
      completionTimeUtc: moveDetailsCompletionTimeUtc?.toISOString(),
      ...restMoveDetails,
    },
    ...rest,
  }
}

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureRecoveryVault
  account: string
}): AzureRecoveryVault => {
  const {
    id,
    name,
    type,
    region,
    identity,
    systemData,
    Tags,
    etag,
    properties,
    sku,
    resourceGroupId,
  } = service
  return {
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    etag,
    properties: formatProperties(properties),
    sku,
    identity: {
      ...identity,
      userAssignedIdentities: Object.keys(
        identity?.userAssignedIdentities ?? {}
      ).map(key => ({
        id: cuid(),
        key,
        value: identity?.userAssignedIdentities[key],
      })),
    },
    properties: {
      ...properties,
      moveDetails: {
        ...properties?.moveDetails,
        completionTimeUtc: properties?.moveDetails?.completionTimeUtc?.toISOString(),
        startTimeUtc: properties?.moveDetails?.startTimeUtc?.toISOString(),
      },
      upgradeDetails: {
        ...properties?.upgradeDetails,
        endTimeUtc: properties?.upgradeDetails?.endTimeUtc?.toISOString(),
        lastUpdatedTimeUtc: properties?.upgradeDetails?.lastUpdatedTimeUtc?.toISOString(),
        startTimeUtc: properties?.upgradeDetails?.startTimeUtc?.toISOString(),
      },
      privateEndpointConnections: properties?.privateEndpointConnections?.map(connection => ({
        id: connection?.id || cuid(),
        properties: { 
          provisioningState: connection.properties?.provisioningState, 
          privateEndpoint: connection.properties?.privateEndpoint,
          privateLinkServiceConnectionState: {
            status: connection.properties?.privateLinkServiceConnectionState?.status,
            description: connection.properties?.privateLinkServiceConnectionState?.description,
            actionsRequired: connection.properties?.privateLinkServiceConnectionState?.actionsRequired,
          }
        },
        name: connection.name,
        type: connection.type,
        location: connection.location
      })),
    },
    sku,
    createdBy: systemData?.createdBy,
    createdByType: systemData?.createdByType,
    createdAt: systemData?.createdAt?.toISOString(),
    lastModifiedBy: systemData?.lastModifiedBy,
    lastModifiedByType: systemData?.lastModifiedByType,
    lastModifiedAt: systemData?.lastModifiedAt?.toISOString(),
    tags: formatTagsFromMap(Tags),
  }
}
