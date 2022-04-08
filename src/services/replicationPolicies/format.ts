import { AzureReplicationPolicy } from '../../types/generated'
import { RawAzureReplicationPolicy } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzureReplicationPolicy
  account: string
  region: string
}): AzureReplicationPolicy => {
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
    properties,
  }
}
