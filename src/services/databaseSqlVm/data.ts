import { SqlVirtualMachineManagementClient } from '@azure/arm-sqlvirtualmachine'
import { SqlVirtualMachine, SqlVirtualMachinesListResponse } from '@azure/arm-sqlvirtualmachine/src/models'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'SQL Virtual Machine'

export interface RawAzureDatabaseSqlVm
  extends Omit<SqlVirtualMachine, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDatabaseSqlVm[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new SqlVirtualMachineManagementClient(
      tokenCredentials,
      subscriptionId
    )
    const sqlVms: SqlVirtualMachine[] = []
    const sqlVmIterable: SqlVirtualMachinesListResponse = await client.sqlVirtualMachines.list()
    await tryCatchWrapper(
      async () => {
        for await (const vm of sqlVmIterable) {
          sqlVms.push(vm)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'sqlVirtualMachines',
        operation: 'list',
      }
    )
    logger.debug(lt.foundDatabaseSqlVm(sqlVms.length))

    const result: { [property: string]: RawAzureDatabaseSqlVm[] } = {}
    sqlVms.map(({ tags, location, ...rest }) => {
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
