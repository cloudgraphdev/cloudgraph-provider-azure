import CloudGraph from '@cloudgraph/sdk'

import { Application } from '@microsoft/microsoft-graph-types'
import { DirectoryObject } from '@microsoft/microsoft-graph-types-beta'
import azureLoggerText from '../../properties/logger'
import { AzureServiceConfig, AzureServiceInput, TagMap } from '../../types'
import { MSGraphClient } from '../../utils/graphApiUtils'
import { tryCatchWrapper } from '../../utils/index'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ADApplication'

export interface RawAzureADApplication extends Omit<Application, 'tags'> {
  region: string
  Tags: TagMap
}

class AzureADApplicationClient extends MSGraphClient {
  constructor(config: AzureServiceConfig) {
    super({ config, path: '/applications' })
  }
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureADApplication[]
}> => {
  try {
    const client = new AzureADApplicationClient(config)
    let applications: Application[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        applications = (await client.getData())?.value || []
        let numOfGroups = 0
        const region = regionMap.global
        applications.map(async ({ id, tags, ...rest }) => {
          const owners: DirectoryObject[] =
            (await client.getData(`/${id}/owners`))?.value || []
          result.global.push({
            id,
            ...rest,
            owners,
            region,
            Tags: { ...tags }, // Array to Object
          })
          numOfGroups += 1
        })
        logger.debug(lt.foundAdApplications(numOfGroups))
      },
      {
        service: serviceName,
        client,
        scope: 'fetchFromMSGraphClient',
        operation: '/applications',
      }
    )
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
