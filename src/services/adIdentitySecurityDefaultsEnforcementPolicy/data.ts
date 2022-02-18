import CloudGraph from '@cloudgraph/sdk'

import { IdentitySecurityDefaultsEnforcementPolicy } from '@microsoft/microsoft-graph-types'
import { isEmpty } from 'lodash'
import azureLoggerText from '../../properties/logger'
import { regionMap } from '../../enums/regions'
import { AzureServiceConfig, AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { MSGraphClient } from '../../utils/graphApiUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ADIdentitySecurityDefaultsEnforcementPolicy'

export interface RawAzureADIdentitySecurityDefaultsEnforcementPolicyClient
  extends IdentitySecurityDefaultsEnforcementPolicy {
  region: string
}

class AzureADIdentitySecurityDefaultsEnforcementPolicyClient extends MSGraphClient {
  constructor(config: AzureServiceConfig) {
    super({
      config,
      path: '/policies/identitySecurityDefaultsEnforcementPolicy',
    })
  }
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [
    property: string
  ]: RawAzureADIdentitySecurityDefaultsEnforcementPolicyClient[]
}> => {
  try {
    const client = new AzureADIdentitySecurityDefaultsEnforcementPolicyClient(
      config
    )
    let identitySecurityDefaults = {}
    await tryCatchWrapper(
      async () => {
        identitySecurityDefaults = (await client.getData()) || {}
      },
      {
        service: serviceName,
        client,
        scope: 'fetchFromMSGraphClient',
        operation: '/policies/identitySecurityDefaultsEnforcementPolicy',
      }
    )

    const result = { global: [] }
    if (!isEmpty(identitySecurityDefaults)) {
      result.global.push({
        ...identitySecurityDefaults,
        region: regionMap.global,
      })
    }

    logger.debug(
      lt.foundAdIdentitySecurityDefaultsEnforcementPolicy(
        !isEmpty(identitySecurityDefaults) ? 1 : 0
      )
    )

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
