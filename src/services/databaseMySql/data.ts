import { MySQLManagementClient, Database, Server } from '@azure/arm-mysql'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'MySQL Database'

export interface RawAzureDatabaseMySql
  extends Omit<Database, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDatabaseMySql[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new MySQLManagementClient(
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

    const databases: RawAzureDatabaseMySql[] = []
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
              const resourceGroupId = getResourceGroupFromEntity(rest)
              databases.push({
                region: lowerCaseLocation(location),
                ...database,
                resourceGroupId,
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
    logger.debug(lt.foundDatabaseMySql(databases.length))

    const result: { [property: string]: RawAzureDatabaseMySql[] } = {}
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
