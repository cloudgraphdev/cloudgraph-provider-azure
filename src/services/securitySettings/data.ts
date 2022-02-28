import { PagedAsyncIterableIterator } from '@azure/core-paging'
import { SecurityCenter, SettingUnion } from '@azure/arm-security'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'SecuritySettings'

export interface RawAzureSecuritySetting {
  id?: string
  name?: string
  type?: string
  kind?: string
  enabled?: boolean
  region: string
  resourceGroupId: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureSecuritySetting[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const settingsData: ({ region?: string } & SettingUnion)[] = []
    const clientGlobal = new SecurityCenter(
      tokenCredentials,
      subscriptionId,
      regionMap.global
    )
    const locationsIterable = clientGlobal.locations.list()
    const locations: string[] = []
    await tryCatchWrapper(
      async () => {
        for await (const location of locationsIterable) {
          locations.push(location.name)
        }
      },
      {
        service: serviceName,
        client: clientGlobal,
        scope: 'locations',
        operation: 'list',
      }
    )

    await Promise.all(
      (locations || []).map(async (location: string) => {
        const client = new SecurityCenter(tokenCredentials, subscriptionId, location)
        // Security Settings
        const settingsIterableForRegion: PagedAsyncIterableIterator<SettingUnion> =
          client.settings.list()
        await tryCatchWrapper(
          async () => {
            for await (const setting of settingsIterableForRegion) {
              settingsData.push({ ...setting, region: location })
            }
          },
          {
            service: serviceName,
            client,
            scope: 'settings',
            operation: 'list',
          }
        )
      })
    )

    const result: {
      [property: string]: RawAzureSecuritySetting[]
    } = {}
    let numOfGroups = 0
    settingsData.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          region,
          resourceGroupId,
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundSecuritySettings(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
