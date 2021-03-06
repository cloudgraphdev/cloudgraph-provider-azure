import cuid from 'cuid'
import { BackupPolicyUnion, RestoreParameters } from '@azure/arm-cosmosdb'
import { isEmpty } from 'lodash'
import { AzureCosmosDb, AzureCosmosDbBackupPolicy, AzureCosmosDbRestoreParameters } from '../../types/generated'
import { formatTagsFromMap, transformSystemData } from '../../utils/format'
import { RawAzureCosmosDbAccount } from './utils'

const formatBackupPolicy = (
  policy?: BackupPolicyUnion
): AzureCosmosDbBackupPolicy => {
  if (isEmpty(policy)) {
    return {}
  }
  const { migrationState, ...rest } = policy
  return {
    migrationState: {
      status: migrationState?.status,
      targetType: migrationState?.targetType,
      startTime: migrationState?.startTime?.toISOString(),
    },
    ...rest,
  }
}

const formatRestoreParameters = (
  restoreParameters?: RestoreParameters
): AzureCosmosDbRestoreParameters => {
  if (isEmpty(restoreParameters)) {
    return {}
  }
  const { restoreTimestampInUtc, databasesToRestore, ...rest } = restoreParameters
  return {
    restoreTimestampInUtc: restoreTimestampInUtc?.toISOString(),
    databasesToRestore: databasesToRestore?.map(db => ({ id: cuid(), ...db })) || [],
    ...rest,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureCosmosDbAccount
  account: string
  region: string
}): AzureCosmosDb => {
  const {
    id,
    name,
    type,
    resourceGroupId,
    kind,
    identity,
    systemData,
    provisioningState,
    documentEndpoint,
    databaseAccountOfferType,
    ipRules = [],
    isVirtualNetworkFilterEnabled,
    enableAutomaticFailover,
    consistencyPolicy,
    capabilities = [],
    writeLocations = [],
    readLocations = [],
    locations = [],
    failoverPolicies = [],
    virtualNetworkRules = [],
    privateEndpointConnections = [],
    enableMultipleWriteLocations,
    enableCassandraConnector,
    connectorOffer,
    disableKeyBasedMetadataWriteAccess,
    keyVaultKeyUri,
    defaultIdentity,
    publicNetworkAccess,
    enableFreeTier,
    apiProperties,
    enableAnalyticalStorage,
    analyticalStorageConfiguration,
    instanceId,
    createMode,
    restoreParameters,
    backupPolicy,
    cors = [],
    networkAclBypass,
    networkAclBypassResourceIds = [],
    disableLocalAuth,
    capacity,
    Tags,
    databases = [],
    tables = [],
  } = service

  return {
    id: id || cuid(),
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    kind,
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
    provisioningState,
    documentEndpoint,
    databaseAccountOfferType,
    ipRules: ipRules?.map(r => ({ id: cuid(), ...r })) || [],
    isVirtualNetworkFilterEnabled,
    enableAutomaticFailover,
    consistencyPolicy,
    capabilities: capabilities?.map(c => ({ id: cuid(), ...c })) || [],
    writeLocations:
      writeLocations?.map(wl => ({ id: id || cuid(), ...wl })) || [],
    readLocations:
      readLocations?.map(rl => ({ id: id || cuid(), ...rl })) || [],
    locations: locations?.map(l => ({ id: id || cuid(), ...l })) || [],
    failoverPolicies:
      failoverPolicies?.map(fp => ({ id: id || cuid(), ...fp })) || [],
    virtualNetworkRules:
      virtualNetworkRules?.map(vn => ({ id: id || cuid(), ...vn })) || [],
    privateEndpointConnections: privateEndpointConnections?.map(({ id: endpointId, privateEndpoint, ...pe}) => ({ 
      id: endpointId || cuid(), 
      privateEndpointId: privateEndpoint?.id,
      ...pe 
    })) || [],
    enableMultipleWriteLocations,
    enableCassandraConnector,
    connectorOffer,
    disableKeyBasedMetadataWriteAccess,
    keyVaultKeyUri,
    defaultIdentity,
    publicNetworkAccess,
    enableFreeTier,
    apiServerVersion: apiProperties?.serverVersion,
    enableAnalyticalStorage,
    analyticalStorageConfigurationSchemaType:
      analyticalStorageConfiguration?.schemaType || '',
    instanceId,
    createMode,
    restoreParameters: formatRestoreParameters(restoreParameters),
    backupPolicy: formatBackupPolicy(backupPolicy),
    cors: cors?.map(cp => ({ id: cuid(), ...cp })) || [],
    networkAclBypass,
    networkAclBypassResourceIds,
    disableLocalAuth,
    capacityTotalThroughputLimit: capacity?.totalThroughputLimit,
    tags: formatTagsFromMap(Tags),
    databases: databases?.map(({ id: databaseId, options, ...rest }) => ({
      id: databaseId || cuid(),
      ...rest,
      options: {
        throughput: options?.throughput,
        maxThroughput: options?.autoscaleSettings?.maxThroughput,
      },
    })) || [],
    azureTables: tables?.map(at => ({ id: id || cuid(), ...at })) || [],
  }
}
