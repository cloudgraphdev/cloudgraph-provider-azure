import {
  DataFactoryManagementClient,
  IntegrationRuntimeResource,
} from '@azure/arm-datafactory'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import getDataFactories, { RawAzureDataFactory } from '../dataFactory/data'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'DataFactory'

export interface RawAzureIntegrationRuntimeResource
  extends IntegrationRuntimeResource {
  region: string
  resourceGroupId: string
  factoryName: string
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureIntegrationRuntimeResource[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new DataFactoryManagementClient(
      tokenCredentials,
      subscriptionId
    )

    const factories: RawAzureDataFactory[] =
      Object.values(
        await getDataFactories({
          regions,
          config,
          rawData,
          opts,
        })
      )?.reduce((acc, val) => acc.concat(val), []) || []

    const integrationRuntimes: RawAzureIntegrationRuntimeResource[] = []
    await Promise.all(
      (factories || []).map(
        async ({
          name: factoryName,
          resourceGroupId: factoryResourceGroupName,
          region: factoryRegion,
        }) => {
          const integrationRuntimesIterable: PagedAsyncIterableIterator<IntegrationRuntimeResource> =
            client.integrationRuntimes.listByFactory(
              factoryResourceGroupName,
              factoryName
            )
          await tryCatchWrapper(
            async () => {
              for await (const integrationRuntime of integrationRuntimesIterable) {
                if (integrationRuntime) {
                  integrationRuntimes.push({
                    ...integrationRuntime,
                    region: factoryRegion || 'global',
                    resourceGroupId: factoryResourceGroupName,
                    factoryName,
                  })
                }
              }
            },
            {
              service: serviceName,
              client,
              scope: 'integrationRuntimes',
              operation: 'listByFactory',
            }
          )
        }
      )
    )
    logger.debug(lt.foundIntegrationRuntimes(integrationRuntimes.length))

    const result: { [property: string]: RawAzureIntegrationRuntimeResource[] } =
      {}
    integrationRuntimes
      .filter(i => i)
      .map(({ region, ...rest }) => {
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
  } catch (e) {
    logger.error(e)
    return {}
  }
}
