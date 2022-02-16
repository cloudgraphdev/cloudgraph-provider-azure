import {
  Domain,
  DomainTopic,
  EventGridManagementClient,
} from '@azure/arm-eventgrid'
import CloudGraph from '@cloudgraph/sdk'
import { regionMap } from '../../enums/regions'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'EventGrid'

export interface RawAzureEventGrid extends Omit<DomainTopic, 'location'> {
  resourceGroup: string
  region: string
  domainName: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureEventGrid[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new EventGridManagementClient(
      tokenCredentials,
      subscriptionId
    )

    const domainsIterable = client.domains.listBySubscription()
    const domains: Domain[] = []
    await tryCatchWrapper(
      async () => {
        for await (const domain of domainsIterable) {
          domains.push(domain)
        }
      },
      {
        service: serviceName,
        client,
        scope: 'domains',
        operation: 'list',
      }
    )
    logger.debug(lt.foundEventGridDomains(domains.length))

    const domainTopics: (DomainTopic & { domainName: string })[] = []
    await Promise.all(
      (domains || []).map(async ({ name, ...rest }) => {
        const resourceGroup = getResourceGroupFromEntity(rest)
        const eventHubIterable = client.domainTopics.listByDomain(
          resourceGroup,
          name
        )
        await tryCatchWrapper(
          async () => {
            for await (const domainTopic of eventHubIterable) {
              domainTopics.push({ domainName: name, ...domainTopic })
            }
          },
          {
            service: serviceName,
            client,
            scope: 'domainTopics',
            operation: 'listByDomain',
          }
        )
      })
    )

    const result = {}
    let numOfGroups = 0
    domainTopics.map(({ ...rest }) => {
      const region = regionMap.global
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
    logger.debug(lt.foundEventGridsTopic(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
