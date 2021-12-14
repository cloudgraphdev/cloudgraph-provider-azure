import cuid from 'cuid'
import { AccessPolicyEntry } from '@azure/arm-keyvault/esm/models'
import { AzureKeyVault, AzureKeyVaultAccessPolicy } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureKeyVault } from './data'
import t from '../../properties/translations'

const formatKeyVaultAccessPolicyEntry = ({
  objectId,
  applicationId,
  permissions,
}: AccessPolicyEntry): AzureKeyVaultAccessPolicy => {
  return {
    id: cuid(),
    objectId,
    applicationId,
    permissionKeys: permissions?.keys || [],
    permissionSecrets: permissions?.secrets || [],
    permissionCertificates: permissions?.certificates || [],
    permissionStorage: permissions?.storage || [],
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureKeyVault
  account: string
  region: string
}): AzureKeyVault => {
  const {
    id,
    properties,
    Tags,
  } = service

  return {
    id: id || cuid(),
    subscriptionId: account,
    region,
    tenantId: properties?.tenantId || '',
    accessPolicies: properties?.accessPolicies?.map(
      accessPolicy => formatKeyVaultAccessPolicyEntry(accessPolicy)
    ) || [],
    vaultUri: properties?.vaultUri || '',
    enabledForDeployment: properties?.enabledForDeployment ? t.yes : t.no,
    enabledForDiskEncryption: properties?.enabledForDiskEncryption ? t.yes : t.no,
    enabledForTemplateDeployment: properties?.enabledForTemplateDeployment ? t.yes : t.no,
    enableSoftDelete: properties?.enableSoftDelete ? t.yes : t.no,
    createMode: properties?.createMode || '',
    enablePurgeProtection: properties?.enablePurgeProtection ? t.yes : t.no,
    networkAclBypass: properties?.networkAcls?.bypass || '',
    networkAclDefaultAction: properties?.networkAcls?.defaultAction || '',
    networkAclIpRules: properties?.networkAcls?.ipRules?.map(
      ipRule => ipRule?.value || ''
    ) || [],
    networkAclVirtualNetworkRules: properties?.networkAcls?.virtualNetworkRules?.map(
      virtualNetworkRule => virtualNetworkRule?.id || ''
    ) || [],
    tags: formatTagsFromMap(Tags),
  }
}
