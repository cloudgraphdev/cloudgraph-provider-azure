import CloudGraph from '@cloudgraph/sdk'

import { StorageManagementClient } from '@azure/arm-storage'
import {
  BlobContainersListNextResponse,
  BlobContainersListResponse,
  ListContainerItem,
  ListContainerItems,
} from '@azure/arm-storage/esm/models'
import getStorageAccountData from '../storageAccount/data'
import azureLoggerText from '../../properties/logger'

import { AzureServiceInput } from '../../types'
import { getAllResources } from '../../utils/apiUtils'

export interface RawAzureStorageContainer extends ListContainerItem {
  storageAccountId: string
  region: string
  resourceGroup: string
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
  const { subscriptionId, credentials } = config
  const client = new StorageManagementClient(credentials, subscriptionId)

  try {
    const storageAccounts = await getStorageAccountData({
      regions,
      config,
      rawData,
      opts,
    })

    const storageContainerData: RawAzureStorageContainer[] = []

    for (const storageAccount of Object.values(storageAccounts).flat()) {
      const { name: accountName, resourceGroup } = storageAccount

      const blobContainers: ListContainerItems = await getAllResources({
        listCall: async (): Promise<BlobContainersListResponse> =>
          client.blobContainers.list(resourceGroup, accountName),
        listNextCall: async (
          nextLink: string
        ): Promise<BlobContainersListNextResponse> =>
          client.blobContainers.listNext(nextLink),
        debugScope: {
          service: serviceName,
          client,
          scope: 'storageContainers',
        },
      })

      for (const blobContainer of blobContainers) {
        storageContainerData.push({
          ...blobContainer,
          resourceGroup,
          storageAccountId: storageAccount.id,
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
  } catch (e) {
    logger.error(e)
  }
}
