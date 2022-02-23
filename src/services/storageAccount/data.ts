import CloudGraph from '@cloudgraph/sdk'

import { StorageManagementClient } from '@azure/arm-storage'
import {
  StorageAccount,
  StorageAccountKey,
  StorageAccountListResult,
  StorageAccountsListNextResponse,
  StorageAccountsListResponse,
  BlobServiceProperties
} from '@azure/arm-storage/esm/models'
import { isEmpty } from 'lodash'
import azureLoggerText from '../../properties/logger'

import { lowerCaseLocation } from '../../utils/format'
import { AzureServiceInput, TagMap } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { parseResourceId } from '../../utils/idParserUtils'
import services from '../../enums/services'

export interface RawAzureStorageAccount
  extends Omit<StorageAccount, 'tags' | 'location'> {
  resourceGroup: string
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
      const { subscriptionId, credentials } = config
      const client = new StorageManagementClient(credentials, subscriptionId)
      const storageAccountData: StorageAccountListResult =
        await getAllResources({
          listCall: async (): Promise<StorageAccountsListResponse> =>
            client.storageAccounts.list(),
          listNextCall: async (
            nextLink: string
          ): Promise<StorageAccountsListNextResponse> =>
            client.storageAccounts.listNext(nextLink),
          debugScope: {
            service: serviceName,
            client,
            scope: 'storageAccounts',
          },
        })

      const result = {}
      let numOfAccounts = 0

      for await (const { id, tags, location, ...rest } of storageAccountData) {
        const region = lowerCaseLocation(location)

        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          const resourceGroup = parseResourceId(id).resourceGroups
          // Fetch Storage Account Keys
          const storageAccountKeys = await client.storageAccounts.listKeys(
            resourceGroup,
            rest.name
          )
          const { keys = [] } = storageAccountKeys

          // Fetch Storage Account Blob Service Properties
          const blobServiceProperties = await client.blobServices.getServiceProperties(resourceGroup,  rest.name)

          result[region].push({
            id,
            ...rest,
            resourceGroup,
            region,
            keys,
            Tags: tags || {},
            blobServiceProperties
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
