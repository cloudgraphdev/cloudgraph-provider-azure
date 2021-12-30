import { DnsManagementClient } from '@azure/arm-dns'
import CloudGraph from '@cloudgraph/sdk'
import {
  RecordSet,
  RecordSetsListAllByDnsZoneNextResponse,
  RecordSetsListAllByDnsZoneResponse,
  Zone,
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

export interface RawAzureDnsRecordSet extends RecordSet {
  resourceGroup: string
  dnsZoneName: string
}

export interface RawAzureDnsZone extends Omit<Zone, 'tags'> {
  recordSets: RawAzureDnsRecordSet[]
  resourceGroup: string
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
    const { credentials, subscriptionId } = config
    const client = new DnsManagementClient(credentials, subscriptionId)

    const resourceGroups = await getResourceGroupData({
      regions,
      config,
      rawData,
      opts,
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)

    const dnsZoneList: Array<Zone & { resourceGroup: string }> = (
      await Promise.all(
        (resourceGroupsNames || []).map(async (rgName: string) =>
          getAllResources({
            listCall: async (): Promise<ZonesListByResourceGroupResponse> =>
              client.zones.listByResourceGroup(rgName),
            listNextCall: async (
              nextLink: string
            ): Promise<ZonesListByResourceGroupNextResponse> =>
              client.zones.listByResourceGroupNext(nextLink),
            debugScope: { service: serviceName, client, scope: 'zones' },
            resourceGroupName: rgName,
          })
        )
      )
    ).flat()

    const recordSets: RawAzureDnsRecordSet[] =
      (
        await Promise.all(
          (dnsZoneList || []).map(
            async ({
              name: dnsZoneName,
              resourceGroup: dnsZoneResourceGroupName,
            }) =>
              getAllResources({
                listCall:
                  async (): Promise<RecordSetsListAllByDnsZoneResponse> =>
                    client.recordSets.listAllByDnsZone(
                      dnsZoneResourceGroupName,
                      dnsZoneName
                    ),
                listNextCall: async (
                  nextLink: string
                ): Promise<RecordSetsListAllByDnsZoneNextResponse> =>
                  client.recordSets.listAllByDnsZoneNext(nextLink),
                debugScope: {
                  service: serviceName,
                  client,
                  scope: 'recordSets',
                },
                resourceGroupName: dnsZoneResourceGroupName,
                uniqueIdentifier: dnsZoneName,
                propertyName: 'dnsZoneName',
              })
          )
        )
      ).flat() || []
      logger.debug(lt.foundDnsZoneRecordSet(recordSets.length))

    const result: { [property: string]: RawAzureDnsZone[] } = {}
    let numOfGroups = 0
    dnsZoneList.map(dnsZone => {
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
