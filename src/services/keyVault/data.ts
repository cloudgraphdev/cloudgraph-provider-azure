import { KeyVaultManagementClient } from '@azure/arm-keyvault'
import {
  ResourceListResult,
  Vault,
  VaultsListNextResponse,
  VaultsListResponse,
} from '@azure/arm-keyvault/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getAllResources } from '../../utils/apiUtils'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'KeyVault'

export interface RawAzureKeyVault extends Omit<Vault, 'tags' | 'location'> {
  region: string
  resourceGroup: string
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

    const keyVaults: ResourceListResult = await getAllResources({
      listCall: async (): Promise<VaultsListResponse> => client.vaults.list(),
      listNextCall: async (nextLink: string): Promise<VaultsListNextResponse> =>
        client.vaults.listNext(nextLink),
      debugScope: {
        service: serviceName,
        client,
        scope: 'keyVault',
      },
    })

    const keyValueData = await Promise.all(
      keyVaults.map(async ({ name: vaultName, ...rest }) =>
        client.vaults.get(getResourceGroupFromEntity(rest), vaultName)
      )
    )

    const result: {
      [property: string]: RawAzureKeyVault[]
    } = {}
    let numOfGroups = 0
    keyValueData.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroup = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          region,
          resourceGroup,
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
