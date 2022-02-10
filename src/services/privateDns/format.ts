import cuid from 'cuid'
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
  } = service
  return {
    id: id || cuid(),
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
  }
}
