import { generateUniqueId } from '@cloudgraph/sdk'
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
    id,
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
            id: generateUniqueId({
              id, name: pName,
            }),
            streams,
            samplingFrequencyInSeconds,
            counterSpecifiers,
            name: pName,
          })
        ) || [],
      windowsEventLogs:
        windowsEventLogs?.map(
          ({ streams = [], xPathQueries = [], name: wName }) => ({
            id: generateUniqueId({
              id, name:wName
            }),
            streams,
            xPathQueries,
            name: wName,
          })
        ) || [],
      syslog:
        syslog?.map(({ ...sls }) => ({
          id: generateUniqueId({
            id,
            name: sls.name,
          }),
          ...sls,
        })) || [],
      extensions:
        extensions?.map(({ ...es }) => ({
          id: generateUniqueId({
            id, name: es.name
          }),
          ...es,
        })) || [],
    },
    destinations: {
      azureMonitorMetricsName,
      logAnalyticsDestinations: logAnalyticsDestinations.map(
        ({ workspaceResourceId, workspaceId, name: lADName }) => ({
          id: generateUniqueId({
            id,
            name: lADName
          }),
          workspaceResourceId,
          workspaceId,
          name: lADName,
        })
      ),
    },
    dataFlows: dataFlows.map(({ destinations, streams }) => ({
      id: generateUniqueId({
        id, destinations
      }),
      destinations,
      streams,
    })),
    provisioningState,
  }
}
