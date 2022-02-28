import CloudGraph from '@cloudgraph/sdk'
import { ComputeManagementClient } from '@azure/arm-compute'
import {
  VirtualMachineScaleSet,
  VirtualMachineScaleSetsListResponse,
  VirtualMachineScaleSetsListNextResponse,
} from '@azure/arm-compute/esm/models'

import azureLoggerText from '../../properties/logger'
import { getAllResources } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

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
  const { credentials, subscriptionId } = config
  const client = new ComputeManagementClient(credentials, subscriptionId)

  try {
    const vmScaleSetData: VirtualMachineScaleSet[] = await getAllResources({
      listCall: async (): Promise<VirtualMachineScaleSetsListResponse> =>
        client.virtualMachineScaleSets.listAll(),
      listNextCall: async (
        nextLink: string
      ): Promise<VirtualMachineScaleSetsListNextResponse> =>
        client.virtualMachineScaleSets.listNext(nextLink),
      debugScope: {
        service: serviceName,
        client,
        scope: 'virtualMachineScaleSets',
      },
    })

    const result: { [property: string]: RawAzureVirtualMachineScaleSet[] } = {}
    let numOfGroups = 0
    vmScaleSetData.map(({ tags, location, ...rest }) => {
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
