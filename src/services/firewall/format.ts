import {
  AzureFirewallApplicationRuleCollection as FirewallApplicationRuleCollection,
  AzureFirewallApplicationRule as FirewallApplicationRule,
  AzureFirewallApplicationRuleProtocol as FirewallApplicationRuleProtocol,
  AzureFirewallNatRuleCollection as FirewallNatRuleCollection,
  AzureFirewallNatRule as FirewallNatRule,
  AzureFirewallNetworkRuleCollection as FirewallNetworkRuleCollection,
  AzureFirewallNetworkRule as FirewallNetworkRule,
  AzureFirewallIPConfiguration as FirewallIPConfiguration,
} from '@azure/arm-network'
import { generateUniqueId } from '@cloudgraph/sdk'
import {
  AzureFirewall,
  AzureFirewallAdditionalProperty,
  AzureFirewallApplicationRule,
  AzureFirewallApplicationRuleCollection,
  AzureFirewallApplicationRuleProtocol,
  AzureFirewallIpConfiguration,
  AzureFirewallNatRule,
  AzureFirewallNatRuleCollection,
  AzureFirewallNetworkRule,
  AzureFirewallNetworkRuleCollection,
} from '../../types/generated'
import { RawAzureFirewall } from './data'
import { formatTagsFromMap } from '../../utils/format'

// applicationRuleCollections
const formatAzureFirewallApplicationRuleProtocol = ({
  protocolType,
  port,
}: FirewallApplicationRuleProtocol): AzureFirewallApplicationRuleProtocol => {
  return {
    id: generateUniqueId({ protocolType, port }),
    protocolType,
    port,
  }
}
const formatAzureFirewallApplicationRule = ({
  name,
  description,
  sourceAddresses,
  protocols,
  targetFqdns,
  fqdnTags,
  sourceIpGroups,
}: FirewallApplicationRule): AzureFirewallApplicationRule => {
  return {
    id: generateUniqueId({ name }),
    name,
    description,
    sourceAddresses,
    protocols:
      protocols?.map(protocol =>
        formatAzureFirewallApplicationRuleProtocol(protocol)
      ) || [],
    targetFqdns,
    fqdnTags,
    sourceIpGroups,
  }
}

const formatAzureFirewallApplicationRuleCollection = ({
  id,
  name,
  priority,
  action,
  rules,
  provisioningState,
}: FirewallApplicationRuleCollection): AzureFirewallApplicationRuleCollection => {
  return {
    id,
    name,
    priority,
    action: action?.type || '',
    rules: rules?.map(rule => formatAzureFirewallApplicationRule(rule)) || [],
    provisioningState,
  }
}

// natRuleCollections
const formatAzureFirewallNatRule = ({
  name,
  description,
  sourceAddresses,
  destinationAddresses,
  destinationPorts,
  protocols,
  translatedAddress,
  translatedPort,
  translatedFqdn,
  sourceIpGroups,
}: FirewallNatRule): AzureFirewallNatRule => {
  return {
    id: generateUniqueId({ name }),
    name,
    description,
    sourceAddresses,
    destinationAddresses,
    destinationPorts,
    protocols,
    translatedAddress,
    translatedPort,
    translatedFqdn,
    sourceIpGroups,
  }
}

const formatNatRuleCollection = ({
  id,
  priority,
  action,
  rules,
  provisioningState,
  name,
}: FirewallNatRuleCollection): AzureFirewallNatRuleCollection => {
  return {
    id,
    name,
    priority,
    action: action?.type || '',
    rules: rules?.map(rule => formatAzureFirewallNatRule(rule)) || [],
    provisioningState,
  }
}

// networkRuleCollections
const formatAzureFirewallNetworkRule = ({
  name,
  description,
  protocols,
  sourceAddresses,
  destinationAddresses,
  destinationPorts,
  destinationFqdns,
  sourceIpGroups,
  destinationIpGroups,
}: FirewallNetworkRule): AzureFirewallNetworkRule => {
  return {
    id: generateUniqueId({ name }),
    name,
    description,
    protocols,
    sourceAddresses,
    destinationAddresses,
    destinationPorts,
    destinationFqdns,
    sourceIpGroups,
    destinationIpGroups,
  }
}

const formatNetworkRuleCollection = ({
  id,
  name,
  priority,
  action,
  rules,
  provisioningState,
}: FirewallNetworkRuleCollection): AzureFirewallNetworkRuleCollection => {
  return {
    id,
    name,
    priority,
    action: action?.type || '',
    rules: rules?.map(rule => formatAzureFirewallNetworkRule(rule)) || [],
    provisioningState,
  }
}

// ipConfigurations
const formatIpConfiguration = ({
  id,
  name,
  privateIPAddress,
  subnet,
  publicIPAddress,
  provisioningState,
  type,
}: FirewallIPConfiguration): AzureFirewallIpConfiguration => {
  return {
    id,
    name,
    privateIPAddress,
    subnet: subnet?.id || '',
    publicIPAddress: publicIPAddress?.id || '',
    provisioningState,
    type,
  }
}

export const formatAdditionalProperties = (properties: {
  [property: string]: string
}): AzureFirewallAdditionalProperty[] => {
  const result: AzureFirewallAdditionalProperty[] = []
  for (const [key, value] of Object.entries(properties)) {
    result.push({ id: `${key}:${value}`, key, value })
  }
  return result
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureFirewall
  account: string
  region: string
}): AzureFirewall => {
  const {
    id,
    name,
    type,
    applicationRuleCollections,
    natRuleCollections,
    networkRuleCollections,
    ipConfigurations,
    managementIpConfiguration,
    provisioningState,
    threatIntelMode,
    virtualHub,
    firewallPolicy,
    hubIPAddresses,
    ipGroups,
    additionalProperties,
    zones,
    Tags,
  } = service

  return {
    id,
    name,
    type,
    subscriptionId: account,
    applicationRuleCollections:
      applicationRuleCollections?.map(applicationRuleCollection =>
        formatAzureFirewallApplicationRuleCollection(applicationRuleCollection)
      ) || [],
    natRuleCollections:
      natRuleCollections?.map(natRuleCollection =>
        formatNatRuleCollection(natRuleCollection)
      ) || [],
    networkRuleCollections:
      networkRuleCollections?.map(networkRuleCollection =>
        formatNetworkRuleCollection(networkRuleCollection)
      ) || [],
    ipConfigurations:
      ipConfigurations?.map(ipConfiguration =>
        formatIpConfiguration(ipConfiguration)
      ) || [],
    managementIpConfiguration: {
      id: managementIpConfiguration?.id,
      name: managementIpConfiguration?.name || '',
      privateIPAddress: managementIpConfiguration?.privateIPAddress || '',
      subnet: managementIpConfiguration?.subnet?.id || '',
      publicIPAddress: managementIpConfiguration?.publicIPAddress?.id || '',
      provisioningState: managementIpConfiguration?.provisioningState || '',
      type: managementIpConfiguration?.type || '',
    },
    provisioningState,
    threatIntelMode,
    virtualHub: virtualHub?.id || '',
    firewallPolicy: firewallPolicy?.id || '',
    hubIPAddresses: {
      publicIPs:
        hubIPAddresses?.publicIPs?.addresses?.map(({ address }) => address) ||
        [],
      privateIPAddress: hubIPAddresses?.privateIPAddress || '',
    },
    ipGroups:
      ipGroups?.map(({ id: ipGroupId, changeNumber }) => {
        return {
          id: ipGroupId,
          changeNumber,
        }
      }) || [],
    additionalProperties: formatAdditionalProperties(additionalProperties),
    zones,
    region,
    tags: formatTagsFromMap(Tags),
  }
}
