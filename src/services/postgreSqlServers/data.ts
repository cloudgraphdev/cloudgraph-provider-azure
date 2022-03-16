import {
  PostgreSQLManagementClient,
  Server,
} from '@azure/arm-postgresql'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'PostgreSQL Server'

export interface RawAzurePostgreSqlServer
  extends Omit<Server, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzurePostgreSqlServer[]
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
    logger.debug(lt.foundPostgreSqlServers(sqlServers.length))

    const result: { [property: string]: RawAzurePostgreSqlServer[] } = {}
    sqlServers.map(({ location, tags, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          region,
          ...rest,
          resourceGroupId,
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
