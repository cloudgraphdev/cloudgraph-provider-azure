import cuid from 'cuid'
import { AzureDatabaseSqlVm } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureDatabaseSqlVm } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDatabaseSqlVm
  account: string
  region: string
}): AzureDatabaseSqlVm => {
  const {
    id,
    name,
    type,
    resourceGroupId,
    identity,
    virtualMachineResourceId,
    provisioningState,
    sqlImageOffer,
    sqlServerLicenseType,
    sqlManagement,
    sqlImageSku,
    sqlVirtualMachineGroupResourceId,
    wsfcDomainCredentials,
    autoPatchingSettings,
    autoBackupSettings,
    keyVaultCredentialSettings,
    serverConfigurationsManagementSettings,
    storageConfigurationSettings,
    Tags,
  } = service

  return {
    id: id || cuid(),
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    identity,
    virtualMachineResourceId,
    provisioningState,
    sqlImageOffer,
    sqlServerLicenseType,
    sqlManagement,
    sqlImageSku,
    sqlVirtualMachineGroupResourceId,
    wsfcDomainCredentials,
    autoPatchingSettings,
    autoBackupSettings,
    keyVaultCredentialSettings,
    serverConfigurationsManagementSettings,
    storageConfigurationSettings,
    tags: formatTagsFromMap(Tags),
  }
}
