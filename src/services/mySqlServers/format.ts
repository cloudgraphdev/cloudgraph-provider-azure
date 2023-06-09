import { formatTagsFromMap } from '../../utils/format'
import { RawAzureMySqlServer } from './data'
import {
  AzureMySqlServer,
  AzureMySqlServerConfiguration,
  AzureMySqlServerFirewallRule,
  AzureMySqlServerVirtualNetworkRule,
} from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureMySqlServer
  account: string
  region: string
}): AzureMySqlServer => {
  const {
    id,
    name,
    type,
    identity,
    administratorLogin,
    version,
    sslEnforcement,
    minimalTlsVersion,
    byokEnforcement,
    infrastructureEncryption,
    userVisibleState,
    fullyQualifiedDomainName,
    earliestRestoreDate,
    storageProfile,
    replicationRole,
    masterServerId,
    replicaCapacity,
    publicNetworkAccess,
    privateEndpointConnections,
    resourceGroupId,
    Tags,
    configurations = [],
    firewallRules = [],
    virtualNetworkRules = [],
  } = service

  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    resourceGroupId,
    identity,
    administratorLogin,
    version,
    sslEnforcement,
    minimalTlsVersion,
    byokEnforcement,
    infrastructureEncryption,
    userVisibleState,
    fullyQualifiedDomainName,
    earliestRestoreDate: earliestRestoreDate?.toISOString(),
    storageProfile,
    replicationRole,
    masterServerId,
    replicaCapacity,
    publicNetworkAccess,
    privateEndpointConnections: privateEndpointConnections?.map(connection => ({
      ...connection,
      id: connection.id,
    })),
    tags: formatTagsFromMap(Tags),
    configurations:
      configurations?.map(
        ({
          id: configurationId,
          name: configurationName,
          type: configurationType,
        }): AzureMySqlServerConfiguration => ({
          id: configurationId,
          name: configurationName,
          type: configurationType,
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
        }): AzureMySqlServerFirewallRule => ({
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
        }): AzureMySqlServerVirtualNetworkRule => ({
          id: virtualNetworkRuleId,
          name: virtualNetworkRuleName,
          type: virtualNetworkRuleType,
        })
      ) ?? [],
  }
}
