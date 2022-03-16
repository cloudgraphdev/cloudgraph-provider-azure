import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzurePostgreSqlServer } from './data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureDatabasePostgreSql } from '../databasePostgreSql/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzurePostgreSqlServer
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName, name } = service

  /**
   * Find resource group related to PostgreSQL Server
   */
  const resourceGroups: {
    name: string
    data: { [property: string]: RawAzureResourceGroup[] }
  } = data.find(({ name }) => name === services.resourceGroup)

  if (resourceGroups?.data?.[region]) {
    const resourceGroupsInRegion: RawAzureResourceGroup[] = resourceGroups.data[
      region
    ].filter(({ name: resourceGroupName }: RawAzureResourceGroup) =>
      caseInsensitiveEqual(resourceGroupName, rgName)
    )

    if (!isEmpty(resourceGroupsInRegion)) {
      for (const rg of resourceGroupsInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.resourceGroup,
          relation: 'child',
          field: 'resourceGroup',
        })
      }
    }
  }

  /**
   * Find PostgreSQL databases related to PostgreSQL Server
   */
   const databases: {
    name: string
    data: { [property: string]: RawAzureDatabasePostgreSql[] }
  } = data.find(({ name }) => name === services.databasePostgreSql)

  if (databases?.data?.[region]) {
    const databasesInRegion: RawAzureDatabasePostgreSql[] = databases.data[
      region
    ].filter(
      ({ serverName }: RawAzureDatabasePostgreSql) => serverName === name
    )

    if (!isEmpty(databasesInRegion)) {
      for (const db of databasesInRegion) {
        connections.push({
          id: db.id,
          resourceType: services.databasePostgreSql,
          relation: 'child',
          field: 'databasePostgreSql',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
