import cuid from 'cuid'

import { AzureLogAnalyticsSolution } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureLogAnalyticsSolution } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureLogAnalyticsSolution
  account: string
  region: string
}): AzureLogAnalyticsSolution => {
  const {
    id,
    name,
    resourceGroupId,
    plan,
    properties,
    type,
    Tags = {},
  } = service

  return {
    id: id || cuid(),
    name,
    type,
    resourceGroupId,
    subscriptionId: account,
    region,
    plan,
    properties,
    tags: formatTagsFromMap(Tags),
  }
}
