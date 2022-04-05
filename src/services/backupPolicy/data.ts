import {
  RecoveryServicesBackupClient,
  ProtectionPolicyResource,
} from '@azure/arm-recoveryservicesbackup'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils'
import getAzureVaults, { RawAzureVault } from '../backupVault/data'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Backup Policy'

export interface RawAzureProtectionPolicyResource
  extends Omit<ProtectionPolicyResource, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
  vaultName: string
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureProtectionPolicyResource[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new RecoveryServicesBackupClient(
      tokenCredentials,
      subscriptionId
    )

    const vaults: RawAzureVault[] =
      Object.values(
        await getAzureVaults({
          regions,
          config,
          rawData,
          opts,
        })
      )?.reduce((acc, val) => acc.concat(val), []) || []

    const items: RawAzureProtectionPolicyResource[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (vaults || []).map(async ({ name: vaultName, resourceGroupId }) => {
            const itemsIterable: PagedAsyncIterableIterator<ProtectionPolicyResource> =
              client.backupPolicies.list(vaultName, resourceGroupId)
            for await (const item of itemsIterable) {
              if (item) {
                const { location, tags, ...rest } = item
                const region =
                  (location && lowerCaseLocation(location)) || 'global'
                items.push({
                  ...rest,
                  region,
                  resourceGroupId,
                  Tags: tags || {},
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

    const result: { [property: string]: RawAzureProtectionPolicyResource[] } =
      {}
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
