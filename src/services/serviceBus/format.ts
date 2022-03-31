import cuid from 'cuid'
import { Encryption } from '@azure/arm-servicebus'
import { isEmpty } from 'lodash'
import {
  AzureServiceBus,
  AzureServiceBusEncryption,
} from '../../types/generated'
import { RawAzureSBNamespace } from './data'
import { formatTagsFromMap, transformSystemData } from '../../utils/format'

const formatEncryption = (
  encryption?: Encryption
): AzureServiceBusEncryption => {
  if (isEmpty(encryption)) {
    return {}
  }
  const { keyVaultProperties, ...rest } = encryption
  return {
    keyVaultProperties:
      keyVaultProperties?.map(kv => ({ id: cuid(), ...kv })) || [],
    ...rest,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureSBNamespace
  account: string
  region: string
}): AzureServiceBus => {
  const {
    id,
    name,
    type,
    resourceGroupId,
    Tags,
    sku,
    identity,
    provisioningState,
    status,
    createdAt,
    updatedAt,
    serviceBusEndpoint,
    metricId,
    zoneRedundant,
    encryption = {},
    privateEndpointConnections = [],
    disableLocalAuth,
  } = service

  return {
    id: id || cuid(),
    name,
    type,
    subscriptionId: account,
    resourceGroupId,
    region,
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
    provisioningState,
    status,
    createdAt: createdAt?.toISOString(),
    updatedAt: updatedAt?.toISOString(),
    serviceBusEndpoint,
    metricId,
    zoneRedundant,
    encryption: formatEncryption(encryption),
    privateEndpointConnections:
      privateEndpointConnections?.map(
        ({ id: endpointId, systemData, ...pe }) => ({
          id: endpointId || cuid(),
          ...transformSystemData(systemData),
          ...pe,
        })
      ) || [],
    disableLocalAuth,
    tags: formatTagsFromMap(Tags),
  }
}
