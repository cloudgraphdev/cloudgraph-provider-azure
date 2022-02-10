import cuid from 'cuid'
import { RawAzureCdnOrigin } from './data'
import { AzureCdnOrigin } from '../../types/generated'

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
    systemData: {
      createdBy,
      createdByType,
      createdAt,
      lastModifiedBy,
      lastModifiedByType,
      lastModifiedAt,
    } = {},
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
  }
}
