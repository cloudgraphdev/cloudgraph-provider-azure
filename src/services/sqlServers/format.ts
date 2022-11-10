import cuid from 'cuid'
import {
  AzureSqlServer,
  AzureSqlServerAdAdministrator,
  AzureSqlServerBlobAuditingPolicy,
  AzureSqlServerEncryptionProtector,
  AzureSqlServerFirewallRule,
  AzureSqlServerPrivateEndpointConnection,
  AzureSqlServerSecurityAlertPolicy,
  AzureSqlServerVulnerabilityAssessment,
} from '../../types/generated'
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
      tenantId,
      type: identityType,
      principalId,
      userAssignedIdentities = {},
    } = {},
    kind,
    version,
    state,
    fullyQualifiedDomainName,
    privateEndpointConnections = [],
    minimalTlsVersion,
    publicNetworkAccess,
    primaryUserAssignedIdentityId,
    federatedClientId,
    keyId,
    administrators = {},
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
      tenantId,
      type: identityType,
      principalId,
      ...(userAssignedIdentities
        ? {
            userAssignedIdentities: Object.keys(userAssignedIdentities).map(
              key => ({
                id: cuid(),
                key,
                value: userAssignedIdentities[key],
              })
            ),
          }
        : {}),
    },
    kind,
    version,
    state,
    fullyQualifiedDomainName,
    privateEndpointConnections:
      privateEndpointConnections?.map(
        ({
          id: privateEndpointConnectionId,
          properties: {
            privateEndpoint = {},
            privateLinkServiceConnectionState: {
              description,
              status,
              actionsRequired,
            } = {},
            provisioningState,
          } = {},
        }): AzureSqlServerPrivateEndpointConnection => ({
          id: privateEndpointConnectionId ?? cuid(),
          properties: {
            privateEndpointId: privateEndpoint.id,
            privateLinkServiceConnectionState: {
              description,
              status,
              actionsRequired,
            },
            provisioningState,
          },
        })
      ) ?? [],
    minimalTlsVersion,
    publicNetworkAccess,
    primaryUserAssignedIdentityId,
    federatedClientId,
    keyId,
    administrators,
    workspaceFeature,
    restrictOutboundNetworkAccess,
    resourceGroupId,
    firewallRules:
      firewallRules?.map(
        ({
          id: firewallRuleId,
          name: firewallRuleName,
          type: firewallRuleType,
          startIpAddress,
          endIpAddress,
        }): AzureSqlServerFirewallRule => ({
          id: firewallRuleId ?? cuid(),
          name: firewallRuleName,
          type: firewallRuleType,
          startIpAddress,
          endIpAddress,
        })
      ) ?? [],
    serverSecurityAlertPolicies: serverSecurityAlertPolicies?.map(
      ({
        id: srvSecurityAlertPolicyId,
        creationTime,
        name: srvSecurityAlertPolicyName,
        type: srvSecurityAlertPolicyType,
        state: srvSecurityAlertPolicyState,
        disabledAlerts = [],
        emailAddresses = [],
        emailAccountAdmins,
        storageEndpoint,
        retentionDays,
      }): AzureSqlServerSecurityAlertPolicy => ({
        id: srvSecurityAlertPolicyId ?? cuid(),
        name: srvSecurityAlertPolicyName,
        type: srvSecurityAlertPolicyType,
        state: srvSecurityAlertPolicyState,
        disabledAlerts,
        emailAddresses,
        emailAccountAdmins,
        storageEndpoint,
        retentionDays,
        creationTime: creationTime?.toISOString(),
      })
    ) ?? [],
    adAdministrators:
      adAdministrators?.map(
        ({
          id: adAdministratorId,
          name: adAdministratorName,
          type: adAdministratorType,
          administratorType: adAdministratorAdminType,
          sid,
          tenantId: adAdministratorTenantId,
        }): AzureSqlServerAdAdministrator => ({
          id: adAdministratorId ?? cuid(),
          name: adAdministratorName,
          type: adAdministratorType,
          administratorType: adAdministratorAdminType,
          sid,
          tenantId: adAdministratorTenantId,
        })
      ) ?? [],
    encryptionProtectors:
      encryptionProtectors?.map(
        ({
          id: encryptionProtectorId,
          name: encryptionProtectorName,
          type: encryptionProtectorType,
          kind: encryptionProtectorKind,
          location: encryptionProtectorLocation,
          subregion,
          serverKeyName,
          serverKeyType,
          uri,
          thumbprint,
          autoRotationEnabled,
        }): AzureSqlServerEncryptionProtector => ({
          id: encryptionProtectorId ?? cuid(),
          name: encryptionProtectorName,
          type: encryptionProtectorType,
          kind: encryptionProtectorKind,
          location: encryptionProtectorLocation,
          subregion,
          serverKeyName,
          serverKeyType,
          uri,
          thumbprint,
          autoRotationEnabled,
        })
      ) ?? [],
    serverBlobAuditingPolicies: serverBlobAuditingPolicies?.map(
      ({
        id: serverBlobAuditingPolicyId,
        name: serverBlobAuditingPolicyName,
        type: serverBlobAuditingPolicyType,
        isDevopsAuditEnabled,
        retentionDays,
        auditActionsAndGroups,
        isStorageSecondaryKeyInUse,
        isAzureMonitorTargetEnabled,
        queueDelayMs,
        state: serverBlobAuditingPolicyState,
        storageEndpoint,
        storageAccountSubscriptionId,
      }): AzureSqlServerBlobAuditingPolicy => ({
        id: serverBlobAuditingPolicyId || cuid(),
        name: serverBlobAuditingPolicyName,
        type: serverBlobAuditingPolicyType,
        isDevopsAuditEnabled,
        retentionDays,
        auditActionsAndGroups,
        isStorageSecondaryKeyInUse,
        isAzureMonitorTargetEnabled,
        queueDelayMs,
        state: serverBlobAuditingPolicyState,
        storageEndpoint,
        storageAccountSubscriptionId,
      })
    ) ?? [],
    vulnerabilityAssessments: vulnerabilityAssessments?.map(
      ({
        id: vaId,
        name: vaName,
        type: vaType,
        storageContainerPath,
        recurringScans: { isEnabled, emailSubscriptionAdmins, emails = [] },
      }): AzureSqlServerVulnerabilityAssessment => ({
        id: vaId ?? cuid(),
        name: vaName,
        type: vaType,
        storageContainerPath,
        recurringScans: {
          isEnabled,
          emailSubscriptionAdmins,
          emails,
        },
      })
    ) ?? [],
    tags: formatTagsFromMap(Tags),
  }
}
