import {
  DataFactoryManagementClient,
  DataFlowResource,
  DatasetResource,
  Factory,
  PipelineResource,
} from '@azure/arm-datafactory'
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
  pipelines: PipelineResource[]
  dataFlows: DataFlowResource[]
  datasets: DatasetResource[]
}

const getPipelines = async ({
  client,
  resourceGroupName,
  factoryName,
}: {
  client: DataFactoryManagementClient
  resourceGroupName: string
  factoryName: string
}): Promise<PipelineResource[]> => {
  const pipelines: PipelineResource[] = []
  const pipelinesIterable: PagedAsyncIterableIterator<PipelineResource> =
    client.pipelines.listByFactory(resourceGroupName, factoryName)

  await tryCatchWrapper(
    async () => {
      for await (const pipeline of pipelinesIterable) {
        if (pipeline) {
          pipelines.push(pipeline)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'pipelines',
      operation: 'listByFactory',
    }
  )
  return pipelines
}

const getDataFlows = async ({
  client,
  resourceGroupName,
  factoryName,
}: {
  client: DataFactoryManagementClient
  resourceGroupName: string
  factoryName: string
}): Promise<DataFlowResource[]> => {
  const flows: DataFlowResource[] = []
  const flowsIterable: PagedAsyncIterableIterator<DataFlowResource> =
    client.dataFlows.listByFactory(resourceGroupName, factoryName)

  await tryCatchWrapper(
    async () => {
      for await (const flow of flowsIterable) {
        if (flow) {
          flows.push(flow)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'flows',
      operation: 'listByFactory',
    }
  )
  return flows
}

const getDatasets = async ({
  client,
  resourceGroupName,
  factoryName,
}: {
  client: DataFactoryManagementClient
  resourceGroupName: string
  factoryName: string
}): Promise<DatasetResource[]> => {
  const datasets: DatasetResource[] = []
  const datasetsIterable: PagedAsyncIterableIterator<DatasetResource> =
    client.datasets.listByFactory(resourceGroupName, factoryName)

  await tryCatchWrapper(
    async () => {
      for await (const dataset of datasetsIterable) {
        if (dataset) {
          datasets.push(dataset)
        }
      }
    },
    {
      service: serviceName,
      client,
      scope: 'datasets',
      operation: 'listByFactory',
    }
  )
  return datasets
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
          for await (const factory of factoriesIterable) {
            if (factory) {
              const { location, tags, ...restOfFactory } = factory
              const resourceGroupId = getResourceGroupFromEntity(restOfFactory)
              const pipelines = await getPipelines({
                client,
                resourceGroupName: resourceGroupId,
                factoryName: factory.name,
              })
              const dataFlows = await getDataFlows({
                client,
                resourceGroupName: resourceGroupId,
                factoryName: factory.name,
              })
              const datasets = await getDatasets({
                client,
                resourceGroupName: resourceGroupId,
                factoryName: factory.name,
              })
              factories.push({
                region: lowerCaseLocation(location),
                Tags: tags || {},
                resourceGroupId,
                pipelines,
                dataFlows,
                datasets,
                ...restOfFactory,
              })
            }
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
      factories.forEach(({ region, tags, ...rest }) => {
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
