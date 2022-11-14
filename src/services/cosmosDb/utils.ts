import {
  CosmosDBManagementClient,
  DatabaseAccountGetResults,
  OptionsResource,
} from '@azure/arm-cosmosdb'
import { tryCatchWrapper } from '../../utils'
import { TagMap } from '../../types'

const serviceName = 'Cosmos DB'

export interface RawAzureCosmosDbDatabaseData {
  id: string
  name: string
  type: string
}

export interface RawAzureCosmosDbDatabaseProperties {
  id: string
  rid?: string
  ts?: number
  etag?: string
}

export interface RawAzureCosmosDbTable {
  id: string
  name: string
  type: string
  options: OptionsResource
  resource: RawAzureCosmosDbDatabaseProperties
}

export interface RawAzureCosmosDbDatabase extends RawAzureCosmosDbTable {
  data: RawAzureCosmosDbDatabaseData[]
}

export interface RawAzureCosmosDbAccount
  extends Omit<DatabaseAccountGetResults, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
  databases?: RawAzureCosmosDbDatabase[]
  tables?: RawAzureCosmosDbTable[]
}

export const listSqlDatabases = async (
  client: CosmosDBManagementClient,
  resourceGroup: string,
  databaseAccountName: string
): Promise<RawAzureCosmosDbDatabase[]> => {
  const sqlDatabases: RawAzureCosmosDbDatabase[] = []
  const sqlDatabasesIterable = client.sqlResources.listSqlDatabases(
    resourceGroup,
    databaseAccountName
  )
  await tryCatchWrapper(
    async () => {
      for await (const sqlDatabase of sqlDatabasesIterable) {
        if (sqlDatabase) {
          const containers: RawAzureCosmosDbDatabaseData[] = []
          const containersIterable = client.sqlResources.listSqlContainers(
            resourceGroup,
            databaseAccountName,
            sqlDatabase.name
          )
          for await (const container of containersIterable) {
            if (container) {
              const { id, name, type } = container
              containers.push({
                id,
                name,
                type,
              } as RawAzureCosmosDbDatabaseData)
            }
          }
          const { resource, ...rest } = sqlDatabase
          const { id, rid, ts, etag } = resource
          sqlDatabases.push({
            ...rest,
            resource: {
              id,
              rid,
              ts,
              etag,
            } as RawAzureCosmosDbDatabaseProperties,
            data: containers,
          } as RawAzureCosmosDbDatabase)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'sqlResources',
      operation: 'listSqlDatabases',
    }
  )
  return sqlDatabases
}

export const listMongoDBDatabases = async (
  client: CosmosDBManagementClient,
  resourceGroup: string,
  databaseAccountName: string
): Promise<RawAzureCosmosDbDatabase[]> => {
  const mongoDbDatabases: RawAzureCosmosDbDatabase[] = []
  const mongoDbDatabasesIterable = client.mongoDBResources.listMongoDBDatabases(
    resourceGroup,
    databaseAccountName
  )
  await tryCatchWrapper(
    async () => {
      for await (const mongoDb of mongoDbDatabasesIterable) {
        if (mongoDb) {
          const collections: RawAzureCosmosDbDatabaseData[] = []
          const collectionsIterable =
            client.mongoDBResources.listMongoDBCollections(
              resourceGroup,
              databaseAccountName,
              mongoDb.name
            )
          for await (const collection of collectionsIterable) {
            if (collection) {
              const { id, name, type } = collection
              collections.push({
                id,
                name,
                type,
              } as RawAzureCosmosDbDatabaseData)
            }
          }
          const { resource, ...rest } = mongoDb
          const { id, rid, ts, etag } = resource
          mongoDbDatabases.push({
            ...rest,
            resource: {
              id,
              rid,
              ts,
              etag,
            } as RawAzureCosmosDbDatabaseProperties,
            data: collections,
          } as RawAzureCosmosDbDatabase)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'mongoDBResources',
      operation: 'listMongoDBDatabases',
    }
  )
  return mongoDbDatabases
}

export const listGremlinDatabases = async (
  client: CosmosDBManagementClient,
  resourceGroup: string,
  databaseAccountName: string
): Promise<RawAzureCosmosDbDatabase[]> => {
  const gremlinDatabases: RawAzureCosmosDbDatabase[] = []
  const gremlinDatabasesIterable = client.gremlinResources.listGremlinDatabases(
    resourceGroup,
    databaseAccountName
  )
  await tryCatchWrapper(
    async () => {
      for await (const gremlinDatabase of gremlinDatabasesIterable) {
        if (gremlinDatabase) {
          const graphs: RawAzureCosmosDbDatabaseData[] = []
          const graphsIterable = client.gremlinResources.listGremlinGraphs(
            resourceGroup,
            databaseAccountName,
            gremlinDatabase.name
          )
          for await (const graph of graphsIterable) {
            if (graph) {
              const { id, name, type } = graph
              graphs.push({ id, name, type } as RawAzureCosmosDbDatabaseData)
            }
          }
          const { resource, ...rest } = gremlinDatabase
          const { id, rid, ts, etag } = resource
          gremlinDatabases.push({
            ...rest,
            resource: {
              id,
              rid,
              ts,
              etag,
            } as RawAzureCosmosDbDatabaseProperties,
            data: graphs,
          } as RawAzureCosmosDbDatabase)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'gremlinResources',
      operation: 'listGremlinDatabases',
    }
  )
  return gremlinDatabases
}

export const listCassandraKeyspaces = async (
  client: CosmosDBManagementClient,
  resourceGroup: string,
  databaseAccountName: string
): Promise<RawAzureCosmosDbDatabase[]> => {
  const keyspaces: RawAzureCosmosDbDatabase[] = []
  const keyspacesIterable = client.cassandraResources.listCassandraKeyspaces(
    resourceGroup,
    databaseAccountName
  )
  await tryCatchWrapper(
    async () => {
      for await (const keyspace of keyspacesIterable) {
        if (keyspace) {
          const tables: RawAzureCosmosDbDatabaseData[] = []
          const tablesIterable = client.cassandraResources.listCassandraTables(
            resourceGroup,
            databaseAccountName,
            keyspace.name
          )
          for await (const table of tablesIterable) {
            if (table) {
              const { id, name, type } = table
              tables.push({ id, name, type } as RawAzureCosmosDbDatabaseData)
            }
          }
          const { resource, ...rest } = keyspace
          const { id, rid, ts, etag } = resource
          keyspaces.push({
            ...rest,
            resource: {
              id,
              rid,
              ts,
              etag,
            } as RawAzureCosmosDbDatabaseProperties,
            data: tables,
          } as RawAzureCosmosDbDatabase)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'cassandraResources',
      operation: 'listCassandraKeyspaces',
    }
  )
  return keyspaces
}

export const listAzureCosmoDbTables = async (
  client: CosmosDBManagementClient,
  resourceGroup: string,
  databaseAccountName: string
): Promise<RawAzureCosmosDbTable[]> => {
  const tables: RawAzureCosmosDbTable[] = []
  const tablesIterable = client.tableResources.listTables(
    resourceGroup,
    databaseAccountName
  )
  await tryCatchWrapper(
    async () => {
      for await (const table of tablesIterable) {
        if (table) {
          const { resource, ...rest } = table
          const { id, rid, ts, etag } = resource
          tables.push({
            ...rest,
            resource: {
              id,
              rid,
              ts,
              etag,
            } as RawAzureCosmosDbDatabaseProperties,
          } as RawAzureCosmosDbTable)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'tableResources',
      operation: 'listTables',
    }
  )
  return tables
}

export const listAzureCosmoDbDatabases = async (
  client: CosmosDBManagementClient,
  resourceGroup: string,
  accountName: string
): Promise<RawAzureCosmosDbDatabase[]> => {
  const databasesPromises = []
  databasesPromises.push(listSqlDatabases(client, resourceGroup, accountName))
  databasesPromises.push(
    listMongoDBDatabases(client, resourceGroup, accountName)
  )
  databasesPromises.push(
    listGremlinDatabases(client, resourceGroup, accountName)
  )
  databasesPromises.push(
    listCassandraKeyspaces(client, resourceGroup, accountName)
  )
  const databases: RawAzureCosmosDbDatabase[] = await Promise.all(
    databasesPromises
  )
  return databases?.reduce((acc, val) => acc.concat(val), []) || []
}
