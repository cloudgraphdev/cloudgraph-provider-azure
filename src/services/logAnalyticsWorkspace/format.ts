import { AzureLogAnalyticsWorkspace } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureLogAnalyticsWorkspace } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureLogAnalyticsWorkspace
  account: string
  region: string
}): AzureLogAnalyticsWorkspace => {
  const {
    id,
    resourceGroupId,
    provisioningState,
    customerId,
    sku: { name, lastSkuUpdate },
    features: {
      enableLogAccessUsingOnlyResourcePermissions,
      legacy,
      searchVersion,
    },
    workspaceCapping: { dailyQuotaGb, quotaNextResetTime, dataIngestionStatus },
    retentionInDays,
    createdDate,
    modifiedDate,
    publicNetworkAccessForIngestion,
    publicNetworkAccessForQuery,
    type,
    Tags = {},
  } = service

  return {
    id,
    type,
    resourceGroupId,
    subscriptionId: account,
    region,
    provisioningState,
    customerId,
    sku: { name, lastSkuUpdate },
    features: {
      enableLogAccessUsingOnlyResourcePermissions,
      legacy,
      searchVersion,
    },
    workspaceCapping: { dailyQuotaGb, quotaNextResetTime, dataIngestionStatus },
    retentionInDays,
    createdDate,
    modifiedDate,
    publicNetworkAccessForIngestion,
    publicNetworkAccessForQuery,
    tags: formatTagsFromMap(Tags),
  }
}
