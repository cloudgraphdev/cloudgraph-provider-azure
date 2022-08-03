import { SystemData } from '@azure/arm-recoveryservices'

export interface AzureBackupParams {
  backupType?: string
  objectType?: string
}

export interface DataStoreInfoBase {
  dataStoreType?: string
  objectType?: string
}

export interface RetentionTag {
  id?: string
  tagName: string
  eTag?: string
}

export interface Day {
  date?: number
  isLast?: boolean
}

export interface ScheduleBasedBackupCriteria {
  absoluteCriteria?: string[]
  daysOfMonth?: Day[]
  daysOfTheWeek?: string[]
  monthsOfYear?: string[]
  objectType?: string
  scheduleTimes?: string[]
  weeksOfTheMonth?: string[]
}

export interface TaggingCriteria {
  tagInfo?: RetentionTag
  isDefault?: boolean
  taggingPriority?: number
  criteria?: ScheduleBasedBackupCriteria[]
}

export interface BackupSchedule {
  repeatingTimeIntervals: string[]
  timeZone?: string
}

export interface TriggerContext {
  objectType?: string
  schedule?: BackupSchedule
  taggingCriteria?: TaggingCriteria[]
}

export interface AbsoluteOption {
  duration?: string
  objectType?: string
}

export interface TargetCopySetting {
  copyAfter?: AbsoluteOption
  dataStore?: DataStoreInfoBase
}

export interface SourceLifeCycle {
  deleteAfter?: AbsoluteOption
  sourceDataStore?: DataStoreInfoBase
  targetDataStoreCopySettings?: TargetCopySetting[]
}

export interface AzureBackupRule {
  backupParameters?: AzureBackupParams
  dataStore?: DataStoreInfoBase
  name?: string
  objectType?: string
  trigger?: TriggerContext
  isDefault?: boolean
  lifecycles?: SourceLifeCycle[]
}

export interface BackupPolicy {
  datasourceTypes?: string[]
  objectType?: string
  policyRules?: AzureBackupRule[]
}

export interface BackupPolicyResource {
  id?: string
  name?: string
  properties?: BackupPolicy
  systemData?: SystemData
  type?: string
}
