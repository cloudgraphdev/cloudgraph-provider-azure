import { RecoveryServicesClient, Vault } from '@azure/arm-recoveryservices'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import { isEmpty } from 'lodash'
import services from '../../enums/services'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Recovery Vaults'

export interface RawAzureRecoveryVault
  extends Omit<Vault, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureRecoveryVault[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config

    const existingData: { [property: string]: RawAzureRecoveryVault[] } =
      rawData.find(({ name }) => name === services.recoveryVaults)?.data || {}

    if (isEmpty(existingData)) {
      const client = new RecoveryServicesClient(
        tokenCredentials,
        subscriptionId
      )

      const vaults: Vault[] = []
      const vaultsIterable: PagedAsyncIterableIterator<Vault> =
        client.vaults.listBySubscriptionId()
      await tryCatchWrapper(
        async () => {
          for await (const vault of vaultsIterable) {
            vaults.push(vault)
          }
        },
        {
          service: serviceName,
          client,
          scope: 'vaults',
          operation: 'listBySubscriptionId',
        }
      )
      logger.debug(lt.foundRecoveryVaults(vaults.length))

      const result: {
        [property: string]: RawAzureRecoveryVault[]
      } = {}
      await Promise.all(
        vaults.map(async ({ tags, location, ...rest }) => {
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
          }
        })
      )
      return result
    }
    return existingData
  } catch (e) {
    logger.error(e)
    return {}
  }
}
