import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureServer } from './data'
import { RawAzureDatabaseSql} from '../databaseSql/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureServer
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName, name: serverName } = service

  /**
   * Find resource group related to this SQL server
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
   * Find SQL databases related to this SQL server
   */
   const sqlDatabases: {
    name: string
    data: { [property: string]: RawAzureDatabaseSql[] }
  } = data.find(({ name }) => name === services.databaseSql)

  if (sqlDatabases?.data?.[region]) {
    const sqlDatabasesInRegion: RawAzureDatabaseSql[] = sqlDatabases.data[
      region
    ].filter(({ serverName: dbSqlServerName}: RawAzureDatabaseSql) =>
      caseInsensitiveEqual(dbSqlServerName, serverName)
    )

    if (!isEmpty(sqlDatabasesInRegion)) {
      for (const sqlDatabase of sqlDatabasesInRegion) {
        connections.push({
          id: sqlDatabase.id,
          resourceType: services.databaseSql,
          relation: 'child',
          field: 'databaseSql',
        })
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
