import cuid from 'cuid'
import { AzureEventGrid } from '../../types/generated'
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
    systemData: {
      createdBy,
      createdByType,
      createdAt,
      lastModifiedBy,
      lastModifiedByType,
      lastModifiedAt,
    } = {},
    provisioningState,
    domainName,
  } = service
  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    createdBy,
    createdByType,
    createdAt: createdAt?.toISOString(),
    lastModifiedBy,
    lastModifiedByType,
    lastModifiedAt: lastModifiedAt?.toISOString(),
    provisioningState,
    domainName,
  }
}
