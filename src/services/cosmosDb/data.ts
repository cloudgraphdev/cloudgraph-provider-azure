import {
  CosmosDBManagementClient,
  DatabaseAccountGetResults,
} from '@azure/arm-cosmosdb'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'
import { RawAzureCosmosDbAccount, listAzureCosmoDbDatabases, listAzureCosmoDbTables } from './utils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Cosmos DB'

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureCosmosDbAccount[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new CosmosDBManagementClient(
      tokenCredentials,
      subscriptionId
    )
    const databaseAccounts: DatabaseAccountGetResults[] = []
    const databaseAccountIterable: PagedAsyncIterableIterator<DatabaseAccountGetResults> =
      client.databaseAccounts.list()
    await tryCatchWrapper(
      async () => {
        for await (const databaseAccount of databaseAccountIterable) {
          databaseAccount && databaseAccounts.push(databaseAccount)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'databaseAccounts',
        operation: 'list',
      }
    )
    logger.debug(lt.foundCosmosDbAccounts(databaseAccounts.length))

    const result: { [property: string]: RawAzureCosmosDbAccount[] } = {}
    await Promise.all(
      databaseAccounts.map(async ({ name, tags, location, ...rest }) => {
        const region = lowerCaseLocation(location)
        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          const resourceGroupId = getResourceGroupFromEntity(rest)
          result[region].push({
            name,
            region,
            ...rest,
            resourceGroupId,
            Tags: tags || {},
            databases: await listAzureCosmoDbDatabases(client, resourceGroupId, name),
            tables: await listAzureCosmoDbTables(client, resourceGroupId, name)
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
