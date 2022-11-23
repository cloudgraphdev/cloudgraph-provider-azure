import isEmpty from 'lodash/isEmpty'
import {
  SynapseManagementClient,
  Workspace,
  BigDataPoolResourceInfo,
} from '@azure/arm-synapse'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import services from '../../enums/services'
import getSynapseWorkspacesData, {
  RawAzureSynapseWorkspace,
} from '../synapseWorkspaces/data'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'SynapseBigDataPools'

export interface RawAzureSynapseBigDataPool extends BigDataPoolResourceInfo {
  id: string
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureSynapseBigDataPool[]
}> => {
  try {
    let workspaces: { [property: string]: RawAzureSynapseWorkspace[] } =
      rawData.find(({ name }) => name === services.synapseWorkspaces)?.data ||
      {}

    if (isEmpty(workspaces)) {
      workspaces = await getSynapseWorkspacesData({
        regions,
        config,
        rawData,
        opts,
      })
    }

    const { tokenCredentials, subscriptionId } = config
    const clientStub = { constructor: { name: 'SynapseManagementClient' } }
    const bigDataPools: RawAzureSynapseBigDataPool[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (Object.values(workspaces).flat() || []).map(
            async ({ name, resourceGroupId }: RawAzureSynapseWorkspace) => {
              const client = new SynapseManagementClient(
                tokenCredentials,
                subscriptionId
              )
              const bigDataPoolsIterable: PagedAsyncIterableIterator<Workspace> =
                client.bigDataPools.listByWorkspace(resourceGroupId, name)
              for await (const bigDataPool of bigDataPoolsIterable) {
                if (bigDataPool) {
                  const { id, tags, ...rest } = bigDataPool
                  bigDataPools.push({
                    ...rest,
                    id,
                    region: regionMap.global,
                    resourceGroupId,
                    Tags: tags || {},
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
        scope: 'bigDataPools',
        operation: 'listByWorkspace',
      }
    )
    logger.debug(lt.foundSynapseBigDataPools(bigDataPools.length))

    bigDataPools.map(({ region, ...rest }) => {
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
