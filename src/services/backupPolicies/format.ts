import cuid from 'cuid'
import { isEmpty } from 'lodash'
import {
  AzureBackupPolicy,
  AzureBackupPolicyProperties,
  AzureBackupPolicyTriggerContext
} from '../../types/generated'
import { transformSystemData } from '../../utils/format'
import { RawAzureBackupPolicyResource } from './data'
import { BackupPolicy, TriggerContext } from './utils'

const formatTrigger = (
  trigger: TriggerContext
): AzureBackupPolicyTriggerContext => {
  if (isEmpty(trigger)) {
    return {}
  }

  return {
    ...trigger,
    taggingCriteria:
      trigger?.taggingCriteria?.map(({ criteria, ...tc }) => ({
        id: cuid(),
        criteria:
          criteria?.map(({ daysOfMonth, ...c }) => ({
            id: cuid(),
            daysOfMonth:
              daysOfMonth?.map(d => ({
                id: cuid(),
                ...d,
              })) || [],
            ...c,
          })) || [],
        ...tc,
      })) || [],
  }
}

const formatProperties = (
  properties?: BackupPolicy
): AzureBackupPolicyProperties => {
  if (isEmpty(properties)) {
    return {}
  }

  const { policyRules, ...rest } = properties

  return {
    policyRules:
      policyRules?.map(({ trigger = {}, lifecycles = [], ...r }) => ({
        id: cuid(),
        trigger: formatTrigger(trigger),
        lifecycles:
          lifecycles?.map(({ targetDataStoreCopySettings, ...l }) => ({
            id: cuid(),
            ...l,
            targetDataStoreCopySettings:
              targetDataStoreCopySettings?.map(t => ({
                id: cuid(),
                ...t,
              })) || [],
          })) || [],
        ...r,
      })) || [],
    ...rest,
  }
}

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureBackupPolicyResource
  account: string
}): AzureBackupPolicy => {
  const { id, name, type, region, properties, systemData, resourceGroupId } =
    service
  return {
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    properties: formatProperties(properties),
    ...transformSystemData(systemData),
  }
}
