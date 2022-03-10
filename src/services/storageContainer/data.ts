import CloudGraph from '@cloudgraph/sdk'

import {
  ListContainerItem,
  StorageAccountKey,
  StorageManagementClient,
} from '@azure/arm-storage'
import isEmpty from 'lodash/isEmpty'
import getStorageAccountData, {
  RawAzureStorageAccount,
} from '../storageAccount/data'
import azureLoggerText from '../../properties/logger'

import { AzureServiceInput } from '../../types'
import services from '../../enums/services'
import { tryCatchWrapper } from '../../utils'

export interface RawAzureStorageContainer extends ListContainerItem {
  storageAccountId: string
  storageAccountName: string
  keys: StorageAccountKey[]
  region: string
  resourceGroupId: string
}

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'StorageContainer'

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureStorageContainer[]
}> => {
  const { subscriptionId, tokenCredentials } = config
  const client = new StorageManagementClient(tokenCredentials, subscriptionId)

  try {
    const existingData: { [property: string]: RawAzureStorageContainer[] } =
      rawData.find(({ name }) => name === services.storageContainer)?.data || {}

    if (isEmpty(existingData)) {
      const storageAccounts: {
        [property: string]: RawAzureStorageAccount[]
      } = await getStorageAccountData({
        regions,
        config,
        rawData,
        opts,
      })

      const storageContainerData: RawAzureStorageContainer[] = []

      for (const storageAccount of Object.values(storageAccounts).flat()) {
        const { name: accountName, keys, resourceGroupId } = storageAccount
        const blobContainers: ListContainerItem[] = []
        const blobContainerListIterable = client.blobContainers.list(
          resourceGroupId,
          accountName
        )
        await tryCatchWrapper(
          async () => {
            for await (const blobContainer of blobContainerListIterable) {
              if (blobContainer) {
                blobContainers.push(blobContainer)
              }
            }
          },
          {
            service: serviceName,
            client,
            scope: 'blobContainers',
            operation: '',
          }
        )

        for (const blobContainer of blobContainers) {
          storageContainerData.push({
            ...blobContainer,
            resourceGroupId,
            storageAccountId: storageAccount.id,
            storageAccountName: accountName,
            keys,
            region: storageAccount.region,
          })
        }
      }

      const result: {
        [property: string]: RawAzureStorageContainer[]
      } = {}
      let numOfGroups = 0
      storageContainerData.map(({ region, ...rest }) => {
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
      logger.debug(lt.foundStorageContainers(numOfGroups))
      return result
    }
    return existingData
  } catch (e) {
    logger.error(e)
  }
}
