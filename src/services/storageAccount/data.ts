import CloudGraph from '@cloudgraph/sdk'
import {
  BlobServiceProperties,
  StorageAccount,
  StorageAccountKey,
  StorageManagementClient,
} from '@azure/arm-storage'
import { isEmpty } from 'lodash'
import azureLoggerText from '../../properties/logger'

import { lowerCaseLocation } from '../../utils/format'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import services from '../../enums/services'
import { tryCatchWrapper } from '../../utils'

export interface RawAzureStorageAccount
  extends Omit<StorageAccount, 'tags' | 'location'> {
  resourceGroupId: string
  region: string
  keys: StorageAccountKey[]
  Tags: TagMap
  blobServiceProperties: BlobServiceProperties
}

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'StorageAccount'

export default async ({
  regions,
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureStorageAccount[]
}> => {
  try {
    const existingData: { [property: string]: RawAzureStorageAccount[] } =
      rawData.find(({ name }) => name === services.storageAccount)?.data || {}

    if (isEmpty(existingData)) {
      const { subscriptionId, tokenCredentials } = config
      const client = new StorageManagementClient(
        tokenCredentials,
        subscriptionId
      )
      const storageAccounts: StorageAccount[] = []
      const storageAccountListIterable = client.storageAccounts.list()
      await tryCatchWrapper(
        async () => {
          for await (const storageAccount of storageAccountListIterable) {
            if (storageAccount) {
              storageAccounts.push(storageAccount)
            }
          }
        },
        {
          service: serviceName,
          client,
          scope: 'storageAccount',
          operation: 'list',
        }
      )
      //   })

      const result = {}
      let numOfAccounts = 0

      for await (const { id, tags, location, ...rest } of storageAccounts) {
        const region = lowerCaseLocation(location)

        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          const resourceGroupId = getResourceGroupFromEntity({ id })
          // Fetch Storage Account Keys
          const storageAccountKeys = await client.storageAccounts.listKeys(
            resourceGroupId,
            rest.name
          )
          const { keys = [] } = storageAccountKeys

          // Fetch Storage Account Blob Service Properties
          const blobServiceProperties =
            await client.blobServices.getServiceProperties(
              resourceGroupId,
              rest.name
            )

          result[region].push({
            id,
            ...rest,
            resourceGroupId,
            region,
            keys,
            Tags: tags || {},
            blobServiceProperties,
          })
          numOfAccounts += 1
        }
      }

      logger.debug(lt.foundStorageAccounts(numOfAccounts))

      return result
    }
    return existingData
  } catch (e) {
    logger.error(e)
    return {}
  }
}
