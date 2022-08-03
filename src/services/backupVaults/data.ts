import CloudGraph from '@cloudgraph/sdk'

import { isEmpty } from 'lodash'
import services from '../../enums/services'
import azureLoggerText from '../../properties/logger'
import {
  AzureRestApiNewClientParams,
  AzureServiceInput,
  TagMap
} from '../../types'
import { tryCatchWrapper } from '../../utils'
import { RestApiClient } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { BackupVaultResource } from './utils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Backup Vaults'

export interface RawAzureBackupVault extends Omit<BackupVaultResource, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureBackupVault[]
}> => {
  try {
    const existingData: { [property: string]: RawAzureBackupVault[] } =
      rawData.find(({ name }) => name === services.backupVaults)?.data || {}

    if (isEmpty(existingData)) {
      const client = new RestApiClient({
        config,
        options: { version: '2021-01-01' },
      } as AzureRestApiNewClientParams)

      const vaults: BackupVaultResource[] = []
      await tryCatchWrapper(
        async () => {
          const backupVaults = await client.listData({
            path: '/providers/Microsoft.DataProtection/backupVaults',
          })
          if (backupVaults) {
            vaults.push(...backupVaults)
          }
        },
        {
          service: serviceName,
          client,
          scope: 'backupVaults',
          operation: 'getInSubscription',
        }
      )
      logger.debug(lt.foundBackupVaults(vaults.length))

      const result: {
        [property: string]: RawAzureBackupVault[]
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
