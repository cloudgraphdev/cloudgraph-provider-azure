import { generateUniqueId } from '@cloudgraph/sdk'
import { RawAzureActionGroup } from './data'
import { AzureActionGroup } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureActionGroup
  account: string
}): AzureActionGroup => {
  const {
    id,
    name,
    type,
    region,
    enabled,
    resourceGroupId,
    groupShortName,
    emailReceivers = [],
    smsReceivers = [],
    webhookReceivers = [],
    Tags = {},
  } = service
  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    enabled,
    groupShortName,
    emailReceivers: emailReceivers.map(e => ({
      id: generateUniqueId({
        id,
        ...e,
      }),
      ...e,
    })),
    smsReceivers: smsReceivers.map(s => ({
      id: generateUniqueId({
        id,
        ...s,
      }),
      ...s,
    })),
    webhookReceivers: webhookReceivers.map(w => ({
      id: generateUniqueId({
        id,
        ...w,
      }),
      ...w,
    })),
    tags: formatTagsFromMap(Tags),
  }
}
