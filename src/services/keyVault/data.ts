import {
  KeyVaultManagementClient,
  Resource,
  Key,
  Secret,
  Vault,
} from '@azure/arm-keyvault'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'

import { DiagnosticSettingsResource } from '@azure/arm-monitor'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'
import { getDiagnosticSettings } from '../diagnosticSettings/data'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'KeyVault'

export interface RawAzureResource extends Resource {
  resourceGroup: string
}
export interface RawVaultResource extends Vault {
  resourceGroup: string
}
export interface RawKeyResource extends Key {
  keyVaultName: string
}

export interface RawSecretResource extends Secret {
  keyVaultName: string
}

export interface RawAzureKeyVault extends Omit<Vault, 'tags' | 'location'> {
  region: string
  resourceGroupId: string
  Tags: TagMap
  keys?: Key[]
  secrets?: Secret[]
  diagnosticSettings?: DiagnosticSettingsResource[]
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureKeyVault[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new KeyVaultManagementClient(
      tokenCredentials,
      subscriptionId
    )

    const keyVaults: RawAzureResource[] = []
    const keyVaultsIterable: PagedAsyncIterableIterator<Resource> =
      client.vaults.list()
    await tryCatchWrapper(
      async () => {
        for await (const keyVault of keyVaultsIterable) {
          keyVault &&
            keyVaults.push({
              ...keyVault,
              resourceGroup: getResourceGroupFromEntity(keyVault),
            })
        }
      },
      {
        service: serviceName,
        client,
        scope: 'vaults',
        operation: 'list',
      }
    )

    const keyValueData: RawVaultResource[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (keyVaults || []).map(async ({ name: vaultName, resourceGroup }) => {
            const vaults = await client.vaults.get(resourceGroup, vaultName)
            if (vaults) {
              keyValueData.push({
                ...vaults,
                resourceGroup,
              })
            }
          })
        )
      },
      {
        service: serviceName,
        client,
        scope: 'vaults',
        operation: 'get',
      }
    )

    const keys: RawKeyResource[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (keyValueData || []).map(
            async ({ name: vaultName, resourceGroup }) => {
              const vaultKeys: PagedAsyncIterableIterator<Key> =
                client.keys.list(resourceGroup, vaultName)
              if (vaultKeys) {
                for await (const vk of vaultKeys) {
                  if (vk) {
                    const { tags = {}, ...vaultKey } = vk
                    keys.push({
                      tags,
                      ...vaultKey,
                      keyVaultName: vaultName,
                    })
                  }
                }
              }
            }
          )
        )
        logger.debug(lt.foundKeyVaultKeys(keys.length))
      },
      {
        service: serviceName,
        client,
        scope: 'keys',
        operation: 'list',
      }
    )

    const secrets: RawSecretResource[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (keyValueData || []).map(
            async ({ name: vaultName, resourceGroup }) => {
              const vaultSecrets: PagedAsyncIterableIterator<Secret> =
                client.secrets.list(resourceGroup, vaultName)
              if (vaultSecrets) {
                for await (const vs of vaultSecrets) {
                  if (vs) {
                    const { tags = {}, ...vaultSecret } = vs
                    secrets.push({
                      tags,
                      ...vaultSecret,
                      keyVaultName: vaultName,
                    })
                  }
                }
              }
            }
          )
        )
        logger.debug(lt.foundKeyVaultSecrets(secrets.length))
      },
      {
        service: serviceName,
        client,
        scope: 'secrets',
        operation: 'list',
      }
    )

    const diagnosticSettings: {
      [property: string]: DiagnosticSettingsResource[]
    } = {}
    await Promise.all(
      keyValueData.map(async ({ id: vaultId, name: vaultName }) => {
        const settings = await getDiagnosticSettings(config, vaultId)
        if (settings) {
          settings.map(s => {
            if (!diagnosticSettings[vaultName]) {
              diagnosticSettings[vaultName] = []
            }
            diagnosticSettings[vaultName].push({ ...s })
          })
        }
      })
    )

    const result: {
      [property: string]: RawAzureKeyVault[]
    } = {}
    let numOfGroups = 0
    keyValueData.map(({ name, tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          name,
          region,
          resourceGroupId,
          Tags: tags || {},
          keys: keys?.filter(i => i.keyVaultName === name) || [],
          secrets: secrets?.filter(i => i.keyVaultName === name) || [],
          diagnosticSettings: diagnosticSettings?.[name] || [],
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
