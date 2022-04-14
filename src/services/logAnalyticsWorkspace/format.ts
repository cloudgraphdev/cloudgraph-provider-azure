import cuid from 'cuid'

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
    sku,
    features: {
      enableDataExport,
      immediatePurgeDataOn30Days,
      enableLogAccessUsingOnlyResourcePermissions,
      clusterResourceId,
      disableLocalAuth,
    } = {},
    workspaceCapping,
    retentionInDays,
    createdDate,
    modifiedDate,
    publicNetworkAccessForIngestion,
    publicNetworkAccessForQuery,
    type,
    Tags = {},
  } = service

  return {
    id: id || cuid(),
    type,
    resourceGroupId,
    subscriptionId: account,
    region,
    provisioningState,
    customerId,
    sku,
    features: {
      enableDataExport,
      immediatePurgeDataOn30Days,
      enableLogAccessUsingOnlyResourcePermissions,
      clusterResourceId,
      disableLocalAuth,
    },
    workspaceCapping,
    retentionInDays,
    createdDate,
    modifiedDate,
    publicNetworkAccessForIngestion,
    publicNetworkAccessForQuery,
    tags: formatTagsFromMap(Tags),
  }
}
