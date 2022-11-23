import { generateUniqueId } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import { BackupPolicy, TriggerContext } from '../../types'
import {
  AzureBackupPolicy,
  AzureBackupPolicyProperties,
  AzureBackupPolicyTriggerContext,
} from '../../types/generated'
import { transformSystemData } from '../../utils/format'
import { RawAzureBackupPolicyResource } from './data'

const formatTrigger = (
  trigger: TriggerContext
): AzureBackupPolicyTriggerContext => {
  if (isEmpty(trigger)) {
    return {}
  }

  return {
    objectType: trigger.objectType,
    schedule: {
      repeatingTimeIntervals: trigger.schedule?.repeatingTimeIntervals,
      timeZone: trigger.schedule?.timeZone,
    },
    taggingCriteria:
      trigger?.taggingCriteria?.map(
        ({ criteria, tagInfo, isDefault, taggingPriority }) => ({
          id: generateUniqueId({
            id: tagInfo?.id,
            tagName: tagInfo?.tagName,
            eTag: tagInfo?.eTag,
          }),
          tagInfo: {
            id: tagInfo?.id,
            tagName: tagInfo?.tagName,
            eTag: tagInfo?.eTag,
          },
          isDefault,
          taggingPriority,
          criteria:
            criteria?.map(
              ({
                daysOfMonth,
                absoluteCriteria,
                daysOfTheWeek,
                monthsOfYear,
                objectType,
                scheduleTimes,
                weeksOfTheMonth,
              }) => ({
                id: generateUniqueId({
                  daysOfMonth,
                  daysOfTheWeek,
                  monthsOfYear,
                  scheduleTimes,
                  weeksOfTheMonth,
                }),
                daysOfMonth:
                  daysOfMonth?.map(d => ({
                    id: generateUniqueId({ date: d.date }),
                    date: d.date,
                    isLast: d.isLast,
                  })) || [],
                absoluteCriteria,
                daysOfTheWeek,
                monthsOfYear,
                objectType,
                scheduleTimes,
                weeksOfTheMonth,
              })
            ) || [],
        })
      ) || [],
  }
}

const formatProperties = (
  properties?: BackupPolicy
): AzureBackupPolicyProperties => {
  if (isEmpty(properties)) {
    return {}
  }

  const { policyRules, datasourceTypes, objectType } = properties

  return {
    datasourceTypes,
    objectType,
    policyRules:
      policyRules?.map(
        ({
          trigger = {},
          lifecycles = [],
          backupParameters = {},
          dataStore = {},
          name,
          objectType: policyRuleObjectType,
          isDefault,
        }) => ({
          id: generateUniqueId({
            name,
            objectType,
          }),
          name,
          objectType: policyRuleObjectType,
          isDefault,
          backupParameters: backupParameters
            ? {
                backupType: backupParameters.backupType,
                objectType: backupParameters.objectType,
              }
            : {},
          dataStore: dataStore
            ? {
                dataStoreType: dataStore.dataStoreType,
                objectType: dataStore.objectType,
              }
            : {},
          trigger: formatTrigger(trigger),
          lifecycles:
            lifecycles?.map(
              ({
                targetDataStoreCopySettings,
                deleteAfter,
                sourceDataStore,
              }) => ({
                id: generateUniqueId({
                  targetDataStoreCopySettings,
                  deleteAfter,
                  sourceDataStore,
                }),
                deleteAfter: deleteAfter
                  ? {
                      duration: deleteAfter.duration,
                      objectType: deleteAfter.objectType,
                    }
                  : {},
                sourceDataStore: sourceDataStore
                  ? {
                      dataStoreType: sourceDataStore.dataStoreType,
                      objectType: sourceDataStore.objectType,
                    }
                  : {},
                targetDataStoreCopySettings:
                  targetDataStoreCopySettings?.map(
                    ({ copyAfter, dataStore: dataStoreCopySettings }) => ({
                      id: generateUniqueId({
                        copyAfter,
                        dataStoreCopySettings,
                      }),
                      copyAfter: copyAfter
                        ? {
                            duration: copyAfter.duration,
                            objectType: copyAfter.objectType,
                          }
                        : {},
                      dataStore: dataStoreCopySettings
                        ? {
                            dataStoreType: dataStoreCopySettings.dataStoreType,
                            objectType: dataStoreCopySettings.objectType,
                          }
                        : {},
                    })
                  ) || [],
              })
            ) || [],
        })
      ) || [],
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
    id,
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    properties: formatProperties(properties),
    ...transformSystemData(systemData),
  }
}
