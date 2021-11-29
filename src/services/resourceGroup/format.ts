import { AzureResourceGroup } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureResourceGroup } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureResourceGroup
  account: string
  region: string
}): AzureResourceGroup => {
  const { id, name, type, managedBy, Tags } = service
  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    managedBy,
    tags: formatTagsFromMap(Tags),
  }
}
