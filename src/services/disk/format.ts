import cuid from 'cuid'
import { AzureDisk } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureDisk } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDisk
  account: string
  region: string
}): AzureDisk => {
  const {
    id,
    name,
    managedBy,
    zones,
    timeCreated,
    osType,
    hyperVGeneration,
    creationData: {
      createOption = null,
      imageReference: { id: imageReferenceId = null } = {},
    } = {},
    diskSizeGB: diskSizeGb,
    diskSizeBytes,
    uniqueId,
    diskIOPSReadWrite: diskIopsReadWrite,
    diskMBpsReadWrite: diskMbpsReadWrite,
    diskState,
    networkAccessPolicy,
    tier,
    encryption: { type: encryptionSettings = null } = {},
    resourceGroup,
    Tags,
  } = service

  return {
    // If the id is not present use uniqueId 
    // uniqueId is an additional unique Guid that identifies the resource
    // if uniqueId doesn't exist, then create a random uid to ensure id consistency for connections
    id: id || uniqueId || cuid(),
    name,
    region,
    subscriptionId: account,
    managedBy,
    zones,
    timeCreated: timeCreated.toISOString(),
    osType,
    hyperVGeneration,
    createOption,
    imageReferenceId,
    diskSizeGb,
    diskSizeBytes,
    uniqueId,
    diskIopsReadWrite,
    diskMbpsReadWrite,
    diskState,
    networkAccessPolicy,
    tier,
    encryptionSettings,
    resourceGroup,
    tags: formatTagsFromMap(Tags),
  }
}
