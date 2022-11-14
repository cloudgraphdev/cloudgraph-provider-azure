import cuid from 'cuid'
import isEmpty from 'lodash/isEmpty'
import {
  SiteRecoveryManagementClient,
  VCenter,
} from '@azure/arm-recoveryservices-siterecovery'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import services from '../../enums/services'
import getRecoveryVaultsData, {
  RawAzureRecoveryVault,
} from '../recoveryVaults/data'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ReplicationCenters'

export interface RawAzureReplicationCenter extends VCenter {
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
  [property: string]: RawAzureReplicationCenter[]
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
    const replicationCenters: RawAzureReplicationCenter[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (Object.values(vaults).flat() || []).map(
            async ({ name, resourceGroupId }: RawAzureRecoveryVault) => {
              const client = new SiteRecoveryManagementClient(
                tokenCredentials,
                resourceGroupId,
                subscriptionId,
                name
              )
              const replicationCentersIterable: PagedAsyncIterableIterator<VCenter> =
                client.replicationvCenters.list()
              for await (const center of replicationCentersIterable) {
                if (center) {
                  const { ...rest } = center
                  replicationCenters.push({
                    ...rest,
                    id: cuid(),
                    region: regionMap.global,
                    resourceGroupId,
                  })
                }
              }
            }
          )
        )
      },
      {
        service: serviceName,
        client: clientStub,
        scope: 'replicationvCenters',
        operation: 'list',
      }
    )
    logger.debug(lt.foundReplicationCenters(replicationCenters.length))

    replicationCenters.map(({ region, ...rest }) => {
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
