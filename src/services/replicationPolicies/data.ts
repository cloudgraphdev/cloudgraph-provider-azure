import cuid from 'cuid'
import isEmpty from 'lodash/isEmpty'
import { SiteRecoveryManagementClient, Policy } from '@azure/arm-recoveryservices-siterecovery'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import services from '../../enums/services'
import getRecoveryVaultsData, { RawAzureRecoveryVault } from '../recoveryVaults/data'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ReplicationPolicies'

export interface RawAzureReplicationPolicy extends Policy {
  id: string
  resourceGroupId: string
  region: string
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureReplicationPolicy[]
}> => {
  try {
    let vaults: { [property: string]: RawAzureRecoveryVault[] } =
      rawData.find(({ name }) => name === services.recoveryVaults)?.data || {}

    if (isEmpty(vaults)) {
      vaults = await getRecoveryVaultsData({
        regions,
        config,
        rawData,
        opts,
      })
    }

    const { tokenCredentials, subscriptionId } = config
    const clientStub = { constructor: { name: 'SiteRecoveryManagementClient' } }
    const replicationPolicies: RawAzureReplicationPolicy[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (Object.values(vaults).flat() || []).map(async ({ name, resourceGroupId }: RawAzureRecoveryVault) => {
            const client = new SiteRecoveryManagementClient(tokenCredentials, resourceGroupId, subscriptionId, name)
            const replicationPoliciesIterable: PagedAsyncIterableIterator<Policy> =
              client.replicationPolicies.list()
            for await (const policy of replicationPoliciesIterable) {
              if (policy) {
                const { ...rest } = policy
                replicationPolicies.push({
                  ...rest,
                  id: cuid(),
                  region: regionMap.global,
                  resourceGroupId,
                })
              }
            }
          })
        )
      },
      {
        service: serviceName,
        client: clientStub,
        scope: 'replicationPolicies',
        operation: 'list',
      }
    )
    logger.debug(lt.foundReplicationPolicies(replicationPolicies.length))

    replicationPolicies.map(({ region, ...rest }) => {
      result.global.push({
        ...rest,
        region,
      })
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
