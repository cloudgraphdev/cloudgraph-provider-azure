import CloudGraph from '@cloudgraph/sdk'

import { User } from '@microsoft/microsoft-graph-types'
import { regionMap } from '../../enums/regions'
import azureLoggerText from '../../properties/logger'
import { AzureServiceConfig, AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { MSGraphClient } from '../../utils/graphApiUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ADUser'

export interface RawAzureADUser extends User {
  region: string
}

class ADUserClient extends MSGraphClient {
  constructor(config: AzureServiceConfig) {
    super({ config, path: '/users' })
  }
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureADUser[]
}> => {
  try {
    const client = new ADUserClient(config)
    let users: User[] = []
    await tryCatchWrapper(
      async () => {
        users = (await client.getData())?.value || []
      },
      {
        service: serviceName,
        client,
        scope: 'fetchFromMSGraphClient',
        operation: '/users',
      }
    )

    const result = { global: [] }
    let numOfUsers = 0
    const region = regionMap.global
    users.map(({ ...rest }) => {
      result.global.push({
        ...rest,
        region,
      })
      numOfUsers += 1
    })
    logger.debug(lt.foundAdUsers(numOfUsers))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
