import {
  BackendAddressPool,
  FrontendIPConfiguration,
  InboundNatPool,
  InboundNatRule,
  LoadBalancingRule,
  OutboundRule,
  Probe,
} from '@azure/arm-network'
import {
  AzureLbBackendAddressPool,
  AzureLbFrontendIpConfiguration,
  AzureLbInboundNatPool,
  AzureLbInboundNatRule,
  AzureLbLoadBalancingRule,
  AzureLbOutboundRule,
  AzureLbProbe,
  AzureLoadBalancer,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureLoadBalancer } from './data'

const formatFrontendIpConfigurations = (
  arr: FrontendIPConfiguration[] = []
): AzureLbFrontendIpConfiguration[] =>
  arr.map(
    ({
      id,
      name,
      etag,
      type,
      inboundNatRules: inboundNatRulesF = [],
      inboundNatPools: inboundNatPoolsF = [],
      outboundRules: outboundRulesF = [],
      loadBalancingRules: loadBalancingRulesF = [],
      privateIPAddress,
      privateIPAllocationMethod,
      privateIPAddressVersion,
      provisioningState,
      zones = [],
      // Skipping the rest of the props because they are going probably be used for connections
      // Candidates: subnet, privateIP and publicIP related props, can point to another gateway load balancer
    }) => ({
      id,
      name,
      etag,
      type,
      inboundNatRules: inboundNatRulesF.map(({ id: iNRFId }) => iNRFId),
      inboundNatPools: inboundNatPoolsF.map(({ id: iNPFId }) => iNPFId),
      outboundRules: outboundRulesF.map(({ id: oPFId }) => oPFId),
      loadBalancingRules: loadBalancingRulesF.map(({ id: lPFId }) => lPFId),
      privateIPAddress,
      privateIPAllocationMethod,
      privateIPAddressVersion,
      provisioningState,
      zones,
    })
  )
const formatBackendAddressPools = (
  arr: BackendAddressPool[] = []
): AzureLbBackendAddressPool[] =>
  arr.map(
    ({
      id,
      name,
      etag,
      type,
      location,
      inboundNatRules: inboundNatRulesB = [],
      loadBalancingRules: loadBalancingRulesF = [],
      outboundRule,
      outboundRules: outboundRulesF = [],
      provisioningState,
      // Skipping the rest of the props because they are going probably be used for connections
      // tunnelInterfaces points to multiple potential load balancers?
      // possible connections to virtual network, subnet, networkInterface
    }) => ({
      id,
      name,
      etag,
      type,
      location,
      inboundNatRules: inboundNatRulesB.map(i => i.id),
      loadBalancingRules: loadBalancingRulesF.map(lb => lb.id),
      ...(outboundRule ? { outboundRule: outboundRule.id } : {}),
      outboundRules: outboundRulesF.map(o => o.id),
      provisioningState,
    })
  )
const formatLoadBalancingRules = (
  arr: LoadBalancingRule[] = []
): AzureLbLoadBalancingRule[] =>
  arr.map(
    ({
      id,
      frontendIPConfiguration,
      backendAddressPool,
      backendAddressPools,
      probe,
      ...rest
    }) => ({
      id,
      ...rest,
    })
  )
const formatProbes = (arr: Probe[]): AzureLbProbe[] =>
  arr.map(({ id, loadBalancingRules, ...rest }) => ({ id, ...rest }))

const formatInboundNatRules = (
  arr: InboundNatRule[]
): AzureLbInboundNatRule[] =>
  arr.map(
    ({
      id,
      frontendIPConfiguration,
      backendIPConfiguration,
      backendAddressPool,
      ...rest
    }) => ({ id, ...rest })
  )

const formatInboundNatPools = (
  arr: InboundNatPool[]
): AzureLbInboundNatPool[] =>
  arr.map(({ id, frontendIPConfiguration, ...rest }) => ({
    id,
    ...rest,
  }))

const formatOutboundRules = (arr: OutboundRule[]): AzureLbOutboundRule[] =>
  arr.map(({ id, frontendIPConfigurations, backendAddressPool, ...rest }) => ({
    id,
    ...rest,
  }))

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureLoadBalancer
  account: string
  region: string
}): AzureLoadBalancer => {
  const {
    id,
    sku: { name: skuName, tier: skuTier } = {},
    etag,
    frontendIPConfigurations = [],
    backendAddressPools = [],
    loadBalancingRules = [],
    probes = [],
    inboundNatRules = [],
    inboundNatPools = [],
    outboundRules = [],
    provisioningState,
    resourceGroupId,
    Tags,
  } = service

  return {
    id,
    subscriptionId: account,
    region,
    resourceGroupId,
    skuName,
    skuTier,
    etag,
    frontendIPConfigurations: formatFrontendIpConfigurations(
      frontendIPConfigurations
    ),
    backendAddressPools: formatBackendAddressPools(backendAddressPools),
    loadBalancingRules: formatLoadBalancingRules(loadBalancingRules),
    probes: formatProbes(probes),
    inboundNatRules: formatInboundNatRules(inboundNatRules),
    inboundNatPools: formatInboundNatPools(inboundNatPools),
    outboundRules: formatOutboundRules(outboundRules),
    provisioningState,
    tags: formatTagsFromMap(Tags),
  }
}
