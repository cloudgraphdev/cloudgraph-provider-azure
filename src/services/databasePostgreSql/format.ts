import cuid from 'cuid'
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
    resourceGroup,
    charset,
    collation,
  } = service

  return {
    id: id || cuid(),
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroup,
    charset,
    collation,
  }
}
