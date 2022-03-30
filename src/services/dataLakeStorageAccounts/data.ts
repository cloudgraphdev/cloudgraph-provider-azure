import {
  DataLakeAnalyticsAccountManagementClient,
  DataLakeAnalyticsAccountManagementModels,
} from '@azure/arm-datalake-analytics'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { lowerCaseLocation } from '../../utils/format'
import { getAllResources } from '../../utils/apiUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Data Lake Storage Account'

export interface RawAzureDataLakeStorageAccount
  extends DataLakeAnalyticsAccountManagementModels.StorageAccountInformation {
  region: string
  resourceGroupId: string
  accountName: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDataLakeStorageAccount[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new DataLakeAnalyticsAccountManagementClient(
      tokenCredentials,
      subscriptionId
    )
    const accounts: DataLakeAnalyticsAccountManagementModels.DataLakeAnalyticsAccountBasic[] = await getAllResources({
      listCall: async (): Promise<DataLakeAnalyticsAccountManagementModels.AccountsListResponse> =>
        client.accounts.list(),
      listNextCall: async (
        nextLink: string
      ): Promise<DataLakeAnalyticsAccountManagementModels.AccountsListNextResponse> =>
        client.accounts.listNext(nextLink),
      debugScope: {
        service: serviceName,
        client,
        scope: 'accounts',
      },
    })
    const storageAccounts: RawAzureDataLakeStorageAccount[] = []
    await Promise.all(
      (accounts || []).map(async ({ name: accountName, location, ...rest }) => {
        const resourceGroupId = getResourceGroupFromEntity(rest)
        const accounts: DataLakeAnalyticsAccountManagementModels.DataLakeStoreAccountInformation[] = await getAllResources({
          listCall: async (): Promise<DataLakeAnalyticsAccountManagementModels.StorageAccountsListByAccountResponse> =>
            client.storageAccounts.listByAccount(
              resourceGroupId,
              accountName,
            ),
          listNextCall: async (
            nextLink: string
          ): Promise<DataLakeAnalyticsAccountManagementModels.StorageAccountsListByAccountNextResponse> =>
            client.storageAccounts.listByAccountNext(nextLink),
          debugScope: {
            service: serviceName,
            client,
            scope: 'storageAccounts',
          },
        })
        for (const account of accounts) {
          storageAccounts.push({
            region: lowerCaseLocation(location),
            ...account,
            resourceGroupId,
            accountName,
          })
        }
      })
    )
    logger.debug(lt.foundDataLakeStorageAccounts(storageAccounts.length))

    const result: { [property: string]: RawAzureDataLakeStorageAccount[] } = {}
    storageAccounts.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          region,
          ...rest,
          resourceGroupId,
        })
      }
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
