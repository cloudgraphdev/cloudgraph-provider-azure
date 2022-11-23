import { PagedAsyncIterableIterator } from '@azure/core-paging'
import { SecurityCenter, AutoProvisioningSetting } from '@azure/arm-security'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'AutoProvisioningSettings'

export interface RawAzureAutoProvisioningSetting extends AutoProvisioningSetting {
  region: string
  resourceGroupId: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAutoProvisioningSetting[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const settingsData: ({ region?: string } & AutoProvisioningSetting)[] = []
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
          location && locations.push(location.name)
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
        const client = new SecurityCenter(
          tokenCredentials,
          subscriptionId,
          location
        )
        const settingsIterableForRegion: PagedAsyncIterableIterator<AutoProvisioningSetting> =
          client.autoProvisioningSettings.list()
        await tryCatchWrapper(
          async () => {
            for await (const setting of settingsIterableForRegion) {
              setting && settingsData.push({ ...setting, region: location })
            }
          },
          {
            service: serviceName,
            client,
            scope: 'autoProvisioningSettings',
            operation: 'list',
          }
        )
      })
    )

    const result: {
      [property: string]: RawAzureAutoProvisioningSetting[]
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
    logger.debug(lt.foundAutoProvisioningSettings(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
