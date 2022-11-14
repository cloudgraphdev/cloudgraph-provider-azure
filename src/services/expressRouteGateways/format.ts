import { generateUniqueId } from '@cloudgraph/sdk'

import { AzureExpressRouteGateway } from '../../types/generated'
import { RawAzureExpressRouteGateway } from './data'
import { formatTagsFromMap } from '../../utils/format'


export default ({
  service,
  account,
  region,
}: {
  service: RawAzureExpressRouteGateway
  account: string
  region: string
}): AzureExpressRouteGateway => {
  const {
    id,
    name,
    type,
    etag,
    autoScaleConfiguration,
    expressRouteConnections,
    provisioningState,
    virtualHub,
    Tags = {},
  } = service
  return {
    id,
    name,
    type,
    region,
    subscriptionId: account,
    etag,
    autoScaleConfiguration,
    expressRouteConnections: expressRouteConnections?.map(connection => ({
      id: connection.id,
      connectionId: connection.id,
      name: connection?.name,
      provisioningState: connection?.provisioningState,
      authorizationKey: connection?.authorizationKey,
      routingWeight: connection?.routingWeight,
      enableInternetSecurity: connection?.enableInternetSecurity,
      expressRouteGatewayBypass: connection?.expressRouteGatewayBypass,
      expressRouteCircuitPeering: {
        id: connection?.expressRouteCircuitPeering?.id,
      },
      routingConfiguration: {
        associatedRouteTable: {
          id: connection?.routingConfiguration?.associatedRouteTable?.id,
        },
        propagatedRouteTables: {
          ...connection?.routingConfiguration?.propagatedRouteTables,
          ids: connection?.routingConfiguration?.propagatedRouteTables?.ids?.map(
            id => ({
              id: id?.id,
            })
          ),
        },
        vnetRoutes: {
          staticRoutes:
            connection?.routingConfiguration?.vnetRoutes?.staticRoutes?.map(
              staticRoute => ({
                id: generateUniqueId({
                  id,
                  name: staticRoute.name,
                }),
                ...staticRoute,
              })
            ),
          bgpConnections:
            connection?.routingConfiguration?.vnetRoutes?.bgpConnections?.map(
              bgpConnection => ({
                id: bgpConnection?.id,
              })
            ),
        },
      },
    })),
    provisioningState,
    virtualHub: {
      id: virtualHub?.id,
    },
    tags: formatTagsFromMap(Tags),
  }
}
