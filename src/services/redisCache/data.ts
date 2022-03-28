import { RedisManagementClient, RedisResource } from '@azure/arm-rediscache'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import getResourceGroupData from '../resourceGroup/data'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { getResourceGroupNames, lowerCaseLocation } from '../../utils/format'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'RedisCache'

export interface RawAzureRedisCache 
  extends Omit<RedisResource, 'tags' | 'location'> {
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
  [property: string]: RawAzureRedisCache[]
}> => {
  try {
    const resourceGroups = await getResourceGroupData({
      regions,
      config,
      rawData,
      opts,
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)
    const { tokenCredentials, subscriptionId } = config
    const client = new RedisManagementClient(tokenCredentials, subscriptionId)
    const redisCache: RawAzureRedisCache[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (resourceGroupsNames || []).map(async (rgName: string) => {
            const redisCacheIterable: PagedAsyncIterableIterator<RedisResource> =
              client.redis.listByResourceGroup(rgName)
            for await (const cache of redisCacheIterable) {
              if (cache) {
                const { location, tags, ...rest } = cache
                redisCache.push({
                  ...rest,
                  region: lowerCaseLocation(location),
                  resourceGroupId: rgName,
                  Tags: tags || {},
                })
              }
            }
          })
        )
      },
      {
        service: serviceName,
        client,
        scope: 'redis',
        operation: 'listByResourceGroup',
      }
    )
    logger.debug(lt.foundRedisCaches(redisCache.length))

    redisCache.map(({ region, ...rest }) => {
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
