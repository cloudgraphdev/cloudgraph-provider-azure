import { RecoveryServicesClient, Vault } from '@azure/arm-recoveryservices'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'RecoveryVaults'

export interface RawAzureRecoveryVault
  extends Omit<Vault, 'tags' | 'location'> {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureRecoveryVault[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new RecoveryServicesClient(tokenCredentials, subscriptionId)
    const recoveryVaults: RawAzureRecoveryVault[] = []
    await tryCatchWrapper(
      async () => {
        const vaultsIterable: PagedAsyncIterableIterator<Vault> =
          client.vaults.listBySubscriptionId()
        for await (const vault of vaultsIterable) {
          if (vault) {
            const resourceGroupId = getResourceGroupFromEntity(vault)
            const { location, tags, ...rest } = vault
            recoveryVaults.push({
              ...rest,
              region: lowerCaseLocation(location),
              resourceGroupId,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'vaults',
        operation: 'listBySubscriptionId',
      }
    )
    logger.debug(lt.foundRecoveryVaults(recoveryVaults.length))

    const result: { [property: string]: RawAzureRecoveryVault[] } = {}
    recoveryVaults.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          region,
          ...rest,
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
