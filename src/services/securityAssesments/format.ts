import cuid from 'cuid'
import { AzureSecurityAssesment } from '../../types/generated'
import { toCamel } from '../../utils'
import { RawAzureSecurityAssesment } from './data'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureSecurityAssesment
  account: string
}): AzureSecurityAssesment => {
  const {
    id,
    name,
    type,
    region,
    resourceDetails = {},
    displayName,
    additionalData: rawAdditionalData = {},
    links: { azurePortalUri = '' } = {},
    metadata: {
      partnerData: { partnerName: metadataPartnerData = '' } = {},
      ...restMetadata
    } = {},
    partnersData: { partnerName } = {},
    status = {},
  } = service
  const additionalData = Object.entries(rawAdditionalData).map(([k, v]) => ({
    id: `${k}:${v}`,
    key: k,
    value: v,
  }))
  return {
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    resourceDetails: toCamel(resourceDetails),
    displayName,
    additionalData,
    link: azurePortalUri,
    status,
    partnerName,
    metadata: { ...restMetadata, partnerName: metadataPartnerData },
  }
}
