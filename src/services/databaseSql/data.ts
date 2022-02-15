import { SqlManagementClient, Database, Server } from '@azure/arm-sql'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'SQL Database'

export interface RawAzureDatabaseSql
  extends Omit<Database, 'tags' | 'location'> {
  region: string
  resourceGroup: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDatabaseSql[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new SqlManagementClient(
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

    const databases: Database[] = []
    await Promise.all(
      (sqlServers || []).map(async ({ name, ...rest }) => {
        const resourceGroup = getResourceGroupFromEntity(rest)
        const databaseIterable = client.databases.listByServer(
          resourceGroup,
          name
        )
        await tryCatchWrapper(
          async () => {
            for await (const database of databaseIterable) {
              databases.push(database)
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
    logger.debug(lt.foundDatabaseSql(databases.length))

    const result: { [property: string]: RawAzureDatabaseSql[] } = {}
    databases.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroup = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          resourceGroup,
          region,
          Tags: tags || {},
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
