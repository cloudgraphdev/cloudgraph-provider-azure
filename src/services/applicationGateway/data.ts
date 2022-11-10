import { ApplicationGateway, NetworkManagementClient } from '@azure/arm-network'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ApplicationGateway'

export interface RawAzureApplicationGateway
  extends Omit<ApplicationGateway, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureApplicationGateway[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new NetworkManagementClient(tokenCredentials, subscriptionId)

    const applicationGatewayData: ApplicationGateway[] = []
    await tryCatchWrapper(
      async () => {
        const applicationGatewayIterable: PagedAsyncIterableIterator<ApplicationGateway> =
          client.applicationGateways.listAll()
        for await (const applicationGateway of applicationGatewayIterable) {
          applicationGateway && applicationGatewayData.push(applicationGateway)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'applicationGateway',
        operation: 'listAll'
      }
    )

    const result: {
      [property: string]: RawAzureApplicationGateway[]
    } = {}
    let numOfGroups = 0
    applicationGatewayData.map(({ tags, location, ...rest }) => {
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
          Tags: tags || {},
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundApplicationGateway(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
