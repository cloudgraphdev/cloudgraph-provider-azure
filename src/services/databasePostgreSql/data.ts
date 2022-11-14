import {
  PostgreSQLManagementClient,
  Database,
  Server,
} from '@azure/arm-postgresql'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'PostgreSQL Database'

export interface RawAzureDatabasePostgreSql
  extends Omit<Database, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  serverName: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDatabasePostgreSql[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new PostgreSQLManagementClient(
      tokenCredentials,
      subscriptionId
    )
    const sqlServers: Server[] = []
    const sqlServerIterable: PagedAsyncIterableIterator<Server> =
      client.servers.list()
    await tryCatchWrapper(
      async () => {
        for await (const server of sqlServerIterable) {
          server && sqlServers.push(server)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'servers',
        operation: 'list',
      }
    )

    const databases: RawAzureDatabasePostgreSql[] = []
    await Promise.all(
      (sqlServers || []).map(async ({ name, location, ...rest }) => {
        const resourceGroupId = getResourceGroupFromEntity(rest)
        const databaseIterable = client.databases.listByServer(
          resourceGroupId,
          name
        )
        await tryCatchWrapper(
          async () => {
            for await (const database of databaseIterable) {
              if (database) {
                databases.push({
                  region: lowerCaseLocation(location),
                  ...database,
                  resourceGroupId,
                  serverName: name,
                })
              }
            }
          },
          {
            service: serviceName,
            client,
            scope: 'databases',
            operation: 'listByServer',
          }
        )
      })
    )
    logger.debug(lt.foundDatabasePostgreSql(databases.length))

    const result: { [property: string]: RawAzureDatabasePostgreSql[] } = {}
    databases.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          region,
          ...rest,
          resourceGroupId,
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
