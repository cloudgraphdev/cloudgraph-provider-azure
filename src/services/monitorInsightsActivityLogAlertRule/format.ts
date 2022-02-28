import cuid from 'cuid'
import isObject from 'lodash/isObject'
import { AzureMonitorInsightsActivityLogAlertRule } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawMonitorInsightsActivityLogAlertRule } from './data'

export default ({
  service,
  account,
}: {
  service: RawMonitorInsightsActivityLogAlertRule
  account
}): AzureMonitorInsightsActivityLogAlertRule => {
  const {
    id,
    name,
    type,
    properties: {
      actions: { actionGroups = [] } = {},
      condition: {
        allOf: rawAllOf = [],
        'odata.type': odataType,
        ...restOfCondition
      } = {},
      description,
      enabled,
      scopes,
    } = {},
    resourceGroupId,
    region,
    Tags,
  } = service

  delete restOfCondition['odata.type']
  const allOf = rawAllOf.map(({ 'odata.type': cOdataType, ...restOfC }) => ({
    id: cuid(),
    odataType: cOdataType,
    ...restOfC,
  }))

  return {
    id: id || cuid(),
    name,
    type,
    subscriptionId: account,
    region,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
    condition: {
      allOf,
      odataType,
      ...restOfCondition,
    },
    actionGroups: actionGroups.map(({ webhookProperties, actionGroupId }) => ({
      id: cuid(),
      actionGroupId,
      webhookProperties: Object.entries(webhookProperties).map(
        ([key, value]) => ({
          id: isObject(value) ? cuid() : `${key}:${value}`,
          key,
          value,
        })
      ),
    })),
    description,
    enabled,
    scopes,
  }
}
