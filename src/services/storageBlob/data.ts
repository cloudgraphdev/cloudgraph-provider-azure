import CloudGraph from '@cloudgraph/sdk'
import {
  BlobItem,
  ContainerClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob'

import getStorageContainerData, {
  RawAzureStorageContainer,
} from '../storageContainer/data'
import azureLoggerText from '../../properties/logger'

import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils'

export interface RawAzureStorageBlob extends Omit<BlobItem, 'tags'> {
  region: string
  resourceGroupId: string
  storageContainerId: string
  storageAccountName: string
  storageContainerName: string
  Tags: TagMap
}

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'StorageBlob'

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureStorageBlob[]
}> => {
  try {
    const storageContainers: {
      [property: string]: RawAzureStorageContainer[]
    } = await getStorageContainerData({
      regions,
      config,
      rawData,
      opts,
    })

    const storageBlobData: RawAzureStorageBlob[] = []
    for (const storageContainer of Object.values(storageContainers).flat()) {
      const {
        storageAccountName: accountName,
        keys,
        name: containerName,
        id: storageContainerId,
      } = storageContainer

      const [mainKey] = keys
      const sharedKeyCredential = new StorageSharedKeyCredential(
        accountName,
        mainKey.value
      )

      const client = new ContainerClient(
        `https://${accountName}.blob.core.windows.net/${containerName}`,
        sharedKeyCredential
      )

      const blobsIterable = client.listBlobsFlat()
      // This patch is to prevent throwing an unnecessary exception
      // if the registered app doesn't
      // have the "Microsoft.Storage/storageAccounts/listKeys/action" permission
      try {
        await tryCatchWrapper(
          async () => {
            for await (const blobItem of blobsIterable) {
              if (blobItem) {
                const { tags, ...blob } = blobItem
                storageBlobData.push({
                  ...blob,
                  storageContainerId,
                  storageAccountName: accountName,
                  storageContainerName: containerName,
                  resourceGroupId: storageContainer.resourceGroupId,
                  region: storageContainer.region,
                  Tags: tags,
                })
              }
            }
          },
          {
            service: serviceName,
            client,
            scope: 'storageBlobs',
            operation: 'list',
          }
        )
      } catch (error) {
        if (error.statusCode === 401) {
          logger.debug(
            "List blobs: 'Microsoft.Storage/storageAccounts/listKeys/action' API permission missing. We're working on a solution for this!"
          )
        }
        logger.debug(error)
      }
    }

    const result: {
      [property: string]: RawAzureStorageBlob[]
    } = {}
    let numOfGroups = 0
    storageBlobData.map(({ region, ...rest }) => {
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
    logger.debug(lt.foundStorageBlobs(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
  }
}
