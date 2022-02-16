import CloudGraph from '@cloudgraph/sdk'

import { Group } from '@microsoft/microsoft-graph-types'
import azureLoggerText from '../../properties/logger'
import { AzureServiceConfig, AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { MSGraphClient } from '../../utils/graphApiUtils'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ADGroup'

export interface RawAzureADGroup extends Group {
  region: string
}

class AzureADGroupClient extends MSGraphClient {
  constructor(config: AzureServiceConfig) {
    super({ config, path: '/groups' })
  }
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureADGroup[]
}> => {
  try {
    const client = new AzureADGroupClient(config)
    let groups: Group[] = []
    await tryCatchWrapper(
      async () => {
        groups = (await client.getData())?.value || []
      },
      {
        service: serviceName,
        client,
        scope: 'fetchFromMSGraphClient',
        operation: '/groups',
      }
    )

    const result = { global: [] }
    let numOfGroups = 0
    const region = regionMap.global
    groups.map(({ ...rest }) => {
      result.global.push({
        ...rest,
        region,
      })
      numOfGroups += 1
    })
    logger.debug(lt.foundAdGroups(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
