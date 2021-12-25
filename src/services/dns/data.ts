import { DnsManagementClient } from '@azure/arm-dns'
import CloudGraph from '@cloudgraph/sdk'
import {
  RecordSet,
  RecordSetListResult,
  RecordSetsListAllByDnsZoneNextResponse,
  RecordSetsListAllByDnsZoneResponse,
  Zone,
  ZoneListResult,
  ZonesListByResourceGroupNextResponse,
  ZonesListByResourceGroupResponse,
} from '@azure/arm-dns/esm/models'
import azureLoggerText from '../../properties/logger'

import getResourceGroupData from '../resourceGroup/data'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupNames, lowerCaseLocation } from '../../utils/format'
import { getAllResources } from '../../utils/apiUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'DNS'

export interface RawAzureDnsZone extends Omit<Zone, 'tags'> {
  recordSets: RecordSet[]
  resourceGroup: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
  opts
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDnsZone[]
}> => {
  try {
    const { credentials, subscriptionId } = config
    const client = new DnsManagementClient(credentials, subscriptionId)

    const resourceGroups = await getResourceGroupData({
      regions,
      config,
      rawData,
      opts
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)

    const dnsZones: RawAzureDnsZone[] = []

    for (const resourceGroupName of resourceGroupsNames) {
      const dnsZoneList: ZoneListResult = await getAllResources({
        listCall: async (): Promise<ZonesListByResourceGroupResponse> =>
          client.zones.listByResourceGroup(resourceGroupName),
        listNextCall: async (
          nextLink: string
        ): Promise<ZonesListByResourceGroupNextResponse> =>
          client.zones.listByResourceGroupNext(nextLink),
        debugScope: { service: serviceName, client, scope: 'zones' },
        resourceGroupName,
      })

      for (const dnsZone of dnsZoneList) {
        const { name } = dnsZone
        const recordSets: RecordSetListResult = await getAllResources({
          listCall: async (): Promise<RecordSetsListAllByDnsZoneResponse> =>
            client.recordSets.listAllByDnsZone(resourceGroupName, name),
          listNextCall: async (
            nextLink: string
          ): Promise<RecordSetsListAllByDnsZoneNextResponse> =>
            client.recordSets.listAllByDnsZoneNext(nextLink),
          debugScope: { service: serviceName, client, scope: 'recordSets' },
          resourceGroupName,
          uniqueIdentifier: name,
        })
        dnsZones.push({
          ...dnsZone,
          resourceGroup: resourceGroupName,
          Tags: dnsZone.tags || {},
          recordSets,
        })
      }
    }

    const result: { [property: string]: RawAzureDnsZone[] } = {}
    let numOfGroups = 0
    dnsZones.map(dnsZone => {
      const region = lowerCaseLocation(dnsZone.location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push(dnsZone)
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
