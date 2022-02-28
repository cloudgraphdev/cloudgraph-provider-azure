import cuid from 'cuid'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureCdnEndpoint } from './data'
import { AzureCdnEndpoint } from '../../types/generated'
import { AzureDeliveryRuleConditionAction } from '../../types/index'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureCdnEndpoint
  account: string
  region: string
}): AzureCdnEndpoint => {
  const {
    id,
    name,
    type,
    Tags,
    originPath,
    contentTypesToCompress = [],
    originHostHeader,
    isCompressionEnabled,
    isHttpAllowed,
    isHttpsAllowed,
    queryStringCachingBehavior,
    optimizationType,
    probePath,
    geoFilters = [],
    defaultOriginGroup,
    urlSigningKeys,
    deliveryPolicy,
    webApplicationFirewallPolicyLink,
    hostName,
    resourceState,
    provisioningState,
    resourceGroupId
  } = service

  const formatActionParameters = parameters => {
    if (!parameters) return []
    return {
      parameterNameOverride:
        parameters?.parameterNameOverride?.map(p => ({
          id: cuid(),
          paramIndicator: p.paramIndicator,
          paramName: p.paramName,
        })) || [],
      ...parameters,
    }
  }

  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    originPath,
    contentTypesToCompress,
    originHostHeader,
    isCompressionEnabled,
    isHttpAllowed,
    isHttpsAllowed,
    queryStringCachingBehavior,
    optimizationType,
    probePath,
    geoFilters: geoFilters?.map(f => ({
      id: cuid(),
      relativePath: f.relativePath,
      action: f.action,
      countryCodes: f.countryCodes,
    })) || [],
    defaultOriginGroupId: defaultOriginGroup?.id || '',
    urlSigningKeys:
      urlSigningKeys?.map(url => ({
        id: url.keyId,
        keySourceParameters: url.keySourceParameters,
      })) || [],
    deliveryPolicy: {
      description: deliveryPolicy?.description || '',
      rules: deliveryPolicy?.rules?.map(rule => ({
        id: cuid(),
        name: rule.name,
        order: rule.order,
        conditions: rule.conditions?.map(c => ({
          id: cuid(),
          name: c.name,
          parameters: (c as AzureDeliveryRuleConditionAction).parameters,
        })) || [],
        actions: rule.actions?.map(a => ({
          id: cuid(),
          name: a.name,
          parameters: formatActionParameters(
            (a as AzureDeliveryRuleConditionAction).parameters
          ),
        })) || [],
      })) || [],
    },
    webApplicationFirewallPolicyLinkId:
      webApplicationFirewallPolicyLink?.id || '',
    hostName,
    resourceState,
    provisioningState,
    tags: formatTagsFromMap(Tags),
    resourceGroupId
  }
}
