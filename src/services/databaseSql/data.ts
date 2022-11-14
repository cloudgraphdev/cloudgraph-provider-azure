import {
  SqlManagementClient,
  Database,
  Server,
  LogicalDatabaseTransparentDataEncryption,
} from '@azure/arm-sql'
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

export interface RawAzureDatabase extends Database {
  serverName: string
}
export interface RawAzureDatabaseSql
  extends Omit<Database, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
  serverName?: string
  transparentDataEncryptions: LogicalDatabaseTransparentDataEncryption[]
}

const listTransparentDataEncryptions = async (
  client: SqlManagementClient,
  resourceGroup: string,
  serverName: string,
  databaseName: string
): Promise<LogicalDatabaseTransparentDataEncryption[]> => {
  const transparentDataEncryptions: LogicalDatabaseTransparentDataEncryption[] =
    []
  const tdeIterable = client.transparentDataEncryptions.listByDatabase(
    resourceGroup,
    serverName,
    databaseName
  )
  await tryCatchWrapper(
    async () => {
      for await (const tde of tdeIterable) {
        if (tde) {
          transparentDataEncryptions.push(tde)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'transparentDataEncryptions',
      operation: 'listByDatabase',
    }
  )
  return transparentDataEncryptions
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDatabaseSql[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new SqlManagementClient(tokenCredentials, subscriptionId)
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

    const databases: RawAzureDatabase[] = []
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
              if (database) {
                databases.push({
                  ...database,
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
    logger.debug(lt.foundDatabaseSql(databases.length))

    const result: { [property: string]: RawAzureDatabaseSql[] } = {}
    await Promise.all(
      databases.map(async ({ tags, location, name, serverName, ...rest }) => {
        const region = lowerCaseLocation(location)
        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          const resourceGroupId = getResourceGroupFromEntity(rest)
          result[region].push({
            ...rest,
            resourceGroupId,
            region,
            transparentDataEncryptions: await listTransparentDataEncryptions(
              client,
              resourceGroupId,
              serverName,
              name
            ),
            Tags: tags || {},
          })
        }
      })
    )
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
