import cuid from 'cuid'
import { AzureReplicationNetwork } from '../../types/generated'
import { RawAzureReplicationNetwork } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzureReplicationNetwork
  account: string
  region: string
}): AzureReplicationNetwork => {
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
      subnets: properties?.subnets?.map(subnet => ({
        ...subnet,
        id: cuid(),
      })),
    },
  }
}
