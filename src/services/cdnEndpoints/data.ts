import { CdnManagementClient, Endpoint } from '@azure/arm-cdn'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import isEmpty from 'lodash/isEmpty'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'
import services from '../../enums/services'

import getCdnProfiles, { RawAzureCdnProfile } from '../cdnProfiles/data'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'CDN Endpoints'

export interface RawAzureCdnEndpoint
  extends Omit<Endpoint, 'tags' | 'location'> {
  profileId: string
  profileName: string
  region: string
  resourceGroup: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureCdnEndpoint[]
}> => {
  try {
    const existingData: { [property: string]: RawAzureCdnEndpoint[] } =
      rawData.find(({ name }) => name === services.cdnEndpoints)?.data || {}

    if (isEmpty(existingData)) {
      const { tokenCredentials, subscriptionId } = config
      const client = new CdnManagementClient(tokenCredentials, subscriptionId)

      const cdnProfiles: RawAzureCdnProfile[] = Object.values(
        await getCdnProfiles({
          regions,
          config,
          rawData,
          opts,
        })
      ).flat()

      let cdnEndpoints: RawAzureCdnEndpoint[] = []
      await tryCatchWrapper(
        async () => {
          cdnEndpoints = await Promise.all(
            cdnProfiles.map(async cdnProfile => {
              const { resourceGroup, name } = cdnProfile
              const cdnEndpointsIterable: PagedAsyncIterableIterator<Endpoint> =
                client.endpoints.listByProfile(resourceGroup, name)
              for await (const cdnEndpoint of cdnEndpointsIterable) {
                if (cdnEndpoint) {
                  const { location, tags, ...rest } = cdnEndpoint
                  const region =
                    (location && lowerCaseLocation(location)) || 'global'
                  return {
                    ...rest,
                    profileId: cdnProfile.id,
                    profileName: cdnProfile.name,
                    region,
                    resourceGroup,
                    Tags: tags || {},
                  }
                }
              }
            })
          )
          logger.debug(lt.foundCdnEndpoints(cdnEndpoints.length))
        },
        {
          service: serviceName,
          client,
          scope: 'endpoints',
          operation: 'listByProfile',
        }
      )

      const result: { [property: string]: RawAzureCdnEndpoint[] } = {}
      cdnEndpoints
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
