import CloudGraph from '@cloudgraph/sdk'
import { MonitorClient, LogProfileResource } from '@azure/arm-monitor'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Log Profiles'

export interface RawAzureLogProfileResource
  extends Omit<LogProfileResource, 'location' | 'tags'> {
  region: string
  Tags: TagMap
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureLogProfileResource[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new MonitorClient(tokenCredentials, subscriptionId)
    const logProfiles: RawAzureLogProfileResource[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        const logProfilesIterable: PagedAsyncIterableIterator<LogProfileResource> =
          client.logProfiles.list()
        for await (const logProfile of logProfilesIterable) {
          if (logProfile) {
            const { tags, ...rest } = logProfile
            const region = regionMap.global
            logProfiles.push({
              ...rest,
              region,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'logProfiles',
        operation: 'list',
      }
    )
    logger.debug(lt.foundLogProfiles(logProfiles.length))

    logProfiles.map(({ region, ...rest }) => {
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