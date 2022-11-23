import {
  SqlManagementClient,
  Server,
  FirewallRule,
  ServerSecurityAlertPolicy,
  ServerAzureADAdministrator,
  EncryptionProtector,
  ServerBlobAuditingPolicy,
  ServerVulnerabilityAssessment,
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
const serviceName = 'SQL Servers'

export interface RawAzureServer extends Omit<Server, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
  firewallRules: FirewallRule[]
  serverSecurityAlertPolicies: ServerSecurityAlertPolicy[]
  adAdministrators: ServerAzureADAdministrator[]
  encryptionProtectors: EncryptionProtector[]
  serverBlobAuditingPolicies: ServerBlobAuditingPolicy[]
  vulnerabilityAssessments: ServerVulnerabilityAssessment[]
}

const listFirewallRules = async (
  client: SqlManagementClient,
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

const listServerSecurityAlertPolicies = async (
  client: SqlManagementClient,
  resourceGroup: string,
  serverName: string
): Promise<ServerSecurityAlertPolicy[]> => {
  const serverSecurityAlertPolicies: ServerSecurityAlertPolicy[] = []
  const alertPoliciesIterable = client.serverSecurityAlertPolicies.listByServer(
    resourceGroup,
    serverName
  )
  await tryCatchWrapper(
    async () => {
      for await (const alertPolicy of alertPoliciesIterable) {
        if (alertPolicy) {
          serverSecurityAlertPolicies.push(alertPolicy)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'serverSecurityAlertPolicies',
      operation: 'listByServer',
    }
  )
  return serverSecurityAlertPolicies
}

const listADAdministrators = async (
  client: SqlManagementClient,
  resourceGroup: string,
  serverName: string
): Promise<ServerAzureADAdministrator[]> => {
  const adAdministrators: ServerAzureADAdministrator[] = []
  const adAdministratorsIterable =
    client.serverAzureADAdministrators.listByServer(resourceGroup, serverName)
  await tryCatchWrapper(
    async () => {
      for await (const adAdministrator of adAdministratorsIterable) {
        if (adAdministrator) {
          adAdministrators.push(adAdministrator)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'serverAzureADAdministrators',
      operation: 'listByServer',
    }
  )
  return adAdministrators
}

const listEncryptionProtectors = async (
  client: SqlManagementClient,
  resourceGroup: string,
  serverName: string
): Promise<EncryptionProtector[]> => {
  const encryptionProtectors: EncryptionProtector[] = []
  const encryptionProtectorsIterable = client.encryptionProtectors.listByServer(
    resourceGroup,
    serverName
  )
  await tryCatchWrapper(
    async () => {
      for await (const encryptionProtector of encryptionProtectorsIterable) {
        if (encryptionProtector) {
          encryptionProtectors.push(encryptionProtector)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'encryptionProtectors',
      operation: 'listByServer',
    }
  )
  return encryptionProtectors
}

const listServerVulnerabilityAssessments = async (
  client: SqlManagementClient, 
  resourceGroup: string, 
  serverName: string,
): Promise<ServerVulnerabilityAssessment[]> => {
  const databaseVulnerabilityAssessments: ServerVulnerabilityAssessment[] = []
  const vulnerabilityAssessmentIterable = client.serverVulnerabilityAssessments.listByServer(
    resourceGroup,
    serverName,
  )
  await tryCatchWrapper(
    async () => {
      for await (const vulnerabilityAssessment of vulnerabilityAssessmentIterable) {
        if (vulnerabilityAssessment) {
          databaseVulnerabilityAssessments.push(vulnerabilityAssessment)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'serverVulnerabilityAssessments',
      operation: 'listByServer',
    }
  )
  return databaseVulnerabilityAssessments
}

const listServerBlobAuditingPolicies = async (
  client: SqlManagementClient, 
  resourceGroup: string, 
  serverName: string,
): Promise<ServerBlobAuditingPolicy[]> => {
  const serverBlobAuditingPolicies: ServerBlobAuditingPolicy[] = []
  const serverBlobAuditingPolicyIterable = client.serverBlobAuditingPolicies.listByServer(
    resourceGroup,
    serverName,
  )
  await tryCatchWrapper(
    async () => {
      for await (const policy of serverBlobAuditingPolicyIterable) {
        if (policy) {
          serverBlobAuditingPolicies.push(policy)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'serverBlobAuditingPolicies',
      operation: 'listByServer',
    }
  )
  return serverBlobAuditingPolicies
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureServer[]
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
    logger.debug(lt.foundSqlServers(sqlServers.length))

    const result: { [property: string]: RawAzureServer[] } = {}
    await Promise.all(sqlServers.map(async ({ name, tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          name,
          ...rest,
          resourceGroupId,
          region,
          Tags: tags || {},
          firewallRules: await listFirewallRules(client, resourceGroupId, name),
          serverSecurityAlertPolicies: await listServerSecurityAlertPolicies(
            client,
            resourceGroupId,
            name
          ),
          adAdministrators: await listADAdministrators(
            client,
            resourceGroupId,
            name
          ),
          encryptionProtectors: await listEncryptionProtectors(
            client,
            resourceGroupId,
            name
          ),
          serverBlobAuditingPolicies: await listServerBlobAuditingPolicies(
            client,
            resourceGroupId,
            name
          ),
          vulnerabilityAssessments: await listServerVulnerabilityAssessments(
            client, 
            resourceGroupId, 
            name
          ),
        })
      }
    }))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
