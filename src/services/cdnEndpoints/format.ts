import { generateUniqueId } from '@cloudgraph/sdk'
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
    resourceGroupId,
  } = service

  const formatActionParameters = parameters => {
    if (!parameters) return []
    return {
      parameterNameOverride:
        parameters?.parameterNameOverride?.map(p => ({
          id: generateUniqueId({
            paramIndicator: p.paramIndicator,
            paramName: p.paramName,
          }),
          paramIndicator: p.paramIndicator,
          paramName: p.paramName,
        })) || [],
      ...parameters,
    }
  }

  return {
    id,
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
    geoFilters:
      geoFilters?.map(f => ({
        id: generateUniqueId({
          relativePath: f.relativePath,
          action: f.action,
          countryCodes: f.countryCodes,
        }),
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
      rules:
        deliveryPolicy?.rules?.map(rule => ({
          id: generateUniqueId({
            name: rule.name,
            order: rule.order,
          }),
          name: rule.name,
          order: rule.order,
          conditions:
            rule.conditions?.map(c => ({
              id: generateUniqueId({
                conditionName: c.name,
                ruleName: rule.name,
                ruleOrder: rule.order,
              }),
              name: c.name,
              parameters: (c as AzureDeliveryRuleConditionAction).parameters,
            })) || [],
          actions:
            rule.actions?.map(a => ({
              id: generateUniqueId({
                actionName: a.name,
                ruleName: rule.name,
                ruleOrder: rule.order,
              }),
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
    resourceGroupId,
  }
}
