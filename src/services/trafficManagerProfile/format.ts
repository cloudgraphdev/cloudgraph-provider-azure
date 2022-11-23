import { generateUniqueId } from '@cloudgraph/sdk'
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
    id,
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
                id: generateUniqueId({
                  id,
                  customHeadersName,
                  customHeadersValue,
                }),
                name: customHeadersName,
                value: customHeadersValue,
              })
            ) || [],
          expectedStatusCodeRanges:
            monitorConfig.expectedStatusCodeRanges?.map(
              ({ min, max }, index) => ({
                id: generateUniqueId({
                  id,
                  index,
                }),
                min,
                max,
              })
            ) || [],
        }
      : {},
    endpoints:
      endpoints.map(
        ({
          id: endpointId,
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
          id: endpointId,
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
          subnets: subnets.map(({ first, last, scope }, index) => ({
            id: generateUniqueId({
              endpointId,
              index,
            }),
            first,
            last,
            scope,
          })),
          customHeaders:
            customHeaders.map(
              ({ name: customHeadersName, value: customHeadersValue }) => ({
                id: generateUniqueId({ customHeadersName, customHeadersValue }),
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
