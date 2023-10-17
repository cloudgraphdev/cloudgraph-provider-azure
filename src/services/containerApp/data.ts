import { ContainerApp, ContainerAppsAPIClient } from '@azure/arm-appcontainers'

import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ContainerApp'

export interface RawAzureContainerApp
  extends Omit<ContainerApp, 'location' | 'tags'> {
  resourceGroupId?: string
  region: string
  customDomainVerificationId?: string
  environmentId?: string
  latestReadyRevisionName?: string
  latestRevisionFqdn?: string
  latestRevisionName?: string
  location?: string
  managedEnvironmentId?: string
  provisioningState?: string
  workloadProfileName?: string
  Tags: TagMap
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureContainerApp[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new ContainerAppsAPIClient(tokenCredentials, subscriptionId)

    const containerApps: RawAzureContainerApp[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        for await (const containerApp of client.containerApps.listBySubscription()) {
          if (containerApp) {
            const { tags, ...rest } = containerApp

            containerApps.push({
              ...rest,
              id: rest.id.replace('/containerapps/', '/containerApps/'), // fix casing in Id
              region: containerApp.location || regionMap.global,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'containerApps',
        operation: 'listBySubscription',
      }
    )
    logger.debug(lt.foundContainerApps(containerApps.length))

    containerApps.map(({ region, ...rest }) => {
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
