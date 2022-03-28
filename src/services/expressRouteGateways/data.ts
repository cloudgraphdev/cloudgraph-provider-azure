import { NetworkManagementClient, ExpressRouteGateway } from '@azure/arm-network'
import CloudGraph from '@cloudgraph/sdk'
import getResourceGroupData from '../resourceGroup/data'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { getResourceGroupNames } from '../../utils/format'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ExpressRouteGateways'

export interface RawAzureExpressRouteGateway extends ExpressRouteGateway {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureExpressRouteGateway[]
}> => {
  try {
    const resourceGroups = await getResourceGroupData({
      regions,
      config,
      rawData,
      opts,
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)
    const gateways: RawAzureExpressRouteGateway[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (resourceGroupsNames || []).map(async (rgName: string) => {
            const expressRouteGatewayList = await client.expressRouteGateways.listByResourceGroup(rgName)
            for (const gateway of expressRouteGatewayList?.value) {
              if (gateway) {
                const { tags, ...rest } = gateway
                const region = regionMap.global
                gateways.push({
                  ...rest,
                  region,
                  resourceGroupId: rgName,
                  Tags: tags || {},
                })
              }
            }
          })
        )
      },
      {
        service: serviceName,
        client,
        scope: 'expressRouteGateways',
        operation: 'listByResourceGroup',
      }
    )
    logger.debug(lt.foundExpressRouteGateways(gateways.length))

    gateways.map(({ region, ...rest }) => {
      result.global.push({
        ...rest,
        region,
      })
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
