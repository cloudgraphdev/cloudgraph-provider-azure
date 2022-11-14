import isEmpty from 'lodash/isEmpty'
import { SynapseManagementClient, Workspace, SqlPool } from '@azure/arm-synapse'
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
const serviceName = 'SynapseSqlPools'

export interface RawAzureSynapseSqlPool extends SqlPool {
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
  [property: string]: RawAzureSynapseSqlPool[]
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
    const sqlPools: RawAzureSynapseSqlPool[] = []
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
              const sqlPoolsIterable: PagedAsyncIterableIterator<Workspace> =
                client.sqlPools.listByWorkspace(resourceGroupId, name)
              for await (const sqlPool of sqlPoolsIterable) {
                if (sqlPool) {
                  const { id, tags, ...rest } = sqlPool
                  sqlPools.push({
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
        scope: 'sqlPools',
        operation: 'listByWorkspace',
      }
    )
    logger.debug(lt.foundSynapseSqlPools(sqlPools.length))

    sqlPools.map(({ region, ...rest }) => {
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
