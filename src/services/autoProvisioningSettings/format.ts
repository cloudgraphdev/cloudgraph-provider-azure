import { RawAzureAutoProvisioningSetting } from './data'
import { AzureAutoProvisioningSetting } from '../../types/generated'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureAutoProvisioningSetting
  account: string
}): AzureAutoProvisioningSetting => {
  const { id, name, type, region, autoProvision } = service
  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    autoProvision,
  }
}
