import cuid from 'cuid'
import { AzureDatabaseMySql } from '../../types/generated'
import { RawAzureDatabaseMySql } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDatabaseMySql
  account: string
  region: string
}): AzureDatabaseMySql => {
  const {
    id,
    name,
    type,
    resourceGroupId,
    charset,
    collation,
  } = service

  return {
    id: id || cuid(),
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    charset,
    collation,
  }
}
