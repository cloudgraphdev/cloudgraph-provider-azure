import cuid from 'cuid'
import { RawAzureCdnOriginGroup } from './data'
import { AzureCdnOriginGroup } from '../../types/generated'
import { transformSystemData } from '../../utils/format'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureCdnOriginGroup
  account: string
  region: string
}): AzureCdnOriginGroup => {
  const {
    id,
    name,
    type,
    systemData,
    healthProbeSettings,
    trafficRestorationTimeToHealedOrNewEndpointsInMinutes,
    responseBasedOriginErrorDetectionSettings: settings,
    resourceState,
    provisioningState,
    resourceGroupId
  } = service

  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    ...transformSystemData(systemData),
    healthProbeSettings,
    trafficRestorationTimeToHealedOrNewEndpointsInMinutes,
    responseBasedOriginErrorDetectionSettings: {
      responseBasedDetectedErrorTypes:
        settings?.responseBasedDetectedErrorTypes,
      responseBasedFailoverThresholdPercentage:
        settings?.responseBasedFailoverThresholdPercentage,
      httpErrorRanges: settings?.httpErrorRanges?.map(error => ({
        id: cuid(),
        begin: error.begin,
        end: error.end,
      })) || [],
    },
    resourceState,
    provisioningState,
    resourceGroupId
  }
}
