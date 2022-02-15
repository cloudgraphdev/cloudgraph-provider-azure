import cuid from 'cuid'
import { RawAzureCdnCustomDomain } from './data'
import { AzureCdnCustomDomain } from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureCdnCustomDomain
  account: string
  region: string
}): AzureCdnCustomDomain => {
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
    resourceState,
    customHttpsProvisioningState,
    customHttpsProvisioningSubstate,
    customHttpsParameters,
    validationData,
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
    hostName,
    resourceState,
    customHttpsProvisioningState,
    customHttpsProvisioningSubstate,
    customHttpsParameters,
    validationData,
    provisioningState,
  }
}
