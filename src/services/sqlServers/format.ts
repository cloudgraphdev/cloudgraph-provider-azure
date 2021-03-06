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
    identity,
    kind,
    administratorLogin,
    administratorLoginPassword,
    version,
    state,
    fullyQualifiedDomainName,
    privateEndpointConnections = [],
    minimalTlsVersion,
    publicNetworkAccess,
    primaryUserAssignedIdentityId,
    federatedClientId,
    keyId,
    administrators,
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
      ...identity,
      userAssignedIdentities: Object.keys(
        identity?.userAssignedIdentities ?? {}
      ).map(key => ({
        id: cuid(),
        key,
        value: identity?.userAssignedIdentities[key],
      })),
    },
    kind,
    administratorLogin,
    administratorLoginPassword,
    version,
    state,
    fullyQualifiedDomainName,
    privateEndpointConnections:
      privateEndpointConnections?.map(c => ({
        id: c.id || cuid(),
        properties: {
          privateEndpointId: c.properties?.privateEndpoint?.id,
          privateLinkServiceConnectionState:
            c.properties?.privateLinkServiceConnectionState,
          provisioningState: c.properties?.provisioningState,
        },
      })) || [],
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
      firewallRules?.map(r => ({ id: r.id || cuid(), ...r })) || [],
    serverSecurityAlertPolicies: serverSecurityAlertPolicies?.map(alertPolicy => ({
      ...alertPolicy,
      id: alertPolicy.id || cuid(),
      creationTime: alertPolicy?.creationTime?.toISOString(),
    })),
    adAdministrators:
      adAdministrators?.map(a => ({ id: a.id || cuid(), ...a })) || [],
    encryptionProtectors:
      encryptionProtectors?.map(e => ({ id: e.id || cuid(), ...e })) || [],
    serverBlobAuditingPolicies: serverBlobAuditingPolicies?.map(policy => ({
      ...policy,
      id: policy.id || cuid(),
    })),
    vulnerabilityAssessments: vulnerabilityAssessments?.map(va => ({
      ...va,
      id: va.id || cuid(),
    })),
    tags: formatTagsFromMap(Tags),
  }
}
