import {
  Configuration,
  FirewallRule,
  MySQLManagementClient,
  Server,
  VirtualNetworkRule,
} from '@azure/arm-mysql'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'MySQL Server'

export interface RawAzureMySqlServer extends Omit<Server, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
  configurations: Configuration[]
  firewallRules: FirewallRule[]
  virtualNetworkRules: VirtualNetworkRule[]
}

const listConfigurations = async (
  client: MySQLManagementClient,
  resourceGroup: string,
  serverName: string
): Promise<Configuration[]> => {
  const configurations: Configuration[] = []
  const configurationsIterable = client.configurations.listByServer(
    resourceGroup,
    serverName
  )
  await tryCatchWrapper(
    async () => {
      for await (const configuration of configurationsIterable) {
        if (configuration) {
          configurations.push(configuration)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'configurations',
      operation: 'listByServer',
    }
  )
  return configurations
}

const listFirewallRules = async (
  client: MySQLManagementClient,
  resourceGroup: string,
  serverName: string
): Promise<FirewallRule[]> => {
  const firewallRules: FirewallRule[] = []
  const firewallRuleIterable = client.firewallRules.listByServer(
    resourceGroup,
    serverName
  )
  await tryCatchWrapper(
    async () => {
      for await (const firewallRule of firewallRuleIterable) {
        if (firewallRule) {
          firewallRules.push(firewallRule)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'firewallRules',
      operation: 'listByServer',
    }
  )
  return firewallRules
}

const listVirtualNetworkRules = async (
  client: MySQLManagementClient,
  resourceGroup: string,
  serverName: string
): Promise<VirtualNetworkRule[]> => {
  const virtualNetworkRules: VirtualNetworkRule[] = []
  const virtualNetworkRulesIterable = client.virtualNetworkRules.listByServer(
    resourceGroup,
    serverName
  )
  await tryCatchWrapper(
    async () => {
      for await (const virtualNetworkRule of virtualNetworkRulesIterable) {
        if (virtualNetworkRule) {
          virtualNetworkRules.push(virtualNetworkRule)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'virtualNetworkRules',
      operation: 'listByServer',
    }
  )
  return virtualNetworkRules
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureMySqlServer[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new MySQLManagementClient(tokenCredentials, subscriptionId)
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
    logger.debug(lt.foundMySqlServers(sqlServers.length))

    const result: { [property: string]: RawAzureMySqlServer[] } = {}
    await Promise.all(
      sqlServers.map(async ({ name, location, tags, ...rest }) => {
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
            configurations: await listConfigurations(
              client,
              resourceGroupId,
              name
            ),
            firewallRules: await listFirewallRules(
              client,
              resourceGroupId,
              name
            ),
            virtualNetworkRules: await listVirtualNetworkRules(
              client,
              resourceGroupId,
              name
            ),
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
