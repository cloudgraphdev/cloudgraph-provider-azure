import cuid from 'cuid'
import { RawAzureDataCollectionRule } from './data'
import { AzureDataCollectionRule } from '../../types/generated'
import { formatTagsFromMap, transformSystemData } from '../../utils/format'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureDataCollectionRule
  account: string
}): AzureDataCollectionRule => {
  const {
    id,
    name,
    type,
    region,
    Tags = {},
    etag,
    systemData,
    description,
    immutableId,
    dataSources: {
      performanceCounters = [],
      windowsEventLogs = [],
      syslog = [],
      extensions = [],
    },
    destinations: {
      logAnalytics: logAnalyticsDestinations = [],
      azureMonitorMetrics: { name: azureMonitorMetricsName } = {},
    },
    dataFlows = [],
    provisioningState,
  } = service
  return {
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    tags: formatTagsFromMap(Tags),
    etag,
    ...transformSystemData(systemData),
    description,
    immutableId,
    dataSources: {
      performanceCounters:
        performanceCounters?.map(
          ({
            streams = [],
            samplingFrequencyInSeconds,
            counterSpecifiers = [],
            name: pName,
          }) => ({
            id: cuid(),
            streams,
            samplingFrequencyInSeconds,
            counterSpecifiers,
            name: pName,
          })
        ) || [],
      windowsEventLogs:
        windowsEventLogs?.map(
          ({ streams = [], xPathQueries = [], name: wName }) => ({
            id: cuid(),
            streams,
            xPathQueries,
            name: wName,
          })
        ) || [],
      syslog:
        syslog?.map(({ ...sls }) => ({
          id: cuid(),
          ...sls,
        })) || [],
      extensions:
        extensions?.map(({ ...es }) => ({
          id: cuid(),
          ...es,
        })) || [],
    },
    destinations: {
      azureMonitorMetricsName,
      logAnalyticsDestinations: logAnalyticsDestinations.map(
        ({ workspaceResourceId, workspaceId, name }) => ({
          id: cuid(),
          workspaceResourceId,
          workspaceId,
          name,
        })
      ),
    },
    dataFlows: dataFlows.map(({ destinations, streams }) => ({
      id: cuid(),
      destinations,
      streams,
    })),
    provisioningState,
  }
}
