import { RawAzureContainerApp } from './data'
import { formatTagsFromMap } from '../../utils/format'
import { AzureContainerApp } from '../../types/generated'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureContainerApp
  account: string
}): AzureContainerApp => {
  const {
    id,
    name,
    type,
    region,
    resourceGroupId,
    customDomainVerificationId,
    environmentId,
    latestReadyRevisionName,
    latestRevisionFqdn,
    latestRevisionName,
    location,
    managedEnvironmentId,
    provisioningState,
    workloadProfileName,
    Tags = {},
  } = service
  return {
    id,
    name,
    type,
    region,
    resourceGroupId,
    customDomainVerificationId,
    environmentId,
    latestReadyRevisionName,
    latestRevisionFqdn,
    latestRevisionName,
    location,
    managedEnvironmentId,
    provisioningState,
    workloadProfileName,
    subscriptionId,
    tags: formatTagsFromMap(Tags),
  }
}
