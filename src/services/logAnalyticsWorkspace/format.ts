import cuid from 'cuid'

import { AzureLogAnalyticsWorkspace } from '../../types/generated'
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
    features,
    workspaceCapping,
    retentionInDays,
    createdDate,
    modifiedDate,
    publicNetworkAccessForIngestion,
    publicNetworkAccessForQuery,
    type,
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
    features,
    workspaceCapping,
    retentionInDays,
    createdDate,
    modifiedDate,
    publicNetworkAccessForIngestion,
    publicNetworkAccessForQuery,
  }
}
