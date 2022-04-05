import { RecoveryServicesClient, Vault } from '@azure/arm-recoveryservices'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import { isEmpty } from 'lodash'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'
import services from '../../enums/services'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'BackupVault'

export interface RawAzureVault extends Omit<Vault, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureVault[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config

    const existingData: { [property: string]: RawAzureVault[] } =
      rawData.find(({ name }) => name === services.backupVault)?.data || {}

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
      logger.debug(lt.foundBackupVaults(vaults.length))

      const result: {
        [property: string]: RawAzureVault[]
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
