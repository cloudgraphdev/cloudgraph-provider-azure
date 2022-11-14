import { RawAzureSecurityContact } from './data'
import { AzureSecurityContact } from '../../types/generated'

export default ({
  service,
  account: subscriptionId
}: {
  service : RawAzureSecurityContact
  account: string
}): AzureSecurityContact => {
  const {
    id,
    name,
    type,
    region,
    email,
    phone,
    alertNotifications,
    alertsToAdmins,
  } = service
  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    email,
    phone,
    alertNotifications,
    alertsToAdmins,
  }
}
