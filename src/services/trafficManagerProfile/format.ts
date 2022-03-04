import cuid from 'cuid'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureTrafficManagerProfile } from './data'
import { AzureTrafficManagerProfile } from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureTrafficManagerProfile
  account: string
  region: string
}): AzureTrafficManagerProfile => {
  const {
    id,
    name,
    type,
    Tags,
    resourceGroupId,
    profileStatus,
    trafficRoutingMethod,
    dnsConfig,
    monitorConfig = {},
    endpoints = [],
    trafficViewEnrollmentStatus,
    allowedEndpointRecordTypes = [],
    maxReturn,
  } = service
  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    tags: formatTagsFromMap(Tags),
    resourceGroupId,
    profileStatus,
    trafficRoutingMethod,
    dnsConfig,
    monitorConfig: monitorConfig
      ? {
          profileMonitorStatus: monitorConfig.profileMonitorStatus,
          protocol: monitorConfig.protocol,
          port: monitorConfig.port,
          path: monitorConfig.path,
          intervalInSeconds: monitorConfig.intervalInSeconds,
          timeoutInSeconds: monitorConfig.timeoutInSeconds,
          toleratedNumberOfFailures: monitorConfig.toleratedNumberOfFailures,
          customHeaders:
            monitorConfig.customHeaders?.map(
              ({ name: customHeadersName, value: customHeadersValue }) => ({
                id: cuid(),
                name: customHeadersName,
                value: customHeadersValue,
              })
            ) || [],
          expectedStatusCodeRanges:
            monitorConfig.expectedStatusCodeRanges?.map(({ min, max }) => ({
              id: cuid(),
              min,
              max,
            })) || [],
        }
      : {},
    endpoints:
      endpoints.map(
        ({
          targetResourceId,
          target,
          endpointStatus,
          weight,
          priority,
          endpointLocation,
          endpointMonitorStatus,
          minChildEndpoints,
          minChildEndpointsIPv4,
          minChildEndpointsIPv6,
          geoMapping,
          subnets = [],
          customHeaders = [],
        }) => ({
          id: cuid(),
          targetResourceId,
          target,
          endpointStatus,
          weight,
          priority,
          endpointLocation,
          endpointMonitorStatus,
          minChildEndpoints,
          minChildEndpointsIPv4,
          minChildEndpointsIPv6,
          geoMapping,
          subnets: subnets.map(({ first, last, scope }) => ({
            id: cuid(),
            first,
            last,
            scope,
          })),
          customHeaders:
            customHeaders.map(
              ({ name: customHeadersName, value: customHeadersValue }) => ({
                id: cuid(),
                name: customHeadersName,
                value: customHeadersValue,
              })
            ) || [],
        })
      ) || [],
    trafficViewEnrollmentStatus,
    allowedEndpointRecordTypes,
    maxReturn,
  }
}
