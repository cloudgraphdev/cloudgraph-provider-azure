import { DataFactoryManagementClient, Factory } from '@azure/arm-datafactory'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import { isEmpty } from 'lodash'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'
import services from '../../enums/services'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'DataFactory'

export interface RawAzureDataFactory
  extends Omit<Factory, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDataFactory[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config

    const existingData: { [property: string]: RawAzureDataFactory[] } =
      rawData.find(({ name }) => name === services.dataFactory)?.data || {}

    if (isEmpty(existingData)) {
      const client = new DataFactoryManagementClient(
        tokenCredentials,
        subscriptionId
      )

      const factories: RawAzureDataFactory[] = []
      const factoriesIterable: PagedAsyncIterableIterator<Factory> =
        client.factories.list()
      await tryCatchWrapper(
        async () => {
          for await (const {
            location,
            tags,
            ...restOfFactory
          } of factoriesIterable) {
            const resourceGroupId = getResourceGroupFromEntity(restOfFactory)
            factories.push({
              region: lowerCaseLocation(location),
              Tags: tags || {},
              resourceGroupId,
              ...restOfFactory,
            })
          }
        },
        {
          service: serviceName,
          client,
          scope: 'factories',
          operation: 'list',
        }
      )
      logger.debug(lt.foundDataFactory(factories.length))

      const result: { [property: string]: RawAzureDataFactory[] } = {}
      factories.map(({ region, tags, ...rest }) => {
        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          const resourceGroupId = getResourceGroupFromEntity(rest)
          result[region].push({
            region,
            ...rest,
            resourceGroupId,
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
