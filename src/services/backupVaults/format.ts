import cuid from 'cuid'
import { AzureBackupVault } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureBackupVault } from './data'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureBackupVault
  account: string
}): AzureBackupVault => {
  const {
    id,
    name,
    type,
    region,
    eTag,
    identity,
    Tags,
    properties,
    resourceGroupId,
  } = service
  return {
    id: id || cuid(),
    name,
    type,
    region,
    eTag,
    subscriptionId,
    resourceGroupId,
    properties: properties
      ? {
          provisioningState: properties?.provisioningState,
          storageSettings:
            properties?.storageSettings?.map(s => ({
              id: cuid(),
              datastoreType: s.datastoreType,
              type: s.type,
            })) || [],
          isVaultProtectedByResourceGuard:
            properties?.isVaultProtectedByResourceGuard,
        }
      : {},
    identity,
    tags: formatTagsFromMap(Tags),
  }
}
