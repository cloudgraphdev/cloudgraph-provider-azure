import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureMySqlServer } from './data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureDatabaseMySql } from '../databaseMySql/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureMySqlServer
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName, name } = service

  /**
   * Find resource group related to MySQL Server
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
   * Find MySQL databases related to MySQL Server
   */
   const databases: {
    name: string
    data: { [property: string]: RawAzureDatabaseMySql[] }
  } = data.find(({ name }) => name === services.databaseMySql)

  if (databases?.data?.[region]) {
    const databasesInRegion: RawAzureDatabaseMySql[] = databases.data[
      region
    ].filter(
      ({ serverName }: RawAzureDatabaseMySql) => serverName === name
    )

    if (!isEmpty(databasesInRegion)) {
      for (const db of databasesInRegion) {
        connections.push({
          id: db.id,
          resourceType: services.databaseMySql,
          relation: 'child',
          field: 'databaseMySql',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}