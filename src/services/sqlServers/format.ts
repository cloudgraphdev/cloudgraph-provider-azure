import { generateUniqueId } from '@cloudgraph/sdk'
import {
  AzureSqlServer,
  AzureSqlServerAdAdministrator,
  AzureSqlServerBlobAuditingPolicy,
  AzureSqlServerElasticPool,
  AzureSqlServerEncryptionProtector,
  AzureSqlServerFailoverGroup,
  AzureSqlServerFirewallRule,
  AzureSqlServerPrivateEndpointConnection,
  AzureSqlServerSecurityAlertPolicy,
  AzureSqlServerVirtualNetworkRule,
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
    elasticPools = [],
    failoverGroups = [],
    firewallRules = [],
    virtualNetworkRules = [],
    serverSecurityAlertPolicies = [],
    adAdministrators = [],
    encryptionProtectors = [],
    serverBlobAuditingPolicies = [],
    vulnerabilityAssessments = [],
    Tags,
  } = service

  return {
    id,
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
                id: generateUniqueId({
                  key,
                  value: userAssignedIdentities[key],
                }),
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
          id: privateEndpointConnectionId,
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
    elasticPools:
      elasticPools?.map(
        ({
          id: elasticPoolId,
          name: elasticPoolName,
          type: elasticPoolType,
        }): AzureSqlServerElasticPool => ({
          id: elasticPoolId,
          name: elasticPoolName,
          type: elasticPoolType,
        })
      ) ?? [],
    failoverGroups:
      failoverGroups?.map(
        ({
          id: failoverGroupId,
          name: failoverGroupName,
          type: failoverGroupType,
        }): AzureSqlServerFailoverGroup => ({
          id: failoverGroupId,
          name: failoverGroupName,
          type: failoverGroupType,
        })
      ) ?? [],
    firewallRules:
      firewallRules?.map(
        ({
          id: firewallRuleId,
          name: firewallRuleName,
          type: firewallRuleType,
          startIpAddress,
          endIpAddress,
        }): AzureSqlServerFirewallRule => ({
          id: firewallRuleId,
          name: firewallRuleName,
          type: firewallRuleType,
          startIpAddress,
          endIpAddress,
        })
      ) ?? [],
    virtualNetworkRules:
      virtualNetworkRules?.map(
        ({
          id: virtualNetworkRuleId,
          name: virtualNetworkRuleName,
          type: virtualNetworkRuleType,
        }): AzureSqlServerVirtualNetworkRule => ({
          id: virtualNetworkRuleId,
          name: virtualNetworkRuleName,
          type: virtualNetworkRuleType,
        })
      ) ?? [],
    serverSecurityAlertPolicies:
      serverSecurityAlertPolicies?.map(
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
          id: srvSecurityAlertPolicyId,
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
          id: adAdministratorId,
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
        })
      ) ?? [],
    serverBlobAuditingPolicies:
      serverBlobAuditingPolicies?.map(
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
        })
      ) ?? [],
    vulnerabilityAssessments:
      vulnerabilityAssessments?.map(
        ({
          id: vaId,
          name: vaName,
          type: vaType,
          storageContainerPath,
          recurringScans: { isEnabled, emailSubscriptionAdmins, emails = [] },
        }): AzureSqlServerVulnerabilityAssessment => ({
          id: vaId,
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
