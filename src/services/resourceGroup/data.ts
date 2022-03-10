import { ResourceGroup, ResourceManagementClient } from '@azure/arm-resources'
import CloudGraph from '@cloudgraph/sdk'
import isEmpty from 'lodash/isEmpty'

import services from '../../enums/services'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ResourceGroup'

export interface RawAzureResourceGroup
  extends Omit<ResourceGroup, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureResourceGroup[]
}> => {
  try {
    const existingData: { [property: string]: RawAzureResourceGroup[] } =
      rawData.find(({ name }) => name === services.resourceGroup)?.data || {}
    if (isEmpty(existingData)) {
      // Refresh data
      const { tokenCredentials, subscriptionId } = config
      const client = new ResourceManagementClient(
        tokenCredentials,
        subscriptionId
      )
      const resourceGroups: ResourceGroup[] = []
      const resourceGroupListIterable = client.resourceGroups.list()
      await tryCatchWrapper(
        async () => {
          for await (const resourceGroup of resourceGroupListIterable) {
            if (resourceGroup) {
              resourceGroups.push(resourceGroup)
            }
          }
        },
        {
          service: serviceName,
          client,
          scope: 'resourceGroups',
          operation: 'list',
        }
      )

      const result = {}
      let numOfGroups = 0
      resourceGroups.map(({ tags, location, ...rest }) => {
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
      logger.debug(lt.foundResourceGroups(numOfGroups))

      return result
    }
    return existingData
  } catch (e) {
    logger.error(e)
    return {}
  }
}
