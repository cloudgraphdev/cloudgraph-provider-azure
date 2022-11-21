import { AzureDataLakeStorageAccount } from '../../types/generated'
import { RawAzureDataLakeStorageAccount } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDataLakeStorageAccount
  account: string
  region: string
}): AzureDataLakeStorageAccount => {
  const {
    id,
    name,
    type,
    resourceGroupId,
    suffix,
  } = service

  return {
    id,
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    suffix,
  }
}
