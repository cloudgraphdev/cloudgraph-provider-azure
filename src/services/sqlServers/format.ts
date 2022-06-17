import cuid from 'cuid'
import { AzureSqlServer } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureServer } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureServer
  account: string
  region: string
}): AzureSqlServer => {
  const {
    id,
    name,
    type,
    identity: {
      principalId,
      type: iType,
      tenantId: iTenantId,
      userAssignedIdentities,
    } = {},
    kind,
    administratorLogin,
    version,
    state,
    fullyQualifiedDomainName,
    privateEndpointConnections = [],
    minimalTlsVersion,
    publicNetworkAccess,
    primaryUserAssignedIdentityId,
    federatedClientId,
    keyId,
    administrators: {
      administratorType,
      principalType,
      login,
      sid,
      tenantId,
      azureADOnlyAuthentication,
    } = {},
    workspaceFeature,
    restrictOutboundNetworkAccess,
    resourceGroupId,
    firewallRules = [],
    serverSecurityAlertPolicies = [],
    adAdministrators = [],
    encryptionProtectors = [],
    serverBlobAuditingPolicies = [],
    vulnerabilityAssessments = [],
    Tags,
  } = service

  return {
    id: id || cuid(),
    name,
    region,
    subscriptionId: account,
    type,
    identity: {
      principalId,
      type: iType,
      tenantId: iTenantId,
      ...(userAssignedIdentities
        ? {
            userAssignedIdentities: Object.keys(
              userAssignedIdentities ?? {}
            ).map(key => ({
              id: cuid(),
              key,
              value: userAssignedIdentities[key],
            })),
          }
        : {}),
    },
    kind,
    administratorLogin,
    version,
    state,
    fullyQualifiedDomainName,
    privateEndpointConnections:
      privateEndpointConnections?.map(
        ({ id: cId, properties: cProperties }) => ({
          id: cId || cuid(),
          ...(cProperties
            ? {
                properties: {
                  privateEndpointId: cProperties.privateEndpoint?.id,
                  privateLinkServiceConnectionState:
                    cProperties.privateLinkServiceConnectionState,
                  provisioningState: cProperties.provisioningState,
                },
              }
            : {}),
        })
      ) || [],
    minimalTlsVersion,
    publicNetworkAccess,
    primaryUserAssignedIdentityId,
    federatedClientId,
    keyId,
    administrators: {
      administratorType,
      principalType,
      login,
      sid,
      tenantId,
      azureADOnlyAuthentication,
    },
    workspaceFeature,
    restrictOutboundNetworkAccess,
    resourceGroupId,
    firewallRules:
      firewallRules?.map(r => ({ id: r.id || cuid(), ...r })) || [],
    serverSecurityAlertPolicies:
      serverSecurityAlertPolicies?.map(
        ({
          id: aId,
          creationTime,
          name: aName,
          type: aType,
          state: aState,
          disabledAlerts,
          emailAddresses,
          emailAccountAdmins,
          storageEndpoint,
          storageAccountAccessKey,
          retentionDays,
        }) => ({
          id: aId || cuid(),
          name: aName,
          type: aType,
          state: aState,
          disabledAlerts,
          emailAddresses,
          emailAccountAdmins,
          storageEndpoint,
          storageAccountAccessKey,
          retentionDays,
          creationTime: creationTime?.toISOString(),
        })
      ) || [],
    adAdministrators:
      adAdministrators?.map(a => ({ id: a.id || cuid(), ...a })) || [],
    encryptionProtectors:
      encryptionProtectors?.map(e => ({ id: e.id || cuid(), ...e })) || [],
    serverBlobAuditingPolicies:
      serverBlobAuditingPolicies?.map(
        ({
          id: sbapId,
          name: sbapName,
          type: sbapType,
          isDevopsAuditEnabled,
          retentionDays,
        }) => ({
          id: sbapId || cuid(),
          name: sbapName,
          type: sbapType,
          isDevopsAuditEnabled,
          retentionDays,
        })
      ) || [],
    vulnerabilityAssessments:
      vulnerabilityAssessments?.map(
        ({
          id: vaId,
          name: vAName,
          recurringScans,
          storageAccountAccessKey,
          storageContainerPath,
          storageContainerSasKey,
          type: vAType,
        }) => ({
          id: vaId || cuid(),
          name: vAName,
          recurringScans,
          storageAccountAccessKey,
          storageContainerPath,
          storageContainerSasKey,
          type: vAType,
        })
      ) || [],
    tags: formatTagsFromMap(Tags),
  }
}
