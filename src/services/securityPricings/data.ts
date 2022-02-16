import {
  SecurityCenter,
  Pricing,
  PricingList
} from '@azure/arm-security'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'SecurityPricings'

export interface RawAzureSecurityPricing
  extends Pricing {
  region: string
  resourceGroup: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureSecurityPricing[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const pricingData: Pricing & { region: string }[] = []
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
        // Pricing details
        await tryCatchWrapper(
          async () => {
            const pricingDataForRegion: PricingList =
              await client.pricings.list()
            pricingData.push(
              ...pricingDataForRegion.value.map(p => ({
                ...p,
                region: location,
              }))
            )
          },
          {
            service: serviceName,
            client,
            scope: 'pricings',
            operation: 'list',
          }
        )
      })
    )

    const result: {
      [property: string]: RawAzureSecurityPricing[]
    } = {}
    let numOfGroups
    numOfGroups = 0
    pricingData.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroup = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          region,
          resourceGroup,
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundSecurityPricings(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
