import { AzureLogProfile } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureLogProfileResource } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureLogProfileResource
  account: string
  region: string
}): AzureLogProfile => {
  const {
    id,
    name,
    type,
    storageAccountId,
    serviceBusRuleId,
    locations = [],
    categories = [],
    retentionPolicy = {},
    Tags: tags = {},
  } = service

  return {
    id,
    name,
    region,
    subscriptionId: account,
    type,
    storageAccountId,
    serviceBusRuleId,
    locations,
    categories,
    retentionPolicy,
    tags: formatTagsFromMap(tags),
  }
}
