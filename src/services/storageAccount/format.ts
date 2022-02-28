import cuid from 'cuid'
import {
  IPRule,
  PrivateEndpointConnection,
  ResourceAccessRule,
  VirtualNetworkRule,
} from '@azure/arm-storage/esm/models'
import t from '../../properties/translations'

import {
  AzureStorageAccount,
  AzureStorageAccountIpRule,
  AzureStorageAccountPrivateEndpointConnection,
  AzureStorageAccountResourceAccessRule,
  AzureStorageAccountVirtualNetworkRule,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureStorageAccount } from './data'

const formatPrivateEndpointConnection = ({
  privateEndpoint,
  privateLinkServiceConnectionState,
  provisioningState,
}: PrivateEndpointConnection): AzureStorageAccountPrivateEndpointConnection => {
  return {
    id: cuid(),
    privateEndpointId: privateEndpoint?.id || '',
    privateLinkServiceConnectionStateStatus:
      privateLinkServiceConnectionState?.status || '',
    privateLinkServiceConnectionStateDescription:
      privateLinkServiceConnectionState?.description || '',
    privateLinkServiceConnectionStateActionRequired:
      privateLinkServiceConnectionState?.actionRequired || '',
    provisioningState,
  }
}

const formatResourceAccessRule = ({
  tenantId,
  resourceId,
}: ResourceAccessRule): AzureStorageAccountResourceAccessRule => {
  return {
    id: cuid(),
    tenantId,
    resourceId,
  }
}
const formatVirtualNetworkRule = ({
  virtualNetworkResourceId,
  action,
  state,
}: VirtualNetworkRule): AzureStorageAccountVirtualNetworkRule => {
  return {
    id: cuid(),
    virtualNetworkResourceId,
    action,
    state,
  }
}
const formatIpRule = ({
  iPAddressOrRange,
  action,
}: IPRule): AzureStorageAccountIpRule => {
  return {
    id: cuid(),
    iPAddressOrRange,
    action,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureStorageAccount
  account: string
  region: string
}): AzureStorageAccount => {
  const {
    id,
    name,
    kind,
    extendedLocation,
    provisioningState,
    primaryEndpoints,
    primaryLocation,
    statusOfPrimary,
    lastGeoFailoverTime,
    secondaryLocation,
    statusOfSecondary,
    customDomain,
    sasPolicy,
    keyPolicy,
    keyCreationTime,
    encryption,
    accessTier,
    azureFilesIdentityBasedAuthentication,
    enableHttpsTrafficOnly,
    networkRuleSet,
    isHnsEnabled,
    geoReplicationStats,
    failoverInProgress,
    largeFileSharesState,
    privateEndpointConnections,
    routingPreference,
    allowBlobPublicAccess,
    minimumTlsVersion,
    allowSharedKeyAccess,
    enableNfsV3,
    resourceGroupId,
    Tags,
    blobServiceProperties,
  } = service

  return {
    id: id || cuid(),
    name,
    subscriptionId: account,
    resourceGroupId,
    kind,
    extendedLocationName: extendedLocation?.name || '',
    extendedLocationType: extendedLocation?.type || '',
    provisioningState,
    primaryEndpoints: {
      blob: primaryEndpoints?.blob || '',
      queue: primaryEndpoints?.blob || '',
      table: primaryEndpoints?.blob || '',
      file: primaryEndpoints?.blob || '',
      web: primaryEndpoints?.blob || '',
      dfs: primaryEndpoints?.blob || '',
    },
    primaryMicrosoftEndpoints: {
      blob: primaryEndpoints?.microsoftEndpoints?.blob || '',
      queue: primaryEndpoints?.microsoftEndpoints?.queue || '',
      table: primaryEndpoints?.microsoftEndpoints?.table || '',
      file: primaryEndpoints?.microsoftEndpoints?.file || '',
      web: primaryEndpoints?.microsoftEndpoints?.web || '',
      dfs: primaryEndpoints?.microsoftEndpoints?.dfs || '',
    },
    primaryInternetEndpoints: {
      blob: primaryEndpoints?.internetEndpoints?.blob || '',
      file: primaryEndpoints?.internetEndpoints?.file || '',
      web: primaryEndpoints?.internetEndpoints?.web || '',
      dfs: primaryEndpoints?.internetEndpoints?.dfs || '',
    },
    primaryLocation,
    statusOfPrimary,
    lastGeoFailoverTime: lastGeoFailoverTime?.toUTCString() || '',
    secondaryLocation,
    statusOfSecondary,
    customDomainName: customDomain?.name || '',
    customDomainUseSubDomainName: customDomain?.useSubDomainName ? t.yes : t.no,
    sasPolicyExpirationPeriod: sasPolicy?.sasExpirationPeriod || '',
    keyPolicyExpirationPeriodInDays: keyPolicy?.keyExpirationPeriodInDays || 0,
    keyCreationTimeKey1: keyCreationTime?.key1?.toUTCString() || '',
    keyCreationTimeKey2: keyCreationTime?.key2?.toUTCString() || '',
    encryptionServiceBlob: {
      enabled: encryption?.services?.blob?.enabled ? t.yes : t.no,
      lastEnabledTime:
        encryption?.services?.blob?.lastEnabledTime?.toUTCString() || '',
      keyType: encryption?.services?.blob?.keyType || '',
    },
    encryptionServiceFile: {
      enabled: encryption?.services?.file?.enabled ? t.yes : t.no,
      lastEnabledTime:
        encryption?.services?.file?.lastEnabledTime?.toUTCString() || '',
      keyType: encryption?.services?.file?.keyType || '',
    },
    encryptionServiceTable: {
      enabled: encryption?.services?.table?.enabled ? t.yes : t.no,
      lastEnabledTime:
        encryption?.services?.table?.lastEnabledTime?.toUTCString() || '',
      keyType: encryption?.services?.table?.keyType || '',
    },
    encryptionServiceQueue: {
      enabled: encryption?.services?.queue?.enabled ? t.yes : t.no,
      lastEnabledTime:
        encryption?.services?.blob?.lastEnabledTime?.toUTCString() || '',
      keyType: encryption?.services?.blob?.keyType || '',
    },
    encryptionKeySource: encryption?.keySource || '',
    encryptionRequireInfrastructureEncryption:
      encryption?.requireInfrastructureEncryption ? t.yes : t.no,
    encryptionKeyVaultPropertyKeyName:
      encryption?.keyVaultProperties?.keyName || '',
    encryptionKeyVaultPropertyKeyVersion:
      encryption?.keyVaultProperties?.keyVersion || '',
    encryptionKeyVaultPropertyKeyVaultUri:
      encryption?.keyVaultProperties?.keyVaultUri || '',
    encryptionKeyVaultPropertyCurrentVersionedKeyIdentifier:
      encryption?.keyVaultProperties?.currentVersionedKeyIdentifier || '',
    encryptionKeyVaultPropertyLastKeyRotationTimestamp:
      encryption?.keyVaultProperties?.lastKeyRotationTimestamp?.toUTCString() ||
      '',
    encryptionUserAssignedIdentity:
      encryption?.encryptionIdentity?.encryptionUserAssignedIdentity || '',
    accessTier,
    azureFilesIdentityBasedAuthenticationDirectoryServiceOptions:
      azureFilesIdentityBasedAuthentication?.directoryServiceOptions || '',
    azureFilesIdentityBasedAuthenticationADProperties: {
      domainName:
        azureFilesIdentityBasedAuthentication?.activeDirectoryProperties
          ?.domainName || '',
      netBiosDomainName:
        azureFilesIdentityBasedAuthentication?.activeDirectoryProperties
          ?.netBiosDomainName || '',
      forestName:
        azureFilesIdentityBasedAuthentication?.activeDirectoryProperties
          ?.forestName || '',
      domainGuid:
        azureFilesIdentityBasedAuthentication?.activeDirectoryProperties
          ?.domainGuid || '',
      domainSid:
        azureFilesIdentityBasedAuthentication?.activeDirectoryProperties
          ?.domainSid || '',
      azureStorageSid:
        azureFilesIdentityBasedAuthentication?.activeDirectoryProperties
          ?.azureStorageSid || '',
    },
    enableHttpsTrafficOnly: enableHttpsTrafficOnly ? t.yes : t.no,
    networkRuleSetByPass: networkRuleSet?.bypass || '',
    networkRuleResourceAccessRules:
      networkRuleSet?.resourceAccessRules?.map(rar =>
        formatResourceAccessRule(rar)
      ) || [],
    networkRuleVirtualNetworkRules:
      networkRuleSet?.virtualNetworkRules?.map(vnr =>
        formatVirtualNetworkRule(vnr)
      ) || [],
    networkRuleIpRules:
      networkRuleSet?.ipRules?.map(ir => formatIpRule(ir)) || [],
    networkRuleSetDefaultAction: networkRuleSet?.defaultAction || '',
    isHnsEnabled: isHnsEnabled ? t.yes : t.no,
    geoReplicationStatsStatus: geoReplicationStats?.status || '',
    geoReplicationStatsLastSyncTime:
      geoReplicationStats?.lastSyncTime?.toUTCString() || '',
    geoReplicationStatsCanFailover: geoReplicationStats?.canFailover
      ? t.yes
      : t.no,
    failoverInProgress: failoverInProgress ? t.yes : t.no,
    largeFileSharesState,
    privateEndpointConnections:
      privateEndpointConnections?.map(privateEndpointConnection =>
        formatPrivateEndpointConnection(privateEndpointConnection)
      ) || [],
    routingPreferenceChoice: routingPreference?.routingChoice || '',
    routingPreferencePublishMicrosoftEndpoints:
      routingPreference?.publishMicrosoftEndpoints ? t.yes : t.no,
    routingPreferencePublishInternetEndpoints:
      routingPreference?.publishInternetEndpoints ? t.yes : t.no,
    allowBlobPublicAccess: allowBlobPublicAccess ? t.yes : t.no,
    minimumTlsVersion,
    allowSharedKeyAccess: allowSharedKeyAccess ? t.yes : t.no,
    enableNfsV3: enableNfsV3 ? t.yes : t.no,
    region,
    tags: formatTagsFromMap(Tags),
    blobServiceProperties: {
      id: blobServiceProperties?.id || cuid(),
      name: blobServiceProperties?.name,
      type: blobServiceProperties?.type,
      corsRules: blobServiceProperties?.cors?.corsRules?.map(({ ...rest}) => ({
        id: cuid(),
        ...rest,
      })),
      deleteRetentionPolicyEnabled: blobServiceProperties?.deleteRetentionPolicy?.enabled,
      deleteRetentionPolicyDays: blobServiceProperties?.deleteRetentionPolicy?.days,
      skuName: blobServiceProperties?.sku?.name,
      skuTier: blobServiceProperties?.sku?.tier,
   }
  }
}
