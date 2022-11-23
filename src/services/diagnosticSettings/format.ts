import { generateUniqueId } from '@cloudgraph/sdk'
import { AzureDiagnosticSetting } from '../../types/generated'
import { RawAzureDiagnosticSetting } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDiagnosticSetting
  account: string
  region: string
}): AzureDiagnosticSetting => {
  const {
    id,
    name,
    type,
    storageAccountId,
    serviceBusRuleId,
    eventHubAuthorizationRuleId,
    eventHubName,
    metrics = [],
    logs = [],
    workspaceId,
    logAnalyticsDestinationType,
  } = service

  const evalCategories = (): boolean => {
    const categories = ['Administrative', 'Alert', 'Policy', 'Security'].sort()
    const logCategories = logs
      .filter(({ enabled }) => enabled)
      .map(({ category }) => category)
      .sort()
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < categories.length; i++) {
      if (!logCategories.includes(categories[i])) return false
    }

    return true
  }
  const appropiateCategories = evalCategories()

  return {
    id,
    name,
    region,
    subscriptionId: account,
    type,
    storageAccountId,
    serviceBusRuleId,
    eventHubAuthorizationRuleId,
    eventHubName,
    metrics: metrics.map(
      ({
        retentionPolicy: {
          enabled: retentionPolicyEnabled,
          days: retentionPolicyDays,
        } = {},
        timeGrain,
        category,
        enabled,
      }) => ({
        id: generateUniqueId({
          id,
          category,
        }),
        retentionPolicyEnabled,
        retentionPolicyDays,
        timeGrain,
        category,
        enabled,
      })
    ),
    logs: logs.map(
      ({
        retentionPolicy: {
          enabled: retentionPolicyEnabled,
          days: retentionPolicyDays,
        } = {},
        category,
        enabled,
      }) => ({
        id: generateUniqueId({
          id, category
        }),
        retentionPolicyEnabled,
        retentionPolicyDays,
        category,
        enabled,
      })
    ),
    workspaceId,
    logAnalyticsDestinationType,
    appropiateCategories,
  }
}
