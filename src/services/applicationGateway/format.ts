import {
  ApplicationGatewayBackendAddressPool,
  ApplicationGatewayBackendHttpSettings,
  ApplicationGatewayConnectionDraining,
  ApplicationGatewayFirewallDisabledRuleGroup,
  ApplicationGatewayFirewallExclusion,
  ApplicationGatewayHttpListener,
  ApplicationGatewayIPConfiguration,
  ApplicationGatewayLoadDistributionPolicy,
  ApplicationGatewayPathRule,
  ApplicationGatewayPrivateLinkConfiguration,
  ApplicationGatewayPrivateLinkIpConfiguration,
  ApplicationGatewayRedirectConfiguration,
  ApplicationGatewayRequestRoutingRule,
  ApplicationGatewayRewriteRuleSet,
  ApplicationGatewaySslPolicy,
  ApplicationGatewaySslProfile,
  ApplicationGatewayUrlPathMap,
  ApplicationGatewayWebApplicationFirewallConfiguration,
  ApplicationSecurityGroup,
  BackendAddressPool,
  Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties,
  CustomDnsConfigPropertiesFormat,
  Delegation,
  FlowLog,
  FrontendIPConfiguration,
  IPConfiguration,
  IPConfigurationProfile,
  NetworkInterface,
  NetworkInterfaceIPConfiguration,
  NetworkSecurityGroup,
  PrivateEndpoint,
  PrivateEndpointConnection,
  PrivateEndpointIPConfiguration,
  PrivateLinkService,
  PrivateLinkServiceConnection,
  PrivateLinkServiceIpConfiguration,
  PublicIPAddress,
  ResourceNavigationLink,
  SecurityRule,
  ServiceAssociationLink,
  ServiceEndpointPolicy,
  ServiceEndpointPolicyDefinition,
  ServiceEndpointPropertiesFormat,
  Subnet,
  VirtualNetworkTap,
} from '@azure/arm-network'
import cuid from 'cuid'
import {
  AzureApplicationGateway,
  AzureApplicationGatewayApplicationGatewayBackendAddressPool,
  AzureApplicationGatewayUserAssignedIdentities,
  AzureApplicationGatewayVirtualNetworkTap,
  AzureApplicationGatewayNetworkInterfaceIpConfiguration,
  AzureApplicationGatewayIpConfiguration,
  AzureApplicationGatewayPublicIpAddress,
  AzureApplicationGatewaySubnet,
  AzureApplicationGatewayBackendAddressPool,
  AzureApplicationGatewaySecurityRule,
  AzureApplicationGatewayApplicationSecurityGroup,
  AzureApplicationGatewayNetworkSecurityGroup,
  AzureApplicationGatewayNetworkInterface,
  AzureApplicationGatewayPrivateEndpoint,
  AzureApplicationGatewayCustomDnsConfigPropertiesFormat,
  AzureApplicationGatewayPrivateLinkServiceConnection,
  AzureApplicationGatewayPrivateEndpointIpConfiguration,
  AzureApplicationGatewayPrivateLinkService,
  AzureApplicationGatewayPrivateLinkServiceIpConfiguration,
  AzureApplicationGatewayFrontendIpConfiguration,
  AzureApplicationGatewayFlowLog,
  AzureApplicationGatewayServiceEndpointPropertiesFormat,
  AzureApplicationGatewayServiceEndpointPolicy,
  AzureApplicationGatewayServiceEndpointPolicyDefinition,
  AzureApplicationGatewayIpConfigurationProfile,
  AzureApplicationGatewayServiceAssociationLink,
  AzureApplicationGatewayResourceNavigationLink,
  AzureApplicationGatewayDelegation,
  AzureApplicationGatewayApplicationGatewayConnectionDraining,
  AzureApplicationGatewayApplicationGatewayBackendHttpSettings,
  AzureApplicationGatewayApplicationGatewayHttpListener,
  AzureApplicationGatewayApplicationGatewaySslProfile,
  AzureApplicationGatewayApplicationGatewaySslPolicy,
  AzureApplicationGatewayApplicationGatewayPathRule,
  AzureApplicationGatewayApplicationGatewayUrlPathMap,
  AzureApplicationGatewayApplicationGatewayRequestRoutingRule,
  AzureApplicationGatewayApplicationGatewayRewriteRuleSet,
  AzureApplicationGatewayApplicationGatewayRedirectConfiguration,
  AzureApplicationGatewayApplicationGatewayFirewallDisabledRuleGroup,
  AzureApplicationGatewayApplicationGatewayFirewallExclusion,
  AzureApplicationGatewayApplicationGatewayWebApplicationFirewallConfiguration,
  AzureApplicationGatewayApplicationGatewayPrivateEndpointConnection,
  AzureApplicationGatewayApplicationGatewayPrivateLinkConfiguration,
  AzureApplicationGatewayApplicationGatewayPrivateLinkIpConfiguration,
  AzureApplicationGatewayApplicationGatewayLoadDistributionPolicy,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureApplicationGateway } from './data'

export const formatUserAssignedIdentities = (
  userAssignedIdentities?: {
    [propertyName: string]: Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
  }
): AzureApplicationGatewayUserAssignedIdentities[] => {
  const result: AzureApplicationGatewayUserAssignedIdentities[] = []
  for (const [key, value] of Object.entries(userAssignedIdentities)) {
    result.push({ 
      id: `${key}:${value}`, 
      key, 
      property: {
        principalId: value?.principalId,
        clientId: value?.clientId,
      }
    })
  }
  return result
}

export const formatApplicationGatewaySslPolicy = (
  sslPolicy: ApplicationGatewaySslPolicy
): AzureApplicationGatewayApplicationGatewaySslPolicy => {
  return {
    disabledSslProtocols: sslPolicy?.disabledSslProtocols,
    policyType: sslPolicy?.policyType,
    policyName: sslPolicy?.policyName,
    cipherSuites: sslPolicy?.cipherSuites,
    minProtocolVersion: sslPolicy?.minProtocolVersion,
  }
}

export const formatApplicationGatewaySslProfile = (
  profile: ApplicationGatewaySslProfile
): AzureApplicationGatewayApplicationGatewaySslProfile=> {
  return {
    id: profile.id,
    name: profile.name,
    type: profile.type,
    trustedClientCertificates: profile.trustedClientCertificates?.map(c => {return {id: c.id}}) || [],
    sslPolicy: formatApplicationGatewaySslPolicy(profile.sslPolicy),
    clientAuthConfiguration: profile.clientAuthConfiguration?.verifyClientCertIssuerDN,
    provisioningState: profile.provisioningState,
  }
}

export const formatBackendAddressPool = (pool: BackendAddressPool): AzureApplicationGatewayBackendAddressPool | undefined => {
  return {
    id: pool.id,
    name: pool.name,
    type: pool.type,
    location: pool.location,
    tunnelInterfaces: pool.tunnelInterfaces?.map(r => {
      return {
        id: cuid(),
        port: r.port,
        identifier: r.identifier,
        protocol: r.protocol,
        type: r.type,
      }
    }) || [],
    loadBalancerBackendAddresses: pool.loadBalancerBackendAddresses?.map(r => {
      return {
        id: cuid(),
        name: r.name,
        virtualNetwork: r.virtualNetwork?.id,
        subnet: r.subnet?.id,
        ipAddress: r.ipAddress,
        networkInterfaceIPConfiguration: r.networkInterfaceIPConfiguration?.id,
        loadBalancerFrontendIPConfiguration: r.loadBalancerFrontendIPConfiguration?.id,
        inboundNatRulesPortMapping: r.inboundNatRulesPortMapping?.map(m => {
          return {
            id: cuid(),
            inboundNatRuleName: m.inboundNatRuleName,
            frontendPort: m.frontendPort,
            backendPort: m.backendPort,
          }
        }) || []
      }
    }) || [],
    backendIPConfigurations: pool.backendIPConfigurations?.map(config => config),
    loadBalancingRules: pool.loadBalancingRules.map(r => r.id) || [],
    outboundRule: pool.outboundRule?.id,
    outboundRules: pool.outboundRules.map(r => r.id) || [],
    inboundNatRules: pool.inboundNatRules.map(r => r.id) || [],
    provisioningState: pool.provisioningState,
  }
}

export const formatApplicationSecurityGroup = (group: ApplicationSecurityGroup): AzureApplicationGatewayApplicationSecurityGroup => {
  return {
    id: group.id,
    resourceGuid: group.resourceGuid,
    provisioningState: group.provisioningState,
  }
}

export const formatSecurityRule = (securityRule: SecurityRule): AzureApplicationGatewaySecurityRule => {
  return {
    id: securityRule.id,
    name: securityRule.name,
    type: securityRule.type,
    description: securityRule.description,
    protocol: securityRule.protocol,
    sourcePortRange: securityRule.sourcePortRange,
    destinationPortRange: securityRule.destinationPortRange,
    sourceAddressPrefix: securityRule.sourceAddressPrefix,
    sourceAddressPrefixes: securityRule.sourceAddressPrefixes,
    sourceApplicationSecurityGroups: securityRule.sourceApplicationSecurityGroups?.map(
      group => formatApplicationSecurityGroup(group)
    ) || [],
    destinationAddressPrefix: securityRule.destinationAddressPrefix,
    destinationAddressPrefixes: securityRule.destinationAddressPrefixes,
    destinationApplicationSecurityGroups: securityRule.destinationApplicationSecurityGroups?.map(
      group => formatApplicationSecurityGroup(group)
    ) || [],
    sourcePortRanges: securityRule.sourcePortRanges,
    destinationPortRanges: securityRule.destinationPortRanges,
    access: securityRule.access,
    priority: securityRule.priority,
    direction: securityRule.direction,
    provisioningState: securityRule.provisioningState,
  }
}

export const formatPrivateLinkServiceConnection = (
  plsc: PrivateLinkServiceConnection
): AzureApplicationGatewayPrivateLinkServiceConnection => {
  return {
    id: plsc.id,
    name: plsc.name,
    type: plsc.type,
    provisioningState: plsc.provisioningState,
    privateLinkServiceId: plsc.privateLinkServiceId,
    groupIds: plsc.groupIds,
    requestMessage: plsc.requestMessage,
    privateLinkServiceConnectionState: {
      status: plsc.privateLinkServiceConnectionState?.status,
      description: plsc.privateLinkServiceConnectionState?.description,
      actionsRequired: plsc.privateLinkServiceConnectionState?.actionsRequired,
    },
  }
}

export const formatCustomDnsConfigPropertiesFormat = (
  f: CustomDnsConfigPropertiesFormat
): AzureApplicationGatewayCustomDnsConfigPropertiesFormat => {
  return {
    fqdn: f.fqdn,
    ipAddresses: f.ipAddresses,
  }
}

export const formatPrivateEndpointIPConfiguration = (
  pe: PrivateEndpointIPConfiguration
): AzureApplicationGatewayPrivateEndpointIpConfiguration => {
  return {
    name: pe.name,
    type: pe.type,
    groupId: pe.groupId,
    memberName: pe.memberName,
    privateIPAddress: pe.privateIPAddress,
  }
}

export const formatPrivateEndpoint = (pe: PrivateEndpoint): AzureApplicationGatewayPrivateEndpoint => {
  return {
    extendedLocation: {
      name: pe.extendedLocation?.name,
      type: pe.extendedLocation?.type,
    },
    subnet: pe.subnet,
    networkInterfaces: pe.networkInterfaces?.map(ni => ni) || [],
    provisioningState: pe.provisioningState,
    privateLinkServiceConnections: pe.privateLinkServiceConnections?.map(c => formatPrivateLinkServiceConnection(c)) || [],
    manualPrivateLinkServiceConnections: pe.manualPrivateLinkServiceConnections?.map(c => formatPrivateLinkServiceConnection(c)) || [],
    customDnsConfigs: pe.customDnsConfigs?.map(c => formatCustomDnsConfigPropertiesFormat(c)) || [],
    applicationSecurityGroups: pe.applicationSecurityGroups?.map(sg => formatApplicationSecurityGroup(sg)) || [],
    ipConfigurations: pe.ipConfigurations?.map(c => formatPrivateEndpointIPConfiguration(c)) || [],
    customNetworkInterfaceName: pe.customNetworkInterfaceName,
  }
}
export const formatFrontendIPConfiguration = (
  c: FrontendIPConfiguration
): AzureApplicationGatewayFrontendIpConfiguration => {
  return {
    id: c.id,
    name: c.name,
    type: c.type,
    zones: c.zones,
    inboundNatRuleIds: c.inboundNatRules.map(rule => {return {id: rule.id}}),
    inboundNatPools: c.inboundNatPools.map(pool => {return {id: pool.id}}),
    outboundRules: c.outboundRules.map(rule => {return {id: rule.id}}),
    loadBalancingRules: c.loadBalancingRules.map(rule => {return {id: rule.id}}),
    privateIPAddress: c.privateIPAddress,
    privateIPAllocationMethod: c.privateIPAllocationMethod,
    privateIPAddressVersion: c.privateIPAddressVersion,
    subnet: c.subnet,
    publicIPAddress: c.publicIPAddress,
    publicIPPrefix: {id: c.publicIPPrefix?.id},
    gatewayLoadBalancer: {id: c.gatewayLoadBalancer?.id},
    provisioningState: c.provisioningState,
  }
}

export const formatPrivateLinkServiceIpConfiguration = (
  c: PrivateLinkServiceIpConfiguration
): AzureApplicationGatewayPrivateLinkServiceIpConfiguration => {
  return {
    id: c.id,
    name: c.name,
    type: c.type,
    privateIPAddress: c.privateIPAddress,
    privateIPAllocationMethod: c.privateIPAllocationMethod,
    subnet: c.subnet,
    primary: c.primary,
    provisioningState: c.provisioningState,
    privateIPAddressVersion: c.privateIPAddressVersion,
  }
}

export const formatApplicationGatewayPrivateEndpointConnection = (
  c: PrivateEndpointConnection
): AzureApplicationGatewayApplicationGatewayPrivateEndpointConnection => {
  return {
    id: c.id,
    name: c.name,
    type: c.type,
    privateEndpoint: c.privateEndpoint,
    privateLinkServiceConnectionState: c.privateLinkServiceConnectionState,
    provisioningState: c.provisioningState,
    linkIdentifier: c.linkIdentifier,
  }
}

export const formatPrivateLinkService = (pls: PrivateLinkService): AzureApplicationGatewayPrivateLinkService => {
  return {
    id: pls.id,
    extendedLocation: {
      name: pls.extendedLocation?.name,
      type: pls.extendedLocation?.type,
    },
    loadBalancerFrontendIpConfigurations: pls.loadBalancerFrontendIpConfigurations?.map(c => formatFrontendIPConfiguration(c)) || [],
    ipConfigurations: pls.ipConfigurations?.map(c => formatPrivateLinkServiceIpConfiguration(c)) || [],
    networkInterfaces: pls.networkInterfaces?.map(ni => ni) || [],
    provisioningState: pls.provisioningState,
    privateEndpointConnections: pls.privateEndpointConnections?.map(c => formatApplicationGatewayPrivateEndpointConnection(c)) || [],
    visibility: {subscriptions: pls.visibility?.subscriptions},
    autoApproval: {subscriptions: pls.autoApproval?.subscriptions},
    fqdns: pls.fqdns,
    alias: pls.alias,
    enableProxyProtocol: pls.enableProxyProtocol,
  }
}

export const formatNetworkInterface = (ni: NetworkInterface): AzureApplicationGatewayNetworkInterface => {
  return {
    id: ni.id,
    extendedLocation: {
      name: ni.extendedLocation?.name,
      type: ni.extendedLocation?.type,
    },
    virtualMachine: {id: ni.virtualMachine?.id},
    networkSecurityGroup: ni.networkSecurityGroup,
    privateEndpoint: formatPrivateEndpoint(ni.privateEndpoint),
    ipConfigurations: ni.ipConfigurations?.map(config => config) || [],
    tapConfigurations: ni.tapConfigurations?.map(config => config) || [],
    dnsSettings: {
      dnsServers: ni.dnsSettings?.dnsServers,
      appliedDnsServers: ni.dnsSettings?.appliedDnsServers,
      internalDnsNameLabel: ni.dnsSettings?.internalDnsNameLabel,
      internalFqdn: ni.dnsSettings?.internalFqdn,
      internalDomainNameSuffix: ni.dnsSettings?.internalDomainNameSuffix,
    },
    macAddress: ni.macAddress,
    primary: ni.primary,
    vnetEncryptionSupported: ni.vnetEncryptionSupported,
    enableAcceleratedNetworking: ni.enableAcceleratedNetworking,
    enableIPForwarding: ni.enableIPForwarding,
    hostedWorkloads: ni.hostedWorkloads,
    dscpConfiguration: {id: ni.dscpConfiguration?.id},
    resourceGuid: ni.resourceGuid,
    provisioningState: ni.provisioningState,
    workloadType: ni.workloadType,
    nicType: ni.nicType,
    privateLinkService: formatPrivateLinkService(ni.privateLinkService),
    migrationPhase: ni.migrationPhase,
  }
}


export const formatFlowLog = (fl: FlowLog): AzureApplicationGatewayFlowLog => {
  return {
    id: fl.id,
    targetResourceId: fl.targetResourceId,
    targetResourceGuid: fl.targetResourceGuid,
    storageId: fl.storageId,
    enabled: fl.enabled,
    retentionPolicy: {
      days: fl.retentionPolicy?.days,
      enabled: fl.retentionPolicy?.enabled,
    },
    format: {
      type: fl.format?.type,
      version: fl.format?.version,
    },
    flowAnalyticsConfiguration: {
      networkWatcherFlowAnalyticsConfiguration: {
        enabled: fl.flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration?.enabled,
        workspaceId: fl.flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration?.workspaceId,
        workspaceRegion: fl.flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration?.workspaceRegion,
        workspaceResourceId: fl.flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration?.workspaceResourceId,
        trafficAnalyticsInterval: fl.flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration?.trafficAnalyticsInterval,
      },
    },
    provisioningState: fl.provisioningState
  }
}

export const formatNetworkSecurityGroup = (sg: NetworkSecurityGroup): AzureApplicationGatewayNetworkSecurityGroup => {
  return {
    id: sg.id,
    securityRules: sg.securityRules?.map(rule => formatSecurityRule(rule)) || [],
    defaultSecurityRules: sg.defaultSecurityRules?.map(rule => formatSecurityRule(rule)) || [],
    networkInterfaces: sg.networkInterfaces?.map(ni => formatNetworkInterface(ni)),
    subnets: sg.subnets?.map(subnet => subnet) || [],
    flowLogs: sg.flowLogs?.map(fl => formatFlowLog(fl)) || [],
    resourceGuid: sg.resourceGuid,
    provisioningState: sg.provisioningState,
  }
}

export const formatServiceEndpointPropertiesFormat = (
  format: ServiceEndpointPropertiesFormat
): AzureApplicationGatewayServiceEndpointPropertiesFormat => {
  return {
    id: cuid(),
    service: format.service,
    locations: format.locations,
    provisioningState: format.provisioningState,
  }
}

export const formatServiceEndpointPolicyDefinition = (
  def: ServiceEndpointPolicyDefinition
): AzureApplicationGatewayServiceEndpointPolicyDefinition => {
  return {
    id: def.id,
    name: def.name,
    type: def.type,
    description: def.description,
    service: def.service,
    serviceResources: def.serviceResources,
    provisioningState: def.provisioningState,
  }
}

export const formatServiceEndpointPolicy = (sep: ServiceEndpointPolicy): AzureApplicationGatewayServiceEndpointPolicy => {
  return {
    id: sep.id,
    kind: sep.kind,
    serviceEndpointPolicyDefinitions: sep.serviceEndpointPolicyDefinitions?.map(def => formatServiceEndpointPolicyDefinition(def)) || [],
    subnets: sep.subnets?.map(subnet => subnet) || [],
    resourceGuid: sep.resourceGuid,
    provisioningState: sep.provisioningState,
    serviceAlias: sep.serviceAlias,
    contextualServiceEndpointPolicies: sep.contextualServiceEndpointPolicies,
  }
}

export const formatIPConfigurationProfile = (profile: IPConfigurationProfile): AzureApplicationGatewayIpConfigurationProfile => {
  return {
    id: profile.id,
    name: profile.name,
    type: profile.type,
    subnet: profile.subnet,
    provisioningState: profile.provisioningState,
  }
}

export const formatResourceNavigationLink = (link: ResourceNavigationLink): AzureApplicationGatewayResourceNavigationLink => {
  return {
    id: link.id,
    name: link.name,
    type: link.type,
    linkedResourceType: link.linkedResourceType,
    link: link.link,
    provisioningState: link.provisioningState,
  }
}

export const formatServiceAssociationLink = (link: ServiceAssociationLink): AzureApplicationGatewayServiceAssociationLink => {
  return {
    id: link .id,
    name: link.name,
    type: link.type,
    linkedResourceType: link.linkedResourceType,
    link: link.link,
    provisioningState: link.provisioningState,
    allowDelete: link.allowDelete,
    locations: link.locations,
  }
}

export const formatDelegation = (delegation: Delegation): AzureApplicationGatewayDelegation => {
  return {
    id: delegation.id,
    name: delegation.name,
    type: delegation.type,
    serviceName: delegation.serviceName,
    actions: delegation.actions,
    provisioningState: delegation.provisioningState,
  }
}
export const formatApplicationGatewayIPConfiguration = (
  config: ApplicationGatewayIPConfiguration
): AzureApplicationGatewayNetworkInterfaceIpConfiguration => {
  return {
    id: config.id,
    name: config.name,
    type: config.type,
    subnet: config.subnet,
    provisioningState: config.provisioningState,
  }
}

export const formatSubnet = (subnet: Subnet): AzureApplicationGatewaySubnet => {
  return {
    id: subnet.id,
    name: subnet.name,
    type: subnet.type,
    addressPrefix: subnet.addressPrefix,
    addressPrefixes: subnet.addressPrefixes,
    networkSecurityGroup: subnet.networkSecurityGroup ? formatNetworkSecurityGroup(subnet.networkSecurityGroup) : {},
    routeTable: {
      id: subnet.routeTable?.id,
      routes: subnet.routeTable?.routes?.map(route => {
        return {
          id: route.id,
          name: route.name,
          type: route.type,
          addressPrefix: route.addressPrefix,
          nextHopType: route.nextHopType,
          nextHopIpAddress: route.nextHopIpAddress,
          provisioningState: route.provisioningState,
          hasBgpOverride: route.hasBgpOverride,
        }
      }),
      subnets: subnet.routeTable?.subnets?.map(s => formatSubnet(s)),
      disableBgpRoutePropagation: subnet.routeTable?.disableBgpRoutePropagation,
      provisioningState: subnet.routeTable?.provisioningState,
      resourceGuid: subnet.routeTable?.resourceGuid,
    },
    natGateway: {id: subnet.natGateway?.id},
    serviceEndpoints: subnet.serviceEndpoints?.map(e => formatServiceEndpointPropertiesFormat(e)) || [],
    serviceEndpointPolicies: subnet.serviceEndpointPolicies?.map(policy => formatServiceEndpointPolicy(policy)) || [],
    privateEndpoints: subnet.privateEndpoints?.map(endpoint => endpoint) || [],
    ipConfigurations: subnet.ipConfigurations?.map(config => config) || [],
    ipConfigurationProfiles: subnet.ipConfigurationProfiles?.map(profile => formatIPConfigurationProfile(profile)) || [],
    ipAllocations: subnet.ipAllocations?.map(allocation => {
      return {
        id: allocation.id,
      }
    }) || [],
    resourceNavigationLinks: subnet.resourceNavigationLinks?.map(link => formatResourceNavigationLink(link)) || [],
    serviceAssociationLinks: subnet.serviceAssociationLinks?.map(link => formatServiceAssociationLink(link)) || [],
    delegations: subnet.delegations?.map(delegation => formatDelegation(delegation)) || [],
    purpose: subnet.purpose,
    provisioningState: subnet.provisioningState,
    privateEndpointNetworkPolicies: subnet.privateEndpointNetworkPolicies,
    privateLinkServiceNetworkPolicies: subnet.privateLinkServiceNetworkPolicies,
    applicationGatewayIpConfigurations: subnet.applicationGatewayIpConfigurations?.map(
      config => formatApplicationGatewayIPConfiguration(config)
    ) || [],
  }
}

export const formatIPConfiguration = (config: IPConfiguration): AzureApplicationGatewayIpConfiguration => {
  return {
    id: config.id,
    name: config.id,
    privateIPAddress: config.privateIPAddress,
    privateIPAllocationMethod: config.privateIPAllocationMethod,
    subnet: config.subnet ? formatSubnet(config.subnet) : {},
    publicIPAddress: config.publicIPAddress,
    provisioningState: config.provisioningState,
  }
}

const formatVirtualNetworkTap = (tap: VirtualNetworkTap): AzureApplicationGatewayVirtualNetworkTap | undefined => {
  return tap 
    ? {
      id: tap.id,
      name: tap.name,
      type: tap.type,
      networkInterfaceTapConfigurations: tap.networkInterfaceTapConfigurations?.map(
        config => {
          return {
            id: config.id,
            name: config.name,
            type: config.type,
            virtualNetworkTap: formatVirtualNetworkTap(config.virtualNetworkTap),
            provisioningState: config.provisioningState,
          }
        }
      ),
      resourceGuid: tap.resourceGuid,
      destinationNetworkInterfaceIPConfiguration: tap.destinationNetworkInterfaceIPConfiguration,
      destinationLoadBalancerFrontEndIPConfiguration: 
        tap.destinationLoadBalancerFrontEndIPConfiguration 
        ? formatFrontendIPConfiguration(tap.destinationLoadBalancerFrontEndIPConfiguration)
        : {},
      destinationPort: tap.destinationPort,
      provisioningState: tap.provisioningState,
    }
    : undefined
}

const formatPublicIPAddress = (pIp: PublicIPAddress): AzureApplicationGatewayPublicIpAddress | undefined => {
  return pIp
    ? {
      id: pIp.id,
      extendedLocation: {
        name: pIp.extendedLocation?.name,
        type: pIp.extendedLocation?.type,
      },
      zones: pIp.zones,
      publicIPAllocationMethod: pIp.publicIPAllocationMethod,
      publicIPAddressVersion: pIp.publicIPAddressVersion,
      ipConfiguration: pIp.ipConfiguration ? formatIPConfiguration(pIp.ipConfiguration) : undefined,
      dnsDomainNameLabel: pIp.dnsSettings?.domainNameLabel,
      dnsFqdn: pIp.dnsSettings?.fqdn,
      dnsReverseFqdn: pIp.dnsSettings?.reverseFqdn,
      ipTags: pIp.ipTags?.map(tag => {
        return {
          id: cuid(),
          ipTagType: tag.ipTagType,
          tag: tag.tag,
        }
      }) || [],
      ipAddress: pIp.ipAddress,
      publicIPPrefix: {id: pIp.publicIPPrefix?.id},
      idleTimeoutInMinutes: pIp.idleTimeoutInMinutes,
      resourceGuid: pIp.resourceGuid,
      provisioningState: pIp.provisioningState,
      servicePublicIPAddress: pIp.servicePublicIPAddress,
      natGateway: {
        id: pIp.natGateway?.id,
        zones: pIp.natGateway?.zones,
        idleTimeoutInMinutes: pIp.natGateway?.idleTimeoutInMinutes,
        publicIpAddresses: pIp.natGateway?.publicIpAddresses?.map(r => {return {id: r.id}}),
        publicIpPrefixes: pIp.natGateway?.publicIpPrefixes?.map(r => {return {id: r.id}}),
        subnets: pIp.natGateway?.subnets?.map(r => {return {id: r.id}}),
        resourceGuid: pIp.natGateway?.resourceGuid,
        provisioningState: pIp.natGateway?.provisioningState,
      },
      migrationPhase: pIp.migrationPhase,
      linkedPublicIPAddress: pIp.linkedPublicIPAddress,
      deleteOption: pIp.deleteOption,
    }
    : undefined
}

const formatNetworkInterfaceIPConfiguration = (
  config: NetworkInterfaceIPConfiguration
): AzureApplicationGatewayNetworkInterfaceIpConfiguration | undefined => {
  return config 
  ? {
    id: config.id,
    name: config.name,
    type: config.type,
    gatewayLoadBalancer: {id: config.gatewayLoadBalancer?.id},
    virtualNetworkTaps: config.virtualNetworkTaps?.map(
      tap => formatVirtualNetworkTap(tap)
    ),
    applicationGatewayBackendAddressPools: config.applicationGatewayBackendAddressPools?.map(
      p => p
    ) || [],
    loadBalancerBackendAddressPools: config.loadBalancerBackendAddressPools?.map(
      p => formatBackendAddressPool(p)
    ) || [],
    loadBalancerInboundNatRules: config.loadBalancerInboundNatRules?.map(r => {
      return {
        id: r.id,
        name: r.name,
        type: r.type,
        frontendIPConfiguration: {id: r.frontendIPConfiguration?.id},
        backendIPConfiguration: formatNetworkInterfaceIPConfiguration(r.backendIPConfiguration),
        protocol: r.protocol,
        frontendPort: r.frontendPort, 
        backendPort: r.backendPort, 
        idleTimeoutInMinutes: r.idleTimeoutInMinutes, 
        enableFloatingIP: r.enableFloatingIP, 
        enableTcpReset: r.enableTcpReset, 
        frontendPortRangeStart: r.frontendPortRangeStart, 
        frontendPortRangeEnd: r.frontendPortRangeEnd, 
        backendAddressPool: {id: r.backendAddressPool?.id}, 
        provisioningState: r.provisioningState, 
      }
    }) || [],
    privateIPAddress: config.privateIPAddress,
    privateIPAllocationMethod: config.privateIPAllocationMethod,
    privateIPAddressVersion: config.privateIPAddressVersion,
    subnet: config.subnet ? formatSubnet(config.subnet) : {},
    primary: config.primary,
    publicIPAddress: formatPublicIPAddress(config.publicIPAddress),
    applicationSecurityGroups: config.applicationSecurityGroups?.map(
      g => {
        return {
          id: cuid(),
          resourceGuid: g.resourceGuid,
          provisioningState: g.provisioningState,
        }
      }
    ) || [],
    provisioningState: config.provisioningState,
    privateLinkConnectionProperties: {
      groupId: config.privateLinkConnectionProperties?.groupId,
      requiredMemberName: config.privateLinkConnectionProperties?.requiredMemberName,
      fqdns: config.privateLinkConnectionProperties?.fqdns,
    }
  }
  : undefined
}

const formatApplicationGatewayBackendAddressPool = (
  pool: ApplicationGatewayBackendAddressPool
): AzureApplicationGatewayApplicationGatewayBackendAddressPool | undefined => {
  return pool
    ? {
      id: pool.id,
      name: pool.name,
      type: pool.type,
      backendIPConfigurations: pool.backendIPConfigurations?.map(
        c => formatNetworkInterfaceIPConfiguration(c)
      ),
      backendAddresses: pool.backendAddresses?.map(
        a => {
          return {
            id: cuid(),
            fqdn: a.fqdn,
            ipAddress: a.ipAddress,
          }
        }
      ),
      provisioningState: pool.provisioningState,
    }
    : undefined
}

const formatApplicationGatewayConnectionDraining = (
  agcd: ApplicationGatewayConnectionDraining
): AzureApplicationGatewayApplicationGatewayConnectionDraining => {
  return {
    enabled: agcd.enabled,
    drainTimeoutInSec: agcd.drainTimeoutInSec,
  }
}


const formatApplicationGatewayBackendHttpSettings = (
  setting: ApplicationGatewayBackendHttpSettings
): AzureApplicationGatewayApplicationGatewayBackendHttpSettings => {
  return {
    id: setting.id,
    name: setting.name,
    type: setting.type,
    port: setting.port,
    protocol: setting.protocol,
    cookieBasedAffinity: setting.cookieBasedAffinity,
    requestTimeout: setting.requestTimeout,
    probe: {id: setting.probe?.id},
    authenticationCertificates: setting.authenticationCertificates?.map(
      certificate => {return {id: certificate.id}}
    ) || [],
    trustedRootCertificates: setting.trustedRootCertificates?.map(
      certificate => {return {id: certificate.id}}
    ) || [],
    connectionDraining: setting.connectionDraining ? formatApplicationGatewayConnectionDraining(setting.connectionDraining) : {},
    hostName: setting.hostName,
    pickHostNameFromBackendAddress: setting.pickHostNameFromBackendAddress,
    affinityCookieName: setting.affinityCookieName,
    probeEnabled: setting.probeEnabled,
    path: setting.path,
    provisioningState: setting.provisioningState,
  }
}

const formatApplicationGatewayHttpListener = (
  listener: ApplicationGatewayHttpListener
): AzureApplicationGatewayApplicationGatewayHttpListener => {
  return {
    id: listener.id,
    name: listener.name,
    type: listener.type,
    frontendIPConfiguration: {id: listener.frontendIPConfiguration?.id},
    frontendPort: {id: listener.frontendPort?.id},
    protocol: listener.protocol,
    hostName: listener.hostName,
    sslCertificate: {id: listener.sslCertificate?.id},
    sslProfile: {id: listener.sslProfile?.id},
    requireServerNameIndication: listener.requireServerNameIndication,
    provisioningState: listener.provisioningState,
    customErrorConfigurations: listener.customErrorConfigurations?.map(config => {
      return {
        id: cuid(),
        statusCode: config.statusCode,
        customErrorPageUrl: config.customErrorPageUrl,
      }
    }) || [],
    firewallPolicy: {id: listener.firewallPolicy?.id},
    hostNames: listener.hostNames,
  }
}

const formatApplicationGatewayPathRule = (
  map: ApplicationGatewayPathRule
): AzureApplicationGatewayApplicationGatewayPathRule => {
  return {
    id: map.id,
    name: map.name,
    type: map.type,
    paths: map.paths,
    backendAddressPool: {id: map.backendAddressPool?.id},
    backendHttpSettings: {id: map.backendHttpSettings?.id},
    redirectConfiguration: {id: map.redirectConfiguration?.id},
    rewriteRuleSet: {id: map.rewriteRuleSet?.id},
    loadDistributionPolicy: {id: map.loadDistributionPolicy?.id},
    provisioningState: map.provisioningState,
    firewallPolicy: {id: map.firewallPolicy?.id},
  }
}

const formatApplicationGatewayUrlPathMap = (
  map: ApplicationGatewayUrlPathMap
): AzureApplicationGatewayApplicationGatewayUrlPathMap => {
  return {
    id: map.id,
    name: map.name,
    type: map.type,
    defaultBackendAddressPool: {id: map.defaultBackendAddressPool?.id},
    defaultBackendHttpSettings: {id: map.defaultBackendHttpSettings?.id},
    defaultRewriteRuleSet: {id: map.defaultRewriteRuleSet?.id},
    defaultRedirectConfiguration: {id: map.defaultRedirectConfiguration?.id},
    defaultLoadDistributionPolicy: {id: map.defaultLoadDistributionPolicy?.id},
    pathRules: map.pathRules?.map(rule => formatApplicationGatewayPathRule(rule)) || [],
    provisioningState: map.provisioningState,
  }
}

const formatApplicationGatewayRequestRoutingRule = (
  rule: ApplicationGatewayRequestRoutingRule
): AzureApplicationGatewayApplicationGatewayRequestRoutingRule => {
  return {
    id: rule.id,
    name: rule.name,
    type: rule.type,
    ruleType: rule.ruleType,
    priority: rule.priority,
    backendAddressPool: {id: rule.backendAddressPool?.id},
    backendHttpSettings: {id: rule.backendHttpSettings?.id},
    httpListener: {id: rule.httpListener?.id},
    urlPathMap: {id: rule.urlPathMap?.id},
    rewriteRuleSet: {id: rule.rewriteRuleSet?.id},
    redirectConfiguration: {id: rule.redirectConfiguration?.id},
    loadDistributionPolicy: {id: rule.loadDistributionPolicy?.id},
    provisioningState: rule.provisioningState,
  }
}

const formatApplicationGatewayRewriteRuleSet = (
  ruleSet: ApplicationGatewayRewriteRuleSet
): AzureApplicationGatewayApplicationGatewayRewriteRuleSet => {
  return {
    id: ruleSet.id,
    name: ruleSet.name,
    rewriteRules: ruleSet.rewriteRules?.map(rule => formatApplicationGatewayRequestRoutingRule(rule)) || [],
    provisioningState: ruleSet.provisioningState,
  }
}

const formatApplicationGatewayRedirectConfiguration = (
  config: ApplicationGatewayRedirectConfiguration
): AzureApplicationGatewayApplicationGatewayRedirectConfiguration => {
  return {
    id: config.id,
    name: config.name,
    type: config.type,
    redirectType: config.redirectType,
    targetListener: {id: config.targetListener?.id},
    targetUrl: config.targetUrl,
    includePath: config.includePath,
    includeQueryString: config.includeQueryString,
    requestRoutingRules: config.requestRoutingRules?.map(rule => {return {id: rule.id}}) || [],
    urlPathMaps: config.urlPathMaps?.map(map => {return {id: map.id}}) || [],
    pathRules: config.pathRules?.map(rule => {return {id: rule.id}}) || [],
  }
}

const formatApplicationGatewayFirewallDisabledRuleGroup = (
  ruleGroup: ApplicationGatewayFirewallDisabledRuleGroup
): AzureApplicationGatewayApplicationGatewayFirewallDisabledRuleGroup => {
  return {
    id: cuid(),
    ruleGroupName: ruleGroup.ruleGroupName,
    rules: ruleGroup.rules,
  }
}

const formatApplicationGatewayFirewallExclusion = (
  exclusion: ApplicationGatewayFirewallExclusion
): AzureApplicationGatewayApplicationGatewayFirewallExclusion => {
  return {
    id: cuid(),
    matchVariable: exclusion.matchVariable,
    selectorMatchOperator: exclusion.selectorMatchOperator,
    selector: exclusion.selector,
  }
}

const formatApplicationGatewayWebApplicationFirewallConfiguration = (
  config: ApplicationGatewayWebApplicationFirewallConfiguration
): AzureApplicationGatewayApplicationGatewayWebApplicationFirewallConfiguration => {
  return {
    enabled: config.enabled,
    firewallMode: config.firewallMode,
    ruleSetType: config.ruleSetType,
    ruleSetVersion: config.ruleSetVersion,
    disabledRuleGroups: config.disabledRuleGroups?.map(ruleGroup => formatApplicationGatewayFirewallDisabledRuleGroup(ruleGroup)) || [],
    requestBodyCheck: config.requestBodyCheck,
    maxRequestBodySize: config.maxRequestBodySize,
    maxRequestBodySizeInKb: config.maxRequestBodySizeInKb,
    fileUploadLimitInMb: config.fileUploadLimitInMb,
    exclusions: config.exclusions?.map(exclusion => formatApplicationGatewayFirewallExclusion(exclusion)) || [],
  }
}

const formatApplicationGatewayPrivateLinkIpConfiguration = (
  config: ApplicationGatewayPrivateLinkIpConfiguration
): AzureApplicationGatewayApplicationGatewayPrivateLinkIpConfiguration => {
  return {
    id: config.id,
    name: config.name,
    type: config.type,
    privateIPAddress: config.privateIPAddress,
    privateIPAllocationMethod: config.privateIPAllocationMethod,
    subnet: {id: config.subnet?.id},
    primary: config.primary,
    provisioningState: config.provisioningState,
  }
}

const formatApplicationGatewayPrivateLinkConfiguration = (
  config: ApplicationGatewayPrivateLinkConfiguration
): AzureApplicationGatewayApplicationGatewayPrivateLinkConfiguration => {
  return {
    id: config.id,
    name: config.name,
    type: config.type,
    ipConfigurations: config.ipConfigurations?.map(c => formatApplicationGatewayPrivateLinkIpConfiguration(c)) || [],
    provisioningState: config.provisioningState,
  }
}

const formatApplicationGatewayLoadDistributionPolicy = (
  config: ApplicationGatewayLoadDistributionPolicy
): AzureApplicationGatewayApplicationGatewayLoadDistributionPolicy => {
  return {
    id: config.id,
    name: config.name,
    type: config.type,
    loadDistributionTargets: config.loadDistributionTargets?.map(target => {
      return {
        id: target.id,
        name: target.name,
        type: target.type,
        weightPerServer: target.weightPerServer,
        backendAddressPool: {id: target.backendAddressPool?.id},
      }
    }) || [],
    loadDistributionAlgorithm: config.loadDistributionAlgorithm,
    provisioningState: config.provisioningState,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureApplicationGateway
  account: string
  region: string
}): AzureApplicationGateway => {
  const {
    id,
    Tags = {},
    zones,
    identity,
    sslPolicy = {},
    operationalState,
    gatewayIPConfigurations = [],
    authenticationCertificates = [],
    trustedRootCertificates = [],
    trustedClientCertificates = [],
    sslCertificates = [],
    frontendIPConfigurations = [],
    frontendPorts = [],
    probes = [],
    backendAddressPools = [],
    backendHttpSettingsCollection = [],
    httpListeners = [],
    sslProfiles = [],
    urlPathMaps = [],
    requestRoutingRules = [],
    rewriteRuleSets = [],
    redirectConfigurations = [],
    webApplicationFirewallConfiguration,
    firewallPolicy,
    enableHttp2,
    enableFips,
    autoscaleConfiguration,
    privateLinkConfigurations = [],
    privateEndpointConnections = [],
    resourceGuid,
    provisioningState,
    customErrorConfigurations = [],
    forceFirewallPolicyAssociation,
    loadDistributionPolicies = [],
    globalConfiguration,
  } = service

  return {
    id: id || cuid(),
    subscriptionId: account,
    region,
    tags: formatTagsFromMap(Tags),
    zones,
    identity: {
      principalId: identity?.principalId,
      tenantId: identity?.tenantId,
      type: identity?.type,
      userAssignedIdentities: identity?.userAssignedIdentities ? formatUserAssignedIdentities(identity?.userAssignedIdentities) : [],
    },
    sslPolicy: formatApplicationGatewaySslPolicy(sslPolicy),
    operationalState,
    gatewayIPConfigurations: gatewayIPConfigurations.map(
      config => {
        return {
          id: config.id,
          name: config.name,
          type: config.type,
          subnetId: config.subnet?.id,
          provisioningState: config.provisioningState,
        }
      }
    ),
    authenticationCertificates: authenticationCertificates.map(
      c => {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          data: c.data,
          provisioningState: c.provisioningState,
        }
      }
    ),
    trustedRootCertificates: trustedRootCertificates.map(
      c => {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          data: c.data,
          keyVaultSecretId: c.keyVaultSecretId,
          provisioningState: c.provisioningState,
        }
      }
    ),
    trustedClientCertificates: trustedClientCertificates.map(
      c => {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          data: c.data,
          validatedCertData: c.validatedCertData,
          clientCertIssuerDN: c.clientCertIssuerDN,
          provisioningState: c.provisioningState,
        }
      }
    ),
    sslCertificates: sslCertificates.map(
      c => {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          data: c.data,
          password: c.password,
          publicCertData: c.publicCertData,
          keyVaultSecretId: c.keyVaultSecretId,
          provisioningState: c.provisioningState,
        }
      }
    ),
    frontendIPConfigurations: frontendIPConfigurations.map(
      c => {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          privateIPAddress: c.privateIPAddress,
          privateIPAllocationMethod: c.privateIPAllocationMethod,
          subnetId: c.subnet?.id,
          publicIPAddressId: c.publicIPAddress?.id,
          privateLinkConfigurationId: c.privateLinkConfiguration?.id,
          provisioningState: c.provisioningState,
        }
      }
    ),
    frontendPorts: frontendPorts.map(
      c => {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          port: c.port,
          provisioningState: c.provisioningState,
        }
      }
    ),
    probes: probes.map(
      c => {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          protocol: c.protocol,
          host: c.host,
          path: c.path,
          interval: c.interval,
          timeout: c.timeout,
          unhealthyThreshold: c.unhealthyThreshold,
          pickHostNameFromBackendHttpSettings: c.pickHostNameFromBackendHttpSettings,
          minServers: c.minServers,
          matchBody: c.match?.body,
          matchStatusCodes: c.match?.statusCodes,
          port: c.port,
          provisioningState: c.provisioningState,
        }
      }
    ),
    backendAddressPools: backendAddressPools.map(
      pool => formatApplicationGatewayBackendAddressPool(pool)
    ),
    backendHttpSettingsCollection: backendHttpSettingsCollection.map(
      collection => formatApplicationGatewayBackendHttpSettings(collection)
    ),
    httpListeners: httpListeners.map(
      listener => formatApplicationGatewayHttpListener(listener)
    ),
    sslProfiles: sslProfiles.map(
      profile => formatApplicationGatewaySslProfile(profile)
    ),
    urlPathMaps: urlPathMaps.map(
      pathMap => formatApplicationGatewayUrlPathMap(pathMap)
    ),
    requestRoutingRules: requestRoutingRules.map(
      rule => formatApplicationGatewayRequestRoutingRule(rule)
    ),
    rewriteRuleSets: rewriteRuleSets.map(
      ruleSet => formatApplicationGatewayRewriteRuleSet(ruleSet)
    ),
    redirectConfigurations: redirectConfigurations.map(
      config => formatApplicationGatewayRedirectConfiguration(config)
    ),
    webApplicationFirewallConfiguration: 
      webApplicationFirewallConfiguration
      ? formatApplicationGatewayWebApplicationFirewallConfiguration(webApplicationFirewallConfiguration) 
      : {},
    firewallPolicy: firewallPolicy ? {id: firewallPolicy.id} : {},
    enableHttp2,
    enableFips,
    autoscaleConfiguration: {
      minCapacity: autoscaleConfiguration?.minCapacity,
      maxCapacity: autoscaleConfiguration?.maxCapacity,
    },
    privateLinkConfigurations: privateLinkConfigurations.map(c => formatApplicationGatewayPrivateLinkConfiguration(c)),
    privateEndpointConnections: privateEndpointConnections.map(c => formatApplicationGatewayPrivateEndpointConnection(c)),
    resourceGuid,
    provisioningState,
    customErrorConfigurations: customErrorConfigurations?.map(config => {
      return {
        id: cuid(),
        statusCode: config.statusCode,
        customErrorPageUrl: config.customErrorPageUrl,
      }
    }),
    forceFirewallPolicyAssociation,
    loadDistributionPolicies: loadDistributionPolicies?.map(policy => formatApplicationGatewayLoadDistributionPolicy(policy)),
    globalConfiguration,
  }
}
