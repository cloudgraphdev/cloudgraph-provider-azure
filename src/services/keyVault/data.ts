import { KeyVaultManagementClient } from '@azure/arm-keyvault'
import {
  Resource,
  ResourceListResult,
  VaultsListNextResponse,
  VaultsListResponse,
} from '@azure/arm-keyvault/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'KeyVault'

export interface RawAzureKeyVault
  extends Omit<Resource, 'tags' | 'location' | 'properties'> {
  Tags: TagMap
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureKeyVault[]
}> => {
  try {
    const { subscriptionId, credentials } = config
    const credentialsKv: any = credentials // KeyVault clint take different type definition
    const client = new KeyVaultManagementClient(credentialsKv, subscriptionId)

    const keyVaultData: ResourceListResult =
      await getAllResources({
        listCall: async (): Promise<VaultsListResponse> =>
          client.vaults.list(),
        listNextCall: async (
          nextLink: string
        ): Promise<VaultsListNextResponse> =>
          client.vaults.listNext(nextLink),
        debugScope: {
          service: serviceName,
          client,
          scope: 'keyVault',
        },
      })

    const result: {
      [property: string]: RawAzureKeyVault[]
    } = {}
    let numOfGroups = 0
    keyVaultData.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        result[region].push({
          ...rest,
          Tags: tags || {},
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundKeyVault(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
