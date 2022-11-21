import isEmpty from 'lodash/isEmpty'
import {
  SiteRecoveryManagementClient,
  ReplicationAppliance,
} from '@azure/arm-recoveryservices-siterecovery'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph, { generateUniqueId } from '@cloudgraph/sdk'
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
const serviceName = 'ReplicationAppliances'

export interface RawAzureReplicationAppliance extends ReplicationAppliance {
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
  [property: string]: RawAzureReplicationAppliance[]
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
    const replicationAppliances: RawAzureReplicationAppliance[] = []
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
              const replicationAppliancesIterable: PagedAsyncIterableIterator<ReplicationAppliance> =
                client.replicationAppliances.list()
              for await (const replicationAppliance of replicationAppliancesIterable) {
                if (replicationAppliance) {
                  const { ...rest } = replicationAppliance
                  replicationAppliances.push({
                    ...rest,
                    id: generateUniqueId({
                      ...rest,
                      region: regionMap.global,
                      resourceGroupId,
                    }),
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
        scope: 'replicationAppliances',
        operation: 'list',
      }
    )
    logger.debug(lt.foundReplicationAppliances(replicationAppliances.length))

    replicationAppliances.map(({ region, ...rest }) => {
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
