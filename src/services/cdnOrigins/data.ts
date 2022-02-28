import { CdnManagementClient, Origin } from '@azure/arm-cdn'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import isEmpty from 'lodash/isEmpty'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils/index'

import getCdnEndpoints, { RawAzureCdnEndpoint } from '../cdnEndpoints/data'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'CDN Origins'

export interface RawAzureCdnOrigin extends Origin {
  endpointId: string
  region: string
  resourceGroupId: string
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureCdnOrigin[]
}> => {
  try {
    const result: { [property: string]: RawAzureCdnOrigin[] } = {}

    const { tokenCredentials, subscriptionId } = config
    const client = new CdnManagementClient(tokenCredentials, subscriptionId)

    const cdnEndpoints: RawAzureCdnEndpoint[] = Object.values(
      await getCdnEndpoints({
        regions,
        config,
        rawData,
        opts,
      })
    ).flat()

    if (!isEmpty(cdnEndpoints)) {
      let cdnOrigins: RawAzureCdnOrigin[] = []
      await tryCatchWrapper(
        async () => {
          cdnOrigins = await Promise.all(
            cdnEndpoints.map(async cdnEndpoint => {
              const {
                resourceGroupId,
                name,
                profileName,
                region: endpointRegion,
              } = cdnEndpoint
              const cdnOriginsIterable: PagedAsyncIterableIterator<Origin> =
                client.origins.listByEndpoint(resourceGroupId, profileName, name)

              for await (const cdnOrigin of cdnOriginsIterable) {
                if (cdnOrigin) {
                  const region = endpointRegion || 'global'
                  const { ...rest } = cdnOrigin
                  return {
                    ...rest,
                    endpointId: cdnEndpoint.id,
                    region,
                    resourceGroupId,
                  }
                }
              }
            })
          )
          logger.debug(lt.foundCdnOrigins(cdnOrigins.length))
        },
        {
          service: serviceName,
          client,
          scope: 'origins',
          operation: 'listByEndpoint',
        }
      )

      cdnOrigins
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
    }
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
