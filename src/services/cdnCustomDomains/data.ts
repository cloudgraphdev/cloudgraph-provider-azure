import { CdnManagementClient, CustomDomain } from '@azure/arm-cdn'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import isEmpty from 'lodash/isEmpty'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils/index'

import getCdnEndpoints, { RawAzureCdnEndpoint } from '../cdnEndpoints/data'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'CDN Custom Domains'

export interface RawAzureCdnCustomDomain extends CustomDomain {
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
  [property: string]: RawAzureCdnCustomDomain[]
}> => {
  try {
    const result: { [property: string]: RawAzureCdnCustomDomain[] } = {}

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
      let cdnCustomDomains: RawAzureCdnCustomDomain[] = []
      await tryCatchWrapper(
        async () => {
          cdnCustomDomains = await Promise.all(
            cdnEndpoints.map(async cdnEndpoint => {
              const {
                resourceGroupId,
                name,
                profileName,
                region: endpointRegion,
              } = cdnEndpoint
              const cdnCustomDomainsIterable: PagedAsyncIterableIterator<CustomDomain> =
                client.customDomains.listByEndpoint(
                  resourceGroupId,
                  profileName,
                  name
                )

              for await (const cdnCustomDomain of cdnCustomDomainsIterable) {
                if (cdnCustomDomain) {
                  const region = endpointRegion || 'global'
                  const { ...rest } = cdnCustomDomain
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
          logger.debug(lt.foundCdnCustomDomains(cdnCustomDomains.length))
        },
        {
          service: serviceName,
          client,
          scope: 'customDomains',
          operation: 'listByEndpoint',
        }
      )

      cdnCustomDomains
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
