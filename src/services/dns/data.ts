import { DnsManagementClient, RecordSet, Zone } from '@azure/arm-dns'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'

import getResourceGroupData from '../resourceGroup/data'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupNames, lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'DNS'

export interface RawAzureDnsRecordSet extends RecordSet {
  resourceGroupId: string
  dnsZoneName: string
}

export interface RawAzureDnsZone extends Omit<Zone, 'tags'> {
  recordSets: RawAzureDnsRecordSet[]
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
  [property: string]: RawAzureDnsZone[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new DnsManagementClient(tokenCredentials, subscriptionId)

    const resourceGroups = await getResourceGroupData({
      regions,
      config,
      rawData,
      opts,
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)

    const dnsZones: Array<Zone & { resourceGroupId: string }> = []
    await Promise.all(
      (resourceGroupsNames || []).map(async (rgName: string) => {
        const dnsZoneListIterable = client.zones.listByResourceGroup(rgName)
        await tryCatchWrapper(
          async () => {
            for await (const dnsZone of dnsZoneListIterable) {
              if (dnsZone) {
                dnsZones.push({ ...dnsZone, resourceGroupId: rgName })
              }
            }
          },
          {
            service: serviceName,
            client,
            scope: 'zones',
            operation: 'listByResource',
          }
        )
      })
    )

    const recordSets: RawAzureDnsRecordSet[] = []
    await Promise.all(
      (dnsZones || []).map(
        async ({
          name: dnsZoneName,
          resourceGroupId: dnsZoneResourceGroupName,
        }) => {
          const recordSetListIterable = client.recordSets.listAllByDnsZone(
            dnsZoneResourceGroupName,
            dnsZoneName
          )
          await tryCatchWrapper(
            async () => {
              for await (const recordSet of recordSetListIterable) {
                if (recordSet) {
                  recordSets.push({
                    ...recordSet,
                    resourceGroupId: dnsZoneResourceGroupName,
                    dnsZoneName,
                  })
                }
              }
            },
            {
              service: serviceName,
              client,
              scope: 'recordSets',
              operation: 'listAllByDnsZone',
            }
          )
        }
      )
    )
    logger.debug(lt.foundDnsZoneRecordSet(recordSets.length))

    const result: { [property: string]: RawAzureDnsZone[] } = {}
    let numOfGroups = 0
    dnsZones.map(dnsZone => {
      const region = lowerCaseLocation(dnsZone.location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          ...dnsZone,
          recordSets: recordSets.filter(i => i.dnsZoneName === dnsZone.name),
          region,
          Tags: dnsZone.tags || {},
        })
        numOfGroups += 1
      }
    })

    logger.debug(lt.foundDnsZone(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
