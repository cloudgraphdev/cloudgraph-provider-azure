import { AzureReplicationAppliance } from '../../types/generated'
import { RawAzureReplicationAppliance } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzureReplicationAppliance
  account: string
  region: string
}): AzureReplicationAppliance => {
  const {
    id,
    resourceGroupId,
    properties,
  } = service
  
  return {
    id,
    region,
    resourceGroupId,
    subscriptionId,
    properties: {
      providerSpecificDetails: {
        ...properties?.providerSpecificDetails,
      }
    },
  }
}
