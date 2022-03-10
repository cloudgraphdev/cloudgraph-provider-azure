import {
  DdosProtectionPlan,
  NetworkManagementClient,
  VirtualNetwork,
} from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { caseInsensitiveEqual, tryCatchWrapper } from '../../utils'
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
  resourceGroupId: string
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
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const virtualNetworks: VirtualNetwork[] = []
    await tryCatchWrapper(
      async () => {
        const virtualNetworkIterable: PagedAsyncIterableIterator<VirtualNetwork> =
          client.virtualNetworks.listAll()
        for await (const virtualNetwork of virtualNetworkIterable) {
          virtualNetwork && virtualNetworks.push(virtualNetwork)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'virtualNetworks',
        operation: 'listAll'
      }
    )

    const ddosProtectionPlans: DdosProtectionPlan[] = []
    await tryCatchWrapper(
      async () => {
        const ddosProtectionPlanIterable: PagedAsyncIterableIterator<DdosProtectionPlan> =
          client.ddosProtectionPlans.list()
        for await (const ddosProtectionPlan of ddosProtectionPlanIterable) {
          ddosProtectionPlan && ddosProtectionPlans.push(ddosProtectionPlan)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'ddosProtectionPlans',
        operation: 'list'
      }
    )

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
          const resourceGroupId = getResourceGroupFromEntity(rest)
          result[region].push({
            ...rest,
            region,
            resourceGroupId,
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
