import { generateUniqueId } from '@cloudgraph/sdk'
import { RawAzureActivityLogAlert } from './data'
import { AzureActivityLogAlert } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureActivityLogAlert
  account: string
}): AzureActivityLogAlert => {
  const {
    id,
    name,
    type,
    region,
    scopes,
    enabled,
    condition,
    actions,
    description,
    Tags = {},
  } = service
  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    scopes,
    enabled,
    condition: {
      allOf: condition?.allOf?.map(leaf => ({
        id: generateUniqueId({ id, ...leaf }),
        field: leaf?.field,
        equals: leaf?.equals,
      })),
    },
    actions: {
      actionGroups: actions?.actionGroups?.map(group => ({
        id: group.actionGroupId,
        actionGroupId: group.actionGroupId,
        webhookProperties: Object.entries(group?.webhookProperties || {}).map(
          ([key, value]) => ({
            id: generateUniqueId({
              id,
              actionGroupId: group.actionGroupId,
              key
            }),
            key,
            value,
          })
        ),
      })),
    },
    description,
    tags: formatTagsFromMap(Tags),
  }
}
