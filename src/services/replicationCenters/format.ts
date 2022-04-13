import cuid from 'cuid'
import { AzureReplicationCenter } from '../../types/generated'
import { RawAzureReplicationCenter } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzureReplicationCenter
  account: string
  region: string
}): AzureReplicationCenter => {
  const {
    id,
    resourceGroupId,
    properties,
  } = service
  
  return {
    id,
    region,
    resourceGroupId,
    subscriptionId,
    properties: {
      ...properties,
      healthErrors: properties?.healthErrors?.map(error => ({
        ...error,
        id: cuid(),
        creationTimeUtc: error?.creationTimeUtc?.toISOString(),
        innerHealthErrors: error?.innerHealthErrors?.map(innerError => ({
          id: cuid(),
          ...innerError,
          creationTimeUtc: innerError?.creationTimeUtc?.toISOString(),
        })),
      })),
      lastHeartbeat: properties?.lastHeartbeat?.toISOString(),
    },
  }
}
