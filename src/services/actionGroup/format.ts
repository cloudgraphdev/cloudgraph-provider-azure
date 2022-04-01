import cuid from 'cuid'
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
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    enabled,
    groupShortName,
    emailReceivers: emailReceivers.map(e => ({ id: cuid(), ...e })),
    smsReceivers: smsReceivers.map(s => ({ id: cuid(), ...s })),
    webhookReceivers: webhookReceivers.map(w => ({ id: cuid(), ...w })),
    tags: formatTagsFromMap(Tags),
  }
}
