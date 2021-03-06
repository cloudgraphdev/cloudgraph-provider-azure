import cuid from 'cuid'
import { isEmpty } from 'lodash'
import { VaultProperties } from '@azure/arm-recoveryservices'
import { RawAzureVault } from './data'
import {
  AzureBackupVault,
  AzureBackupVaultVaultProperties,
} from '../../types/generated'
import { formatTagsFromMap, transformSystemData } from '../../utils/format'

const formatProperties = (
  vaultProperties?: VaultProperties
): AzureBackupVaultVaultProperties => {
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
  service: RawAzureVault
  account: string
}): AzureBackupVault => {
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
    ...transformSystemData(systemData),
    tags: formatTagsFromMap(Tags),
  }
}
