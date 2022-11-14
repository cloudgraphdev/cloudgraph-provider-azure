import { generateUniqueId } from '@cloudgraph/sdk'
import { MetricAlertCriteriaUnion } from '@azure/arm-monitor'
import { RawAzureMetricAlert } from './data'
import {
  AzureMetricAlert,
  AzureMetricAlertCriteria,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'

const formatCriteria = ({
  allOf = [],
  componentId,
  failedLocationCount,
  odataType,
  webTestId,
}: MetricAlertCriteriaUnion): AzureMetricAlertCriteria => {
  return {
    allOf:
      allOf?.map(
        ({
          criterionType,
          name,
          metricName,
          metricNamespace,
          timeAggregation,
          dimensions = [],
          skipMetricValidation,
          operator,
          threshold,
          alertSensitivity,
          failingPeriods = {},
          ignoreDataBefore,
        }) => ({
          id: generateUniqueId({
            name,
            metricName,
            metricNamespace,
            criterionType,
            operator,
          }),
          criterionType,
          name,
          metricName,
          metricNamespace,
          timeAggregation,
          dimensions:
            dimensions?.map(
              ({ name: dName, operator: dOperator, values }, index) => ({
                id: generateUniqueId({
                  name: dName,
                  operator,
                  values,
                  index,
                }),
                name: dName,
                operator: dOperator,
                values,
              })
            ) || [],
          skipMetricValidation,
          operator,
          threshold,
          alertSensitivity,
          failingPeriods,
          ignoreDataBefore,
        })
      ) || [],
    componentId,
    failedLocationCount,
    odataType,
    webTestId,
  }
}

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureMetricAlert
  account: string
}): AzureMetricAlert => {
  const {
    id,
    name,
    type,
    region,
    description,
    severity,
    enabled,
    scopes,
    evaluationFrequency,
    windowSize,
    targetResourceType,
    targetResourceRegion,
    criteria,
    autoMitigate,
    actions = [],
    lastUpdatedTime,
    isMigrated,
    Tags = {},
  } = service
  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    description,
    severity,
    enabled,
    scopes,
    evaluationFrequency,
    windowSize,
    targetResourceType,
    targetResourceRegion,
    criteria: formatCriteria(criteria),
    autoMitigate,
    isMigrated,
    actions:
      actions?.map(({ actionGroupId }, index) => ({
        id: generateUniqueId({
          actionGroupId,
          id,
          index,
        }),
        actionGroupId,
      })) || [],
    lastUpdatedTime: lastUpdatedTime?.toISOString(),
    tags: formatTagsFromMap(Tags),
  }
}
