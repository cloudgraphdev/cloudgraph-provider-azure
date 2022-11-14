import { RawAzureCdnOrigin } from './data'
import { AzureCdnOrigin } from '../../types/generated'
import { transformSystemData } from '../../utils/format'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureCdnOrigin
  account: string
  region: string
}): AzureCdnOrigin => {
  const {
    id,
    name,
    type,
    systemData,
    hostName,
    httpPort,
    httpsPort,
    originHostHeader,
    priority,
    weight,
    enabled,
    privateLinkAlias,
    privateLinkResourceId,
    privateLinkLocation,
    privateLinkApprovalMessage,
    resourceState,
    provisioningState,
    privateEndpointStatus,
    resourceGroupId,
  } = service

  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    ...transformSystemData(systemData),
    hostName,
    httpPort,
    httpsPort,
    originHostHeader,
    priority,
    weight,
    enabled,
    privateLinkAlias,
    privateLinkResourceId,
    privateLinkLocation,
    privateLinkApprovalMessage,
    resourceState,
    provisioningState,
    privateEndpointStatus,
    resourceGroupId,
  }
}
