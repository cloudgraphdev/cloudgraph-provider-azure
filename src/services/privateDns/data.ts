import { PrivateDnsManagementClient, PrivateZone } from '@azure/arm-privatedns'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Private DNS'

export interface RawAzurePrivateDnsZone
  extends Omit<PrivateZone, 'tags' | 'location'> {
  region: string
  resourceGroup: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzurePrivateDnsZone[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new PrivateDnsManagementClient(
      tokenCredentials,
      subscriptionId
    )

    const privateDnsZones: RawAzurePrivateDnsZone[] = []
    const privateDnsZoneIterable: PagedAsyncIterableIterator<PrivateZone> =
      client.privateZones.list()
    await tryCatchWrapper(
      async () => {
        for await (const privateDnsZone of privateDnsZoneIterable) {
          if (privateDnsZone) {
            const { location, tags, ...rest } = privateDnsZone
            const resourceGroup = getResourceGroupFromEntity(rest)
            const region = location && lowerCaseLocation(location)
            privateDnsZones.push({
              ...rest,
              region,
              resourceGroup,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'privateZones',
        operation: 'list',
      }
    )
    logger.debug(lt.foundPrivateDnsZones(privateDnsZones.length))

    const result: { [property: string]: RawAzurePrivateDnsZone[] } = {}
    privateDnsZones.map(({ region, ...rest }) => {
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
