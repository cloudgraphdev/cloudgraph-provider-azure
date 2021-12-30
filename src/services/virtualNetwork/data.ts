import { NetworkManagementClient } from '@azure/arm-network'
import {
  DdosProtectionPlan,
  DdosProtectionPlanListResult,
  DdosProtectionPlansListNextResponse,
  DdosProtectionPlansListResponse,
  VirtualNetwork,
  VirtualNetworkListResult,
  VirtualNetworksListAllNextResponse,
  VirtualNetworksListAllResponse,
} from '@azure/arm-network/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { caseInsensitiveEqual } from '../../utils'
import { getAllResources } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'VirtualNetwork'

export interface RawAzureVirtualNetwork
  extends Omit<
    VirtualNetwork,
    'tags' | 'location' | 'ddosProtectionPlan' | 'addressSpace' | 'dhcpOptions'
  > {
  region: string
  resourceGroup: string
  addressSpacePrefixes: string[]
  ddosProtectionPlans: DdosProtectionPlan[]
  dnsServers: string[]
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureVirtualNetwork[]
}> => {
  try {
    const { credentials, subscriptionId } = config
    const client = new NetworkManagementClient(credentials, subscriptionId)

    const virtualNetworks: VirtualNetworkListResult = await getAllResources({
      listCall: async (): Promise<VirtualNetworksListAllResponse> =>
        client.virtualNetworks.listAll(),
      listNextCall: async (
        nextLink: string
      ): Promise<VirtualNetworksListAllNextResponse> =>
        client.virtualNetworks.listAllNext(nextLink),
      debugScope: { service: serviceName, client, scope: 'virtualNetworks' },
    })

    const ddosProtectionPlans: DdosProtectionPlanListResult =
      await getAllResources({
        listCall: async (): Promise<DdosProtectionPlansListResponse> =>
          client.ddosProtectionPlans.list(),
        listNextCall: async (
          nextLink: string
        ): Promise<DdosProtectionPlansListNextResponse> =>
          client.ddosProtectionPlans.listNext(nextLink),
        debugScope: {
          service: serviceName,
          client,
          scope: 'ddosProtectionPlans',
        },
      })

    const result: {
      [property: string]: RawAzureVirtualNetwork[]
    } = {}
    let numOfGroups = 0
    virtualNetworks.map(
      ({
        addressSpace,
        tags,
        location,
        ddosProtectionPlan: vnDdosProtectionPlan,
        dhcpOptions: { dnsServers = [] } = {},
        ...rest
      }) => {
        const region = lowerCaseLocation(location)
        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          const resourceGroup = getResourceGroupFromEntity(rest)
          result[region].push({
            ...rest,
            region,
            resourceGroup,
            addressSpacePrefixes: addressSpace?.addressPrefixes || [],
            ddosProtectionPlans: (ddosProtectionPlans || [])?.filter(
              ddosProtectionPlan =>
                caseInsensitiveEqual(
                  vnDdosProtectionPlan.id,
                  ddosProtectionPlan.id
                )
            ),
            dnsServers,
            Tags: tags || {},
          })
          numOfGroups += 1
        }
      }
    )
    logger.debug(lt.foundvirtualNetworks(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
