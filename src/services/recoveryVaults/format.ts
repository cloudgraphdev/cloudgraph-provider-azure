import cuid from 'cuid'
import { AzureRecoveryVault } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureRecoveryVault } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzureRecoveryVault
  account: string
  region: string
}): AzureRecoveryVault => {
  const {
    id,
    name,
    identity,
    properties,
    sku,
    systemData,
    resourceGroupId,
    Tags,
  } = service
  
  return {
    id,
    name,
    region,
    resourceGroupId,
    subscriptionId,
    identity: {
      ...identity,
      userAssignedIdentities: Object.keys(identity?.userAssignedIdentities || {}).map(key => ({
        id: cuid(),
        key,
        value: identity?.userAssignedIdentities[key],
      })),
    },
    properties: {
      ...properties,
      moveDetails: {
        ...properties?.moveDetails,
        completionTimeUtc: properties?.moveDetails?.completionTimeUtc?.toISOString(),
        startTimeUtc: properties?.moveDetails?.startTimeUtc?.toISOString(),
      },
      upgradeDetails: {
        ...properties?.upgradeDetails,
        endTimeUtc: properties?.upgradeDetails?.endTimeUtc?.toISOString(),
        lastUpdatedTimeUtc: properties?.upgradeDetails?.lastUpdatedTimeUtc?.toISOString(),
        startTimeUtc: properties?.upgradeDetails?.startTimeUtc?.toISOString(),
      },
      privateEndpointConnections: properties?.privateEndpointConnections?.map(connection => ({
        ...connection,
        id: connection?.id || cuid(),
      })),
    },
    sku,
    createdBy: systemData?.createdBy,
    createdByType: systemData?.createdByType,
    createdAt: systemData?.createdAt?.toISOString(),
    lastModifiedBy: systemData?.lastModifiedBy,
    lastModifiedByType: systemData?.lastModifiedByType,
    lastModifiedAt: systemData?.lastModifiedAt?.toISOString(),
    tags: formatTagsFromMap(Tags),
  }
}
