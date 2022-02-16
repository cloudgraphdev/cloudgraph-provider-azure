import CloudGraph from '@cloudgraph/sdk'

import { ServicePrincipal } from '@microsoft/microsoft-graph-types'
import azureLoggerText from '../../properties/logger'
import { regionMap } from '../../enums/regions'
import { AzureServiceConfig, AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { MSGraphClient } from '../../utils/graphApiUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ADServicePrincipal'

export interface RawAzureADServicePrincipal
  extends Omit<ServicePrincipal, 'tags' | 'location'> {
  Tags: TagMap
}

class AzureADServicePrincipalClient extends MSGraphClient {
  constructor(config: AzureServiceConfig) {
    super({ config, path: '/servicePrincipals' })
  }
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureADServicePrincipal[]
}> => {
  try {
    const client = new AzureADServicePrincipalClient(config)
    let servicePrincipals: ServicePrincipal[] = []
    await tryCatchWrapper(
      async () => {
        servicePrincipals = (await client.getData())?.value || []
      },
      {
        service: serviceName,
        client,
        scope: 'fetchFromMSGraphClient',
        operation: '/servicePrincipals',
      }
    )

    const result = {global: []}
    let numOfGroups = 0
    const region = regionMap.global
    servicePrincipals.map(({ tags, ...rest }) => {
      result.global.push({
        ...rest,
        region,
        Tags: { ...tags }, // Array to Object
      })
      numOfGroups += 1
    })
    logger.debug(lt.foundAdServicePrincipals(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
