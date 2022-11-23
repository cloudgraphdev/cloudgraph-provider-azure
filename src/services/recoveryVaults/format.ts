import { VaultProperties } from '@azure/arm-recoveryservices'
import { generateUniqueId } from '@cloudgraph/sdk'
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
          id: endpointId,
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
    id,
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
        id: generateUniqueId({

        }),
        key,
        value: identity?.userAssignedIdentities[key],
      })),
    },
    ...transformSystemData(systemData),
    tags: formatTagsFromMap(Tags),
  }
}
