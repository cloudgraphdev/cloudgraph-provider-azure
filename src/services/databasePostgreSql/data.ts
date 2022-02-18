import { PostgreSQLManagementClient, Database, Server } from '@azure/arm-postgresql'
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
  resourceGroup: string
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
          sqlServers.push(server)
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
        const resourceGroup = getResourceGroupFromEntity(rest)
        const databaseIterable = client.databases.listByServer(
          resourceGroup,
          name
        )
        await tryCatchWrapper(
          async () => {
            for await (const database of databaseIterable) {
              const resourceGroup = getResourceGroupFromEntity(rest)
              databases.push({
                region: lowerCaseLocation(location),
                ...database,
                resourceGroup,
              })
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
        const resourceGroup = getResourceGroupFromEntity(rest)
        result[region].push({
          region,
          ...rest,
          resourceGroup,
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
