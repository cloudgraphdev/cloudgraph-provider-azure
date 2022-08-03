import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureRestApiNewClientParams, AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { RestApiClient } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'
import getAzureVaults, { RawAzureBackupVault } from '../backupVaults/data'
import { BackupPolicyResource } from './utils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Backup Policies'

export interface RawAzureBackupPolicyResource extends BackupPolicyResource {
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
  [property: string]: RawAzureBackupPolicyResource[]
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

    const items: RawAzureBackupPolicyResource[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (vaults || []).map(async ({ name: vaultName, resourceGroupId }) => {
            const backupPolicies = await client.listData({
              path: `/resourceGroups/${resourceGroupId}/providers/Microsoft.DataProtection/backupVaults/${vaultName}/backupPolicies`,
            })
            for (const item of backupPolicies) {
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
        logger.debug(lt.foundBackupPolicies(items.length))
      },
      {
        service: serviceName,
        client,
        scope: 'backupPolicies',
        operation: 'list',
      }
    )

    const result: { [property: string]: RawAzureBackupPolicyResource[] } = {}
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
