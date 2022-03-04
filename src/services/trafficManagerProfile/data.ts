import {
  TrafficManagerManagementClient,
  Profile,
} from '@azure/arm-trafficmanager'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'TrafficManagerProfile'

export interface RawAzureTrafficManagerProfile
  extends Omit<Profile, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureTrafficManagerProfile[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new TrafficManagerManagementClient(
      tokenCredentials,
      subscriptionId
    )

    const trafficManagerProfiles: RawAzureTrafficManagerProfile[] = []
    const trafficManagerProfileIterable: PagedAsyncIterableIterator<Profile> =
      client.profiles.listBySubscription()
    await tryCatchWrapper(
      async () => {
        for await (const trafficManagerProfile of trafficManagerProfileIterable) {
          if (trafficManagerProfile) {
            const { location, tags, ...rest } = trafficManagerProfile
            const resourceGroupId = getResourceGroupFromEntity(rest)
            const region = lowerCaseLocation(location)
            trafficManagerProfiles.push({
              ...rest,
              region,
              resourceGroupId,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'profiles',
        operation: 'listBySubscription',
      }
    )
    logger.debug(lt.foundTrafficManagerProfile(trafficManagerProfiles.length))

    const result: { [property: string]: RawAzureTrafficManagerProfile[] } = {}
    trafficManagerProfiles.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          region,
          ...rest,
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
