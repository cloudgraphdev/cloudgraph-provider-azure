import CloudGraph from '@cloudgraph/sdk'

import { StorageManagementClient } from '@azure/arm-storage'
import {
  StorageAccount,
  StorageAccountListResult,
  StorageAccountsListNextResponse,
  StorageAccountsListResponse,
} from '@azure/arm-storage/esm/models'
import azureLoggerText from '../../properties/logger'

import { lowerCaseLocation } from '../../utils/format'
import { AzureServiceInput, TagMap } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { parseResourceId } from '../../utils/idParserUtils'

export interface RawAzureStorageAccount
  extends Omit<StorageAccount, 'tags' | 'location'> {
  resourceGroup: string
  region: string
  Tags: TagMap
}

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'StorageAccount'

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureStorageAccount[]
}> => {
  const { subscriptionId, credentials } = config
  const client = new StorageManagementClient(credentials, subscriptionId)

  try {
    const storageAccountData: StorageAccountListResult = await getAllResources({
      listCall: async (): Promise<StorageAccountsListResponse> =>
        client.storageAccounts.list(),
      listNextCall: async (
        nextLink: string
      ): Promise<StorageAccountsListNextResponse> =>
        client.storageAccounts.listNext(nextLink),
      debugScope: { service: serviceName, client, scope: 'storageAccounts' },
    })

    const result = {}
    let numOfAccounts = 0
    storageAccountData.map(({ id, tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroup = parseResourceId(id).resourceGroups
        result[region].push({
          id,
          ...rest,
          resourceGroup,
          region,
          Tags: tags || {},
        })
        numOfAccounts += 1
      }
    })
    logger.debug(lt.foundStorageAccounts(numOfAccounts))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
