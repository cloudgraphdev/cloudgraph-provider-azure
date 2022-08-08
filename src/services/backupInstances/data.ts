import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureRestApiNewClientParams, AzureServiceInput, BackupInstanceResource } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { RestApiClient } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'
import getAzureVaults, { RawAzureBackupVault } from '../backupVaults/data'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Backup Instances'

export interface RawAzureBackupInstanceResource extends BackupInstanceResource {
  region: string
  resourceGroupId: string
  vaultName: string
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureBackupInstanceResource[]
}> => {
  try {
    const client = new RestApiClient({
      config,
      options: { version: '2021-01-01' },
    } as AzureRestApiNewClientParams)

    const vaults: RawAzureBackupVault[] =
      Object.values(
        await getAzureVaults({
          regions,
          config,
          rawData,
          opts,
        })
      )?.reduce((acc, val) => acc.concat(val), []) || []

    const items: RawAzureBackupInstanceResource[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (vaults || []).map(async ({ name: vaultName, resourceGroupId }) => {
            const backupInstances = await client.listData({
              path: `/resourceGroups/${resourceGroupId}/providers/Microsoft.DataProtection/backupVaults/${vaultName}/backupInstances`,
            })
            for (const item of backupInstances) {
              if (item) {
                const { location, ...rest } = item
                const region =
                  (location && lowerCaseLocation(location)) || 'global'
                items.push({
                  ...rest,
                  region,
                  resourceGroupId,
                  vaultName,
                })
              }
            }
          })
        )
        logger.debug(lt.foundBackupInstances(items.length))
      },
      {
        service: serviceName,
        client,
        scope: 'backupInstances',
        operation: 'list',
      }
    )

    const result: { [property: string]: RawAzureBackupInstanceResource[] } = {}
    await Promise.all(
      items
        .filter(i => i)
        .map(async ({ region, ...rest }) => {
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
    )
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
