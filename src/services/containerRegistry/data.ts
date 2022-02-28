import {
  ContainerRegistryManagementClient,
  Registry,
} from '@azure/arm-containerregistry'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import isEmpty from 'lodash/isEmpty'

import azureLoggerText from '../../properties/logger'
import services from '../../enums/services'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ContainerRegistry'

export interface RawAzureContainerRegistry
  extends Omit<Registry, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureContainerRegistry[]
}> => {
  try {
    const existingData: { [property: string]: RawAzureContainerRegistry[] } =
      rawData.find(({ name }) => name === services.containerRegistry)?.data ||
      {}

    if (isEmpty(existingData)) {
      const { tokenCredentials, subscriptionId } = config
      const client = new ContainerRegistryManagementClient(
        tokenCredentials,
        subscriptionId
      )

      const containerRegistries: RawAzureContainerRegistry[] = []
      const containerRegistryIterable: PagedAsyncIterableIterator<Registry> =
        client.registries.list()
      await tryCatchWrapper(
        async () => {
          for await (const containerRegistry of containerRegistryIterable) {
            if (containerRegistry) {
              const { location, tags, ...rest } = containerRegistry
              const resourceGroupId = getResourceGroupFromEntity(rest)
              const region = location && lowerCaseLocation(location)
              containerRegistries.push({
                ...rest,
                region,
                resourceGroupId,
                Tags: tags || {},
              })
            }
          }
        },
        {
          service: serviceName,
          client,
          scope: 'registries',
          operation: 'list',
        }
      )
      logger.debug(lt.foundContainerRegistries(containerRegistries.length))

      const result: { [property: string]: RawAzureContainerRegistry[] } = {}
      containerRegistries.map(({ region, ...rest }) => {
        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          result[region].push({
            region,
            ...rest,
          })
        }
      })
      return result
    }
    return existingData
  } catch (e) {
    logger.error(e)
    return {}
  }
}
