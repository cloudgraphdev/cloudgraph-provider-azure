import { CdnManagementClient, Profile } from '@azure/arm-cdn'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import isEmpty from 'lodash/isEmpty'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'
import services from '../../enums/services'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'CDN Profiles'

export interface RawAzureCdnProfile extends Omit<Profile, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureCdnProfile[]
}> => {
  try {
    const existingData: { [property: string]: RawAzureCdnProfile[] } =
      rawData.find(({ name }) => name === services.cdnProfiles)?.data || {}

    if (isEmpty(existingData)) {
      const { tokenCredentials, subscriptionId } = config
      const client = new CdnManagementClient(tokenCredentials, subscriptionId)

      const cdnProfiles: RawAzureCdnProfile[] = []
      const cdnProfilesIterable: PagedAsyncIterableIterator<Profile> =
        client.profiles.list()
      await tryCatchWrapper(
        async () => {
          for await (const cdnProfile of cdnProfilesIterable) {
            if (cdnProfile) {
              const { location, tags, ...rest } = cdnProfile
              const resourceGroupId = getResourceGroupFromEntity(rest)
              const region = location && lowerCaseLocation(location)
              cdnProfiles.push({
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
          operation: 'list',
        }
      )
      logger.debug(lt.foundCdnProfiles(cdnProfiles.length))

      const result: { [property: string]: RawAzureCdnProfile[] } = {}
      cdnProfiles
        .filter(o => o)
        .map(({ region, ...rest }) => {
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
    }
    return existingData
  } catch (e) {
    logger.error(e)
    return {}
  }
}
