import { SqlManagementClient, ManagedInstance } from '@azure/arm-sql'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ManagedSQLInstance'

export interface RawAzureDatabaseManagedSqlInstance
  extends Omit<ManagedInstance, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDatabaseManagedSqlInstance[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new SqlManagementClient(tokenCredentials, subscriptionId)

    const managedInstances: ManagedInstance[] = []
    const managedInstancesIterable: PagedAsyncIterableIterator<ManagedInstance> =
      client.managedInstances.list()
    await tryCatchWrapper(
      async () => {
        for await (const instance of managedInstancesIterable) {
          instance && managedInstances.push(instance)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'managedInstances',
        operation: 'list',
      }
    )
    logger.debug(lt.foundManagedSqlInstance(managedInstances.length))

    const result: { [property: string]: RawAzureDatabaseManagedSqlInstance[] } =
      {}
    managedInstances.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          resourceGroupId,
          region,
          Tags: tags || {},
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
