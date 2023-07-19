import { formatTagsFromMap } from '../../utils/format'
import { RawAzurePostgreSqlServer } from './data'
import {
  AzurePostgreSqlServer,
  AzurePostgreSqlServerVirtualNetworkRule,
} from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzurePostgreSqlServer
  account: string
  region: string
}): AzurePostgreSqlServer => {
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
    configurations: configurations.map(
      ({
        id: confId,
        name: confName,
        type: confType,
        value,
        description,
        defaultValue,
        dataType,
        allowedValues,
        source,
      }) => ({
        id: confId,
        name: confName,
        type: confType,
        value,
        description,
        defaultValue,
        dataType,
        allowedValues,
        source,
      })
    ),
    firewallRules: firewallRules.map(
      ({
        id: confId,
        name: confName,
        type: confType,
        startIpAddress,
        endIpAddress,
      }) => ({
        id: confId,
        name: confName,
        type: confType,
        startIpAddress,
        endIpAddress,
      })
    ),
    virtualNetworkRules:
      virtualNetworkRules?.map(
        ({
          id: virtualNetworkRuleId,
          name: virtualNetworkRuleName,
          type: virtualNetworkRuleType,
        }): AzurePostgreSqlServerVirtualNetworkRule => ({
          id: virtualNetworkRuleId,
          name: virtualNetworkRuleName,
          type: virtualNetworkRuleType,
        })
      ) ?? [],
  }
}
