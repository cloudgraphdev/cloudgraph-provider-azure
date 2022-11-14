import { PagedAsyncIterableIterator } from '@azure/core-paging'
import { SecurityCenter, SecurityContact } from '@azure/arm-security'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'SecurityContacts'

export interface RawAzureSecurityContact extends SecurityContact {
  region: string
  resourceGroupId: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureSecurityContact[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const contactsData: ({ region?: string } & SecurityContact)[] = []
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
        // Security Contacts
        const contactsIterableForRegion: PagedAsyncIterableIterator<SecurityContact> =
          client.securityContacts.list()
        await tryCatchWrapper(
          async () => {
            for await (const contact of contactsIterableForRegion) {
              contact && contactsData.push({ ...contact, region: location })
            }
          },
          {
            service: serviceName,
            client,
            scope: 'securityContacts',
            operation: 'list',
          }
        )
      })
    )

    const result: {
      [property: string]: RawAzureSecurityContact[]
    } = {}
    let numOfGroups = 0
    contactsData.map(({ region, ...rest }) => {
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
    logger.debug(lt.foundSecurityContacts(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
