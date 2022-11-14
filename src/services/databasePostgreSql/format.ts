import { AzureDatabasePostgreSql } from '../../types/generated'
import { RawAzureDatabasePostgreSql } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDatabasePostgreSql
  account: string
  region: string
}): AzureDatabasePostgreSql => {
  const {
    id,
    name,
    type,
    resourceGroupId,
    charset,
    collation,
  } = service

  return {
    id,
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    charset,
    collation,
  }
}
