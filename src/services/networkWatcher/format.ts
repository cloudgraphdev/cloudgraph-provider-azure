import {
  AzureNetworkWatcher,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureNetworkWatcher } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureNetworkWatcher
  account: string
  region: string
}): AzureNetworkWatcher => {
  const {
    id,
    resourceGroupId,
    provisioningState,
    Tags,
  } = service
  return {
    id,
    subscriptionId: account,
    region,
    resourceGroupId,
    provisioningState,
    tags: formatTagsFromMap(Tags),
  }
}
