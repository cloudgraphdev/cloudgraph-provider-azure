import CloudGraph from '@cloudgraph/sdk'
import {
  ComputeManagementClient,
  VirtualMachineScaleSet,
} from '@azure/arm-compute'

import azureLoggerText from '../../properties/logger'
import { lowerCaseLocation } from '../../utils/format'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'VirtualMachineScaleSet'

export interface RawAzureVirtualMachineScaleSet
  extends Omit<VirtualMachineScaleSet, 'tags' | 'location'> {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureVirtualMachineScaleSet[]
}> => {
  const { tokenCredentials, subscriptionId } = config
  const client = new ComputeManagementClient(tokenCredentials, subscriptionId)

  try {
    const virtualMachineScaleSets: VirtualMachineScaleSet[] = []
    const virtualMachineScaleSetListIterable =
      client.virtualMachineScaleSets.listAll()
    await tryCatchWrapper(
      async () => {
        for await (const virtualMachineScaleSet of virtualMachineScaleSetListIterable) {
          if (virtualMachineScaleSet) {
            virtualMachineScaleSets.push(virtualMachineScaleSet)
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'virtualMachineScaleSets',
        operation: 'listAll',
      }
    )

    const result: { [property: string]: RawAzureVirtualMachineScaleSet[] } = {}
    let numOfGroups = 0
    virtualMachineScaleSets.map(({ tags, location, ...rest }) => {
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
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundvirtualMachinesScaleSets(numOfGroups))

    return result
  } catch (e) {
    logger.debug(e)
    return {}
  }
}
