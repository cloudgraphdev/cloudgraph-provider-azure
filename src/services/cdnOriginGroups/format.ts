import cuid from 'cuid'
import { RawAzureCdnOriginGroup } from './data'
import { AzureCdnOriginGroup } from '../../types/generated'

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
    systemData: {
      createdBy,
      createdByType,
      createdAt,
      lastModifiedBy,
      lastModifiedByType,
      lastModifiedAt,
    } = {},
    healthProbeSettings,
    trafficRestorationTimeToHealedOrNewEndpointsInMinutes,
    responseBasedOriginErrorDetectionSettings: settings,
    resourceState,
    provisioningState,
  } = service

  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    createdBy,
    createdByType,
    createdAt: createdAt?.toISOString(),
    lastModifiedBy,
    lastModifiedByType,
    lastModifiedAt: lastModifiedAt?.toISOString(),
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
  }
}
