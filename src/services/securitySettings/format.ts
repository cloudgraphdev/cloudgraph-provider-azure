import { RawAzureSecuritySetting } from './data'
import { AzureSecuritySetting } from '../../types/generated'

export default ({
  service,
  account: subscriptionId
}: {
  service : RawAzureSecuritySetting
  account: string
}): AzureSecuritySetting => {
  const {
    id,
    name,
    kind,
    type,
    region,
    enabled
  } = service
  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    kind,
    enabled
  }
}
