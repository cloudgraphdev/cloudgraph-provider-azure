import { AzureResourceGroup } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureResourceGroup } from './data'

export default ({
  service,
  account,
}: {
  service: RawAzureResourceGroup
  account: string
}): AzureResourceGroup => {
  const { id, name, type, region, managedBy, Tags } = service
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
