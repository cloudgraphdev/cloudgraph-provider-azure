import cuid from 'cuid'
import {
  ProtectionPolicy,
  Settings,
  SubProtectionPolicy,
  InstantRPAdditionalDetails,
  IaasvmPolicyType,
  SchedulePolicy,
  HourlySchedule,
  DailySchedule,
  WeeklySchedule,
  RetentionPolicy,
  DailyRetentionSchedule,
  WeeklyRetentionSchedule,
  MonthlyRetentionSchedule,
  YearlyRetentionSchedule,
  RetentionDuration,
} from '@azure/arm-recoveryservicesbackup'
import { isEmpty } from 'lodash'
import { RawAzureProtectionPolicyResource } from './data'
import {
  AzureBackupPolicy,
  AzureBackupPolicyProperties,
  AzureBackupPolicySchedulePolicyUnion,
  AzureBackupPolicyRetentionPolicyUnion,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'

export interface RawAzureSchedulePolicy extends SchedulePolicy {
  scheduleFrequencyInMins?: number
  scheduleRunFrequency?: string
  scheduleRunDays?: string[]
  scheduleRunTimes?: Date[]
  hourlySchedule?: HourlySchedule
  scheduleWeeklyFrequency?: number
  dailySchedule?: DailySchedule
  weeklySchedule?: WeeklySchedule
}

export interface RawAzureRetentionPolicy extends RetentionPolicy {
  dailySchedule?: DailyRetentionSchedule
  weeklySchedule?: WeeklyRetentionSchedule
  monthlySchedule?: MonthlyRetentionSchedule
  yearlySchedule?: YearlyRetentionSchedule
  retentionDuration?: RetentionDuration
}

export interface RawAzureSubProtectionPolicy {
  policyType?: string
  schedulePolicy?: RawAzureSchedulePolicy
  retentionPolicy?: RawAzureRetentionPolicy
}

export interface RawAzureProtectedItem extends ProtectionPolicy {
  workLoadType?: string
  settings?: Settings
  subProtectionPolicy?: SubProtectionPolicy[]
  makePolicyConsistent?: boolean
  schedulePolicy?: RawAzureSchedulePolicy
  retentionPolicy?: RawAzureRetentionPolicy
  timeZone?: string
  instantRPDetails?: InstantRPAdditionalDetails
  instantRpRetentionRangeInDays?: number
  policyType?: IaasvmPolicyType
  fabricName?: string
}

const formatSchedulePolicy = (
  schedulePolicy?: RawAzureSchedulePolicy
): AzureBackupPolicySchedulePolicyUnion => {
  if (isEmpty(schedulePolicy)) {
    return {}
  }

  const {
    scheduleRunTimes,
    hourlySchedule,
    dailySchedule,
    weeklySchedule,
    ...rest
  } = schedulePolicy

  return {
    scheduleRunTimes: scheduleRunTimes?.map(t => t?.toISOString()) || [],
    hourlySchedule: {
      interval: hourlySchedule?.interval,
      scheduleWindowStartTime:
        hourlySchedule?.scheduleWindowStartTime?.toISOString(),
      scheduleWindowDuration: hourlySchedule?.scheduleWindowDuration,
    },
    dailySchedule:
      dailySchedule?.scheduleRunTimes?.map(t => t?.toISOString()) || [],
    weeklySchedule: {
      scheduleRunDays: weeklySchedule?.scheduleRunDays,
      scheduleRunTimes: scheduleRunTimes?.map(t => t?.toISOString()) || [],
    },
    ...rest,
  }
}

const formatRetentionPolicy = (
  retentionPolicy?: RawAzureRetentionPolicy
): AzureBackupPolicyRetentionPolicyUnion => {
  if (isEmpty(retentionPolicy)) {
    return {}
  }

  const {
    dailySchedule: retentionDailySchedule,
    weeklySchedule: retentionWeeklySchedule,
    monthlySchedule: retentionMonthlySchedule,
    yearlySchedule: retentionYearlySchedule,
    retentionDuration,
    ...rest
  } = retentionPolicy

  return {
    dailySchedule: {
      retentionTimes:
        retentionDailySchedule?.retentionTimes?.map(t => t?.toISOString()) ||
        [],
      retentionDurationCount: retentionDailySchedule?.retentionDuration?.count,
      retentionDurationType:
        retentionDailySchedule?.retentionDuration?.durationType,
    },
    weeklySchedule: {
      daysOfTheWeek: retentionWeeklySchedule?.daysOfTheWeek,
      retentionTimes:
        retentionWeeklySchedule?.retentionTimes?.map(t => t?.toISOString()) ||
        [],
      retentionDurationCount: retentionWeeklySchedule?.retentionDuration?.count,
      retentionDurationType:
        retentionWeeklySchedule?.retentionDuration?.durationType,
    },
    monthlySchedule: {
      retentionScheduleFormatType:
        retentionMonthlySchedule?.retentionScheduleFormatType,
      retentionScheduleDaily:
        retentionMonthlySchedule?.retentionScheduleDaily?.daysOfTheMonth?.map(
          ({ date, isLast }) => ({ id: cuid(), date, isLast })
        ) || [],
      retentionScheduleWeekly:
        retentionMonthlySchedule?.retentionScheduleWeekly,
      retentionTimes:
        retentionMonthlySchedule?.retentionTimes?.map(t => t?.toISOString()) ||
        [],
      retentionDurationCount:
        retentionMonthlySchedule?.retentionDuration?.count,
      retentionDurationType:
        retentionMonthlySchedule?.retentionDuration?.durationType,
    },
    yearlySchedule: {
      retentionScheduleFormatType:
        retentionYearlySchedule?.retentionScheduleFormatType,
      monthsOfYear: retentionYearlySchedule?.monthsOfYear,
      retentionScheduleDaily:
        retentionYearlySchedule?.retentionScheduleDaily?.daysOfTheMonth?.map(
          ({ date, isLast }) => ({ id: cuid(), date, isLast })
        ) || [],
      retentionScheduleWeekly: retentionYearlySchedule?.retentionScheduleWeekly,
      retentionTimes:
        retentionYearlySchedule?.retentionTimes?.map(t => t?.toISOString()) ||
        [],
      retentionDurationCount: retentionYearlySchedule?.retentionDuration?.count,
      retentionDurationType:
        retentionYearlySchedule?.retentionDuration?.durationType,
    },
    retentionDurationCount: retentionDuration?.count,
    retentionDurationType: retentionDuration?.durationType,
    ...rest,
  }
}

const formatProperties = (
  properties?: RawAzureProtectedItem
): AzureBackupPolicyProperties => {
  if (isEmpty(properties)) {
    return {}
  }
  const { subProtectionPolicy, schedulePolicy, retentionPolicy, ...rest } =
    properties

  return {
    subProtectionPolicy:
      subProtectionPolicy?.map(
        ({
          schedulePolicy: subSchedulePolicy,
          retentionPolicy: subRetentionPolicy,
          ...p
        }) => ({
          id: cuid(),
          schedulePolicy: formatSchedulePolicy(subSchedulePolicy),
          retentionPolicy: formatRetentionPolicy(subRetentionPolicy),
          ...p,
        })
      ) || [],
    schedulePolicy: formatSchedulePolicy(schedulePolicy),
    retentionPolicy: formatRetentionPolicy(retentionPolicy),
    ...rest,
  }
}

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureProtectionPolicyResource
  account: string
}): AzureBackupPolicy => {
  const { id, name, type, region, eTag, properties, resourceGroupId } = service
  return {
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    eTag,
    properties: formatProperties(properties as RawAzureProtectedItem),
  }
}
