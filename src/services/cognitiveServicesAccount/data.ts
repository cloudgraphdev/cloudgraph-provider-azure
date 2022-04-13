import {
  CognitiveServicesManagementClient,
  Account,
} from '@azure/arm-cognitiveservices'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { regionMap } from '../../enums/regions'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'CognitiveServicesAccount'

export interface RawAzureCognitiveServicesAccount
  extends Omit<Account, 'location' | 'tags'> {
  resourceGroupId: string
  region: string
  Tags: TagMap
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureCognitiveServicesAccount[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new CognitiveServicesManagementClient(
      tokenCredentials,
      subscriptionId
    )
    const accounts: RawAzureCognitiveServicesAccount[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        const accountsIterable: PagedAsyncIterableIterator<Account> =
          client.accounts.list()
        for await (const account of accountsIterable) {
          if (account) {
            const { tags, ...restCognitiveServicesAccount } = account
            const region = regionMap.global
            const resourceGroupId = getResourceGroupFromEntity(account)
            accounts.push({
              ...restCognitiveServicesAccount,
              region,
              resourceGroupId,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'accounts',
        operation: 'list',
      }
    )
    logger.debug(lt.foundCognitiveServicesAccounts(accounts.length))

    accounts.map(({ region, ...rest }) => {
      result.global.push({
        ...rest,
        region,
      })
    })
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
