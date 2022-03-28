import cuid from 'cuid'

import { AzureAppInsights } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureAppInsight } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureAppInsight
  account: string
  region: string
}): AzureAppInsights => {
  const {
    id,
    resourceGroupId,
    provisioningState,
    ingestionMode,
    connectionString,
    tenantId,
    flowType,
    applicationType,
    appId,
    applicationId,
    samplingPercentage,
    retentionInDays,
    instrumentationKey,
    type,
    etag,
    creationDate,
    publicNetworkAccessForIngestion,
    publicNetworkAccessForQuery,
    Tags = {},
  } = service

  return {
    id: id || cuid(),
    type,
    etag,
    resourceGroupId,
    subscriptionId: account,
    region,
    provisioningState,
    ingestionMode,
    instrumentationKey,
    creationDate: creationDate?.toISOString(),
    connectionString,
    tenantId,
    flowType,
    applicationType,
    appId,
    applicationId,
    samplingPercentage,
    retentionInDays,
    publicNetworkAccessForIngestion,
    publicNetworkAccessForQuery,
    tags: formatTagsFromMap(Tags),
  }
}
