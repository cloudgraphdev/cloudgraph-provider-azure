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
  resourceGroupId: string
  records: RawAzureRecordSet[]
  Tags: TagMap
}

export interface RawAzureRecordSet {
  id: string
  name: string
  type: string
}

export const listRecordSets = async (
  client: PrivateDnsManagementClient,
  resourceGroup: string,
  databaseAccountName: string
): Promise<RawAzureRecordSet[]> => {
  const records: RawAzureRecordSet[] = []
  const recordsIterable = client.recordSets.list(
    resourceGroup,
    databaseAccountName
  )
  await tryCatchWrapper(
    async () => {
      for await (const record of recordsIterable) {
        if (record) {
          const { id, name, type } = record
          const recordType = type?.split('/').pop()
          records.push({
            id,
            name,
            type: recordType,
          } as RawAzureRecordSet)
        }

      }
    }
    , {
      service: 'Records Sets',
      client,
      scope: 'recordSets',
      operation: 'listRecordSets',
    }
  )
  return records
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
            const resourceGroupId = getResourceGroupFromEntity(rest)
            const region = lowerCaseLocation(location)
            privateDnsZones.push({
              ...rest,
              region,
              resourceGroupId,
              records: await listRecordSets(client, resourceGroupId, privateDnsZone.name),
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
