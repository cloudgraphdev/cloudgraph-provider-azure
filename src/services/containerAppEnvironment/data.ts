import {
  ContainerAppsAPIClient,
  ManagedEnvironment,
  Certificate,
  DaprComponent,
  ManagedEnvironmentStorage,
} from '@azure/arm-appcontainers'

import CloudGraph from '@cloudgraph/sdk'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { tryCatchWrapper } from '../../utils/index'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ContainerAppEnvironment'

export interface RawAzureAppEnvironment
  extends Omit<ManagedEnvironment, 'location' | 'tags'> {
  resourceGroupId?: string
  certificates: Certificate[]
  daprComponents: DaprComponent[]
  storages: ManagedEnvironmentStorage[]
  region: string
  defaultDomain?: string
  eventStreamEndpoint?: string
  infrastructureResourceGroup?: string
  provisioningState?: string
  staticIp?: string
  subscriptionId?: string
  zoneRedundant?: boolean
  Tags: TagMap
}

async function getDaprComponents(
  client: ContainerAppsAPIClient,
  resourceGroupName: string,
  resource: ManagedEnvironment
): Promise<DaprComponent[]> {
  const daprComponents = [] as DaprComponent[]
  await tryCatchWrapper(
    async () => {
      for await (const daprComponent of client.daprComponents.list(
        resourceGroupName,
        resource.name
      )) {
        daprComponents.push(daprComponent)
      }
    },
    {
      service: serviceName,
      client,
      scope: 'daprComponents',
      operation: 'list',
    }
  )
  return daprComponents
}

async function getCertificates(
  client: ContainerAppsAPIClient,
  resourceGroupName: string,
  resource: ManagedEnvironment
): Promise<Certificate[]> {
  const certificates = [] as Certificate[]
  await tryCatchWrapper(
    async () => {
      for await (const certificate of client.certificates.list(
        resourceGroupName,
        resource.name
      )) {
        certificates.push(certificate)
      }
    },
    {
      service: serviceName,
      client,
      scope: 'certificates',
      operation: 'list',
    }
  )
  return certificates
}

async function getStorages(
  client: ContainerAppsAPIClient,
  resourceGroupName: string,
  resource: ManagedEnvironment
): Promise<ManagedEnvironmentStorage[]> {
  const storages = [] as ManagedEnvironmentStorage[]
  await tryCatchWrapper(
    async () => {
      const storagesCollection = await client.managedEnvironmentsStorages.list(
        resourceGroupName,
        resource.name
      )
      for (const storage of storagesCollection.value) {
        storages.push(storage)
      }
    },
    {
      service: serviceName,
      client,
      scope: 'managedEnvironmentsStorages',
      operation: 'list',
    }
  )
  return storages
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureAppEnvironment[]
}> => {
  try {
    const { tokenCredentials, subscriptionId } = config
    const client = new ContainerAppsAPIClient(tokenCredentials, subscriptionId)
    const resources: RawAzureAppEnvironment[] = []
    const result = { global: [] }
    await tryCatchWrapper(
      async () => {
        for await (const resource of client.managedEnvironments.listBySubscription()) {
          if (resource) {
            const { tags, ...rest } = resource

            // "/subscriptions/xxx/resourceGroups/yyy/providers/Microsoft.App/containerApps/YYY"
            const [, , , , resourceGroupName] = resource.id.split('/')
            const certificates = await getCertificates(
              client,
              resourceGroupName,
              resource
            )

            const daprComponents = await getDaprComponents(
              client,
              resourceGroupName,
              resource
            )

            const storages = await getStorages(
              client,
              resourceGroupName,
              resource
            )

            resources.push({
              ...rest,
              region: resource.location || regionMap.global,
              certificates,
              daprComponents,
              storages,
              Tags: tags || {},
            })
          }
        }
      },
      {
        service: serviceName,
        client,
        scope: 'managedEnvironments',
        operation: 'listBySubscription',
      }
    )
    logger.debug(lt.foundContainerAppEnvironment(resources.length))

    resources.map(({ region, ...rest }) => {
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
