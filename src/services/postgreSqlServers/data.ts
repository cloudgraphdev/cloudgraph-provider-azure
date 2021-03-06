import {
  Configuration,
  FirewallRule,
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
  configurations: Configuration[]
  firewallRules: FirewallRule[]
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
    await Promise.all(
      sqlServers.map(async ({ name, location, tags, ...rest }) => {
        const region = lowerCaseLocation(location)
        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          const resourceGroupId = getResourceGroupFromEntity(rest)
          const configurations: Configuration[] = []
          const sqlServerConfigurationsIterable: PagedAsyncIterableIterator<Configuration> =
            client.configurations.listByServer(resourceGroupId, name)
          await tryCatchWrapper(
            async () => {
              for await (const configObj of sqlServerConfigurationsIterable) {
                configurations.push(configObj)
              }
            },
            {
              service: serviceName,
              client,
              scope: 'configurations',
              operation: `listByServer for ${name}`,
            }
          )
          const firewallRules: FirewallRule[] = []
          const sqlServerFirewallRulesIterable: PagedAsyncIterableIterator<FirewallRule> =
            client.firewallRules.listByServer(resourceGroupId, name)
          await tryCatchWrapper(
            async () => {
              for await (const firewallRule of sqlServerFirewallRulesIterable) {
                firewallRules.push(firewallRule)
              }
            },
            {
              service: serviceName,
              client,
              scope: 'firewallRules',
              operation: `listByServer for ${name}`,
            }
          )
          result[region].push({
            name,
            region,
            ...rest,
            resourceGroupId,
            configurations,
            firewallRules,
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
