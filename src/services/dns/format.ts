import { generateUniqueId } from '@cloudgraph/sdk'
import { AzureDnsZone, AzureDnsZoneRecordSet } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureDnsZone, RawAzureDnsRecordSet } from './data'

const formatRecordSet = (
  recordSet: RawAzureDnsRecordSet
): AzureDnsZoneRecordSet => {
  const {
    id,
    name,
    type,
    ttl,
    fqdn,
    provisioningState,
    targetResource,
    aRecords,
    aaaaRecords,
    mxRecords,
    nsRecords,
    ptrRecords,
    srvRecords,
    txtRecords,
    cnameRecord,
    soaRecord,
    caaRecords,
    resourceGroupId,
  } = recordSet

  return {
    id,
    name,
    type,
    ttl,
    fqdn,
    provisioningState,
    targetResourceId: targetResource?.id || '',
    aRecords: aRecords?.map(aRecord => aRecord?.ipv4Address || '') || [],
    aaaaRecords:
      aaaaRecords?.map(aaaaRecord => aaaaRecord?.ipv6Address || '') || [],
    mxRecords:
      mxRecords?.map(({ exchange, preference }) => {
        return {
          id: generateUniqueId({
            id,
            exchange,
          }),
          exchange,
          preference,
        }
      }) || [],
    nsRecords: nsRecords?.map(nsRecord => nsRecord?.nsdname || '') || [],
    ptrRecords: ptrRecords?.map(ptrRecord => ptrRecord?.ptrdname || '') || [],
    srvRecords:
      srvRecords?.map(({ priority, weight, port, target }) => {
        return {
          id: generateUniqueId({
            id, target
          }),
          priority,
          weight,
          port,
          target,
        }
      }) || [],
    txtRecords:
      txtRecords?.map(({ value }) => {
        return {
          id: generateUniqueId({
            id,
            value
          }),
          value,
        }
      }) || [],
    cnameRecord: cnameRecord?.cname || '',
    resourceGroupId,
    soaRecord: {
      host: soaRecord?.host || '',
      email: soaRecord?.email || '',
      serialNumber: soaRecord?.serialNumber || 0,
      refreshTime: soaRecord?.refreshTime || 0,
      retryTime: soaRecord?.retryTime || 0,
      expireTime: soaRecord?.expireTime || 0,
      minimumTtl: soaRecord?.minimumTtl || 0,
    },
    caaRecords:
      caaRecords?.map(({ flags, tag, value }) => {
        return {
          id: generateUniqueId({
            id,
            tag,
            value,
          }),
          flags,
          tag,
          value,
        }
      }) || [],
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDnsZone
  account: string
  region: string
}): AzureDnsZone => {
  const {
    id,
    name,
    type,
    maxNumberOfRecordSets,
    numberOfRecordSets,
    nameServers,
    zoneType,
    recordSets,
    resourceGroupId,
    Tags,
  } = service

  return {
    id,
    name,
    type,
    region,
    subscriptionId: account,
    maxNumberOfRecordSets,
    numberOfRecordSets,
    nameServers,
    zoneType,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
    recordSets: recordSets?.map(recordSet => formatRecordSet(recordSet)) || [],
  }
}
