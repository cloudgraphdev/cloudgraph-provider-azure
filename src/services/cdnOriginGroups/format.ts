import { generateUniqueId } from '@cloudgraph/sdk'
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
    resourceGroupId,
  } = service

  return {
    id,
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
      httpErrorRanges:
        settings?.httpErrorRanges?.map(error => ({
          id: generateUniqueId({
            begin: error.begin,
            end: error.end,
          }),
          begin: error.begin,
          end: error.end,
        })) || [],
    },
    resourceState,
    provisioningState,
    resourceGroupId,
  }
}
