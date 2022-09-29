import { ApplicationSecurityGroup, SecurityRule } from '@azure/arm-network'
import cuid from 'cuid'
import {
  AzureNetworkSecurityGroup,
  AzureNetworkSecurityGroupApp,
  AzureNetworkSecurityGroupRule,
  AzureNetworkSecurityGroupFlowLog,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureNetworkSecurityGroup, RawAzureFlowLog } from './data'

const normalizeApplicationSecurityGroups = (
  asgArr: Array<ApplicationSecurityGroup>
): Array<AzureNetworkSecurityGroupApp> =>
  asgArr.map(({ id: asgId, ...restData }) => ({
    id: asgId || cuid(),
    ...restData,
  }))

const normalizeSecurityRules = (
  sgArr: Array<SecurityRule>
): Array<AzureNetworkSecurityGroupRule> =>
  sgArr.map(
    ({
      id: sgId,
      sourceApplicationSecurityGroups: sASG = [],
      destinationApplicationSecurityGroups: dASG = [],
      ...dataSR
    }) => ({
      id: sgId || cuid(),
      ...dataSR,
      destinationAppSecurityGroups:
        normalizeApplicationSecurityGroups(dASG),
      sourceAppSecurityGroups: normalizeApplicationSecurityGroups(sASG),
    })
  )

const normalizeFlowLogs = (
  flowLogs: Array<RawAzureFlowLog>
): Array<AzureNetworkSecurityGroupFlowLog> =>
  flowLogs.map(
    ({
      id: flowLogId,
      name,
      type,
      etag,
      targetResourceId,
      targetResourceGuid,
      storageId,
      Tags: flowLogTags,
      retentionPolicy,
      enabled,
      provisioningState,
      format,
      flowAnalyticsConfiguration,
    }) => ({
      id: flowLogId || cuid(),
      name,
      type,
      etag,
      targetResourceId,
      targetResourceGuid,
      storageId,
      enabled,
      provisioningState,
      retentionPolicyDays: retentionPolicy?.days,
      retentionPolicyEnabled: retentionPolicy?.enabled,
      formatType: format?.type,
      formatVersion: format?.version,
      networkWatcherFlowAnalyticsConfiguration: {
        enabled:
          flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration
            ?.enabled,
        workspaceId:
          flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration
            ?.workspaceId,
        workspaceRegion:
          flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration
            ?.workspaceRegion,
        workspaceResourceId:
          flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration
            ?.workspaceResourceId,
        trafficAnalyticsInterval:
          flowAnalyticsConfiguration?.networkWatcherFlowAnalyticsConfiguration
            ?.trafficAnalyticsInterval,
      },
      tags: formatTagsFromMap(flowLogTags),
    })
  )

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzureNetworkSecurityGroup
  account: string
  region: string
}): AzureNetworkSecurityGroup => {
  const {
    id,
    name,
    type,
    resourceGuid,
    provisioningState,
    securityRules = [],
    defaultSecurityRules = [],
    etag,
    resourceGroupId,
    Tags,
    flowLogs = [],
  } = service
  return {
    id: id || cuid(),
    subscriptionId,
    name,
    type,
    region,
    resourceGuid,
    resourceGroupId,
    provisioningState,
    securityRules: normalizeSecurityRules(securityRules),
    defaultSecurityRules: normalizeSecurityRules(defaultSecurityRules),
    etag,
    tags: formatTagsFromMap(Tags),
    flowLogs: normalizeFlowLogs(flowLogs) || [],
  }
}
