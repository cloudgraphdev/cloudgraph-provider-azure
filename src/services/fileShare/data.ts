import CloudGraph from '@cloudgraph/sdk'
import { FileShareItem, StorageManagementClient } from '@azure/arm-storage'
import azureLoggerText from '../../properties/logger'

import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'

import getStorageAccountData, {
  RawAzureStorageAccount,
} from '../storageAccount/data'

export interface RawAzureFileShareItem
  extends Omit<FileShareItem, 'tags' | 'location'> {
  storageAccountName: string
  resourceGroupId: string
  region: string
}

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'FileShare'

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureFileShareItem[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const client = new StorageManagementClient(tokenCredentials, subscriptionId)
    const storageAccounts: {
      [property: string]: RawAzureStorageAccount[]
    } = await getStorageAccountData({
      regions,
      config,
      rawData,
      opts,
    })

    const fileShareData: RawAzureFileShareItem[] = []

    for (const storageAccount of Object.values(storageAccounts).flat()) {
      const { name: storageAccountName, resourceGroupId } = storageAccount
      const fileShareListIterable = client.fileShares.list(
        resourceGroupId,
        storageAccountName
      )
      await tryCatchWrapper(
        async () => {
          for await (const fileShareItem of fileShareListIterable) {
            if (fileShareItem) {
              fileShareData.push({
                ...fileShareItem,
                resourceGroupId,
                region: storageAccount.region,
                storageAccountName,
              })
            }
          }
        },
        {
          service: serviceName,
          client,
          scope: 'fileShares',
          operation: 'list',
        }
      )
    }

    const result: {
      [property: string]: RawAzureFileShareItem[]
    } = {}
    let numOfGroups = 0
    fileShareData.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          ...rest,
          region,
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundFileShares(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
