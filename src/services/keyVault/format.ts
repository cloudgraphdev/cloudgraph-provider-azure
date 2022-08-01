import cuid from 'cuid'
import { AccessPolicyEntry } from '@azure/arm-keyvault'
import { AzureKeyVault, AzureKeyVaultAccessPolicy } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureKeyVault } from './data'
import { toISOString } from '../../utils/dateutils'

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
    name,
    type,
    properties,
    Tags,
    resourceGroupId,
    keys,
    secrets,
    diagnosticSettings,
  } = service

  return {
    id: id || cuid(),
    name,
    type,
    subscriptionId: account,
    region,
    tenantId: properties?.tenantId || '',
    accessPolicies:
      properties?.accessPolicies?.map(accessPolicy =>
        formatKeyVaultAccessPolicyEntry(accessPolicy)
      ) || [],
    vaultUri: properties?.vaultUri || '',
    enabledForDeployment: properties?.enabledForDeployment,
    enabledForDiskEncryption: properties?.enabledForDiskEncryption,
    enabledForTemplateDeployment: properties?.enabledForTemplateDeployment,
    enableSoftDelete: properties?.enableSoftDelete,
    createMode: properties?.createMode || '',
    enablePurgeProtection: properties?.enablePurgeProtection,
    networkAclBypass: properties?.networkAcls?.bypass || '',
    networkAclDefaultAction: properties?.networkAcls?.defaultAction || '',
    networkAclIpRules:
      properties?.networkAcls?.ipRules?.map(ipRule => ipRule?.value || '') ||
      [],
    networkAclVirtualNetworkRules:
      properties?.networkAcls?.virtualNetworkRules?.map(
        virtualNetworkRule => virtualNetworkRule?.id || ''
      ) || [],
    softDeleteRetentionInDays: properties?.softDeleteRetentionInDays,
    enableRbacAuthorization: properties?.enableRbacAuthorization,
    provisioningState: properties?.provisioningState || '',
    publicNetworkAccess: properties?.provisioningState || '',
    tags: formatTagsFromMap(Tags),
    resourceGroupId,
    keys:
      keys?.map(k => ({
        id: k.id || cuid(),
        name: k.name,
        type: k.type,
        location: k.location,
        keyUri: k.keyUri,
        attributes:
          {
            enabled: k.attributes?.enabled,
            notBefore: toISOString(k.attributes?.notBefore?.toString()),
            expires: toISOString(k.attributes?.expires?.toString()),
            created: toISOString(k.attributes?.created?.toString()),
            updated: toISOString(k.attributes?.updated?.toString()),
            recoveryLevel: k.attributes?.recoveryLevel,
            exportable: k.attributes?.exportable,
          } || {},
        tags: formatTagsFromMap(k.tags),
      })) || [],
    secrets:
      secrets?.map(s => ({
        id: s.id || cuid(),
        name: s.name,
        type: s.type,
        location: s.location,
        tags: formatTagsFromMap(s.tags),
        properties:
          {
            value: s.properties?.value,
            contentType: s.properties?.contentType,
            attributes:
              {
                enabled: s.properties?.attributes?.enabled,
                notBefore:
                  s.properties?.attributes?.notBefore?.toISOString() || '',
                expires: s.properties?.attributes?.expires?.toISOString() || '',
                created: s.properties?.attributes?.created?.toISOString() || '',
                updated: s.properties?.attributes?.updated?.toISOString() || '',
              } || {},
            secretUri: s.properties?.secretUri,
            secretUriWithVersion: s.properties?.secretUriWithVersion,
          } || {},
      })) || [],
    diagnosticSettings:
      diagnosticSettings?.map(ds => ({
        id: ds.id || cuid(),
        name: ds.name,
        type: ds.type,
        storageAccountId: ds.storageAccountId,
        serviceBusRuleId: ds.serviceBusRuleId,
        eventHubAuthorizationRuleId: ds.eventHubAuthorizationRuleId,
        eventHubName: ds.eventHubName,
        workspaceId: ds.workspaceId,
        logAnalyticsDestinationType: ds.logAnalyticsDestinationType,
        metrics: ds.metrics?.map(
          ({
            retentionPolicy: {
              enabled: retentionPolicyEnabled,
              days: retentionPolicyDays,
            } = {},
            timeGrain,
            category,
            enabled,
          }) =>
            ({
              id: cuid(),
              retentionPolicyEnabled,
              retentionPolicyDays,
              timeGrain,
              category,
              enabled,
            })
        ) || [],
        logs:
          ds.logs?.map(
            ({
              retentionPolicy: {
                enabled: retentionPolicyEnabled,
                days: retentionPolicyDays,
              } = {},
              category,
              enabled,
            }) => ({
              id: cuid(),
              retentionPolicyEnabled,
              retentionPolicyDays,
              category,
              enabled,
            })
          ) || [],
      })) || [],
  }
}
