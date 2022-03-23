import cuid from 'cuid'
import { AzureEventGrid } from '../../types/generated'
import { transformSystemData } from '../../utils/format'
import { RawAzureEventGrid } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureEventGrid
  account: string
  region: string
}): AzureEventGrid => {
  const {
    id,
    name,
    type,
    systemData,
    provisioningState,
    domainName,
    resourceGroupId
  } = service
  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    ...transformSystemData(systemData),
    provisioningState,
    domainName,
    resourceGroupId
  }
}
