import { ComputeManagementClient, VirtualMachine } from '@azure/arm-compute'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'VirtualMachine'

export interface RawAzureVirtualMachine
  extends Omit<VirtualMachine, 'tags' | 'location'> {
  osType: string
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureVirtualMachine[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new ComputeManagementClient(tokenCredentials, subscriptionId)

    const vms: VirtualMachine[] = []
    const vmListIterable = client.virtualMachines.listAll()
    await tryCatchWrapper(
      async () => {
        for await (const vm of vmListIterable) {
          if (vm) {
            vms.push(vm)
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'virtualMachines',
        operation: 'listAll',
      }
    )

    const result: {
      [property: string]: RawAzureVirtualMachine[]
    } = {}
    let numOfGroups = 0
    vms.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          osType: rest.storageProfile?.osDisk?.osType,
          region,
          resourceGroupId,
          Tags: tags || {},
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundvirtualMachines(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
