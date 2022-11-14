import { RawAzureCdnCustomDomain } from './data'
import { AzureCdnCustomDomain } from '../../types/generated'
import { transformSystemData } from '../../utils/format'

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
    systemData,
    hostName,
    resourceState,
    customHttpsProvisioningState,
    customHttpsProvisioningSubstate,
    customHttpsParameters,
    validationData,
    provisioningState,
    resourceGroupId
  } = service

  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    ...transformSystemData(systemData),
    hostName,
    resourceState,
    customHttpsProvisioningState,
    customHttpsProvisioningSubstate,
    customHttpsParameters,
    validationData,
    provisioningState,
    resourceGroupId
  }
}
