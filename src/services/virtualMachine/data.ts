import { ComputeManagementClient } from '@azure/arm-compute'
import {
  VirtualMachine,
  VirtualMachineListResult,
  VirtualMachinesListAllNextResponse,
  VirtualMachinesListAllResponse,
} from '@azure/arm-compute/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'
import { parseResourceId } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'VirtualMachine'

export interface RawAzureVirtualMachine
  extends Omit<VirtualMachine, 'tags' | 'location'> {
  resourceGroup: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureVirtualMachine[]
}> => {
  try {
    const { credentials, subscriptionId } = config
    const client = new ComputeManagementClient(credentials, subscriptionId)

    const vmsData: VirtualMachineListResult = await getAllResources({
      listCall: async (): Promise<VirtualMachinesListAllResponse> =>
        client.virtualMachines.listAll(),
      listNextCall: async (
        nextLink: string
      ): Promise<VirtualMachinesListAllNextResponse> =>
        client.virtualMachines.listAllNext(nextLink),
      debugScope: { service: serviceName, client, scope: 'virtualMachines' },
    })

    const result = {}
    let numOfGroups = 0
    vmsData.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroup = parseResourceId(rest.id).resourceGroups
        result[region].push({
          ...rest,
          resourceGroup,
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
