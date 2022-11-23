import { generateUniqueId } from '@cloudgraph/sdk'
import { AzureDatabaseManagedSqlInstance } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureDatabaseManagedSqlInstance } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDatabaseManagedSqlInstance
  account: string
  region: string
}): AzureDatabaseManagedSqlInstance => {
  const {
    id,
    name,
    type,
    resourceGroupId,
    collation,
    currentBackupStorageRedundancy,
    dnsZone,
    dnsZonePartner,
    fullyQualifiedDomainName,
    identity = {},
    instancePoolId,
    keyId,
    licenseType,
    maintenanceConfigurationId,
    minimalTlsVersion,
    primaryUserAssignedIdentityId,
    provisioningState,
    proxyOverride,
    publicDataEndpointEnabled,
    requestedBackupStorageRedundancy,
    restorePointInTime,
    sku: { name: skuName, tier: skuTier } = {},
    sourceManagedInstanceId,
    state,
    storageSizeInGB,
    subnetId,
    timezoneId,
    vCores,
    zoneRedundant,
    Tags,
  } = service

  return {
    id,
    name,
    region,
    subscriptionId: account,
    type,
    resourceGroupId,
    collation,
    currentBackupStorageRedundancy,
    dnsZone,
    dnsZonePartner,
    fullyQualifiedDomainName,
    instancePoolId,
    keyId,
    licenseType,
    maintenanceConfigurationId,
    minimalTlsVersion,
    primaryUserAssignedIdentityId,
    provisioningState,
    proxyOverride,
    publicDataEndpointEnabled,
    requestedBackupStorageRedundancy,
    restorePointInTime: restorePointInTime?.toISOString(),
    skuName,
    skuTier,
    sourceManagedInstanceId,
    state,
    storageSizeInGB,
    subnetId,
    timezoneId,
    vCores,
    zoneRedundant,
    identity: {
      ...identity,
      userAssignedIdentities: Object.keys(
        identity?.userAssignedIdentities ?? {}
      ).map(key => ({
        id: generateUniqueId({id, key}),
        key,
        value: identity?.userAssignedIdentities[key],
      })),
    },
    tags: formatTagsFromMap(Tags),
  }
}
