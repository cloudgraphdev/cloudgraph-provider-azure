import { formatTagsFromMap } from '../../utils/format'
import { RawAzurePrivateDnsZone } from './data'
import { AzurePrivateDnsZone } from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzurePrivateDnsZone
  account: string
  region: string
}): AzurePrivateDnsZone => {
  const {
    id,
    name,
    type,
    Tags,
    etag,
    maxNumberOfRecordSets,
    numberOfRecordSets,
    maxNumberOfVirtualNetworkLinks,
    numberOfVirtualNetworkLinks,
    maxNumberOfVirtualNetworkLinksWithRegistration,
    numberOfVirtualNetworkLinksWithRegistration,
    provisioningState,
    internalId,
    resourceGroupId,
    records = [],
    virtualNetworkLinks = []
  } = service

  // Records
  const aRecords = records.filter(r => r.type === 'A').map(r => r.id)
  const aaaaRecords = records.filter(r => r.type === 'AAAA').map(r => r.id)
  const mxRecords = records.filter(r => r.type === 'MX').map(r => r.id)
  const ptrRecords = records.filter(r => r.type === 'PTR').map(r => r.id)
  const soaRecord = records.filter(r => r.type === 'SOA').map(r => r.id)
  const srvRecords = records.filter(r => r.type === 'SRV').map(r => r.id)
  const txtRecords = records.filter(r => r.type === 'TXT').map(r => r.id)
  const cnameRecord = records.filter(r => r.type === 'CNAME').pop()?.id

  return {
    id,
    subscriptionId: account,
    name,
    type,
    region,
    etag,
    maxNumberOfRecordSets,
    numberOfRecordSets,
    maxNumberOfVirtualNetworkLinks,
    numberOfVirtualNetworkLinks,
    maxNumberOfVirtualNetworkLinksWithRegistration,
    numberOfVirtualNetworkLinksWithRegistration,
    provisioningState,
    internalId,
    tags: formatTagsFromMap(Tags),
    resourceGroupId,
    aRecords,
    aaaaRecords,
    mxRecords,
    ptrRecords,
    soaRecord,
    srvRecords,
    txtRecords,
    cnameRecord,
    virtualNetworkLinks: virtualNetworkLinks.map(r => r.id)
  }
}
