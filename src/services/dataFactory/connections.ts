import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureDataFactory } from './data'
import { RawAzureIntegrationRuntimeResource } from '../integrationRuntimes/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureDataFactory
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName, name: factoryName } = service

  /**
   * Find resource group related to this data factory
   */
  const resourceGroups: {
    name: string
    data: { [property: string]: RawAzureResourceGroup[] }
  } = data.find(({ name }) => name === services.resourceGroup)

  if (resourceGroups?.data?.[region]) {
    const resourceGroupsInRegion: RawAzureResourceGroup[] = resourceGroups.data[
      region
    ].filter(({ name: resourceGroupName }: RawAzureResourceGroup) =>
      caseInsensitiveEqual(resourceGroupName, rgName)
    )

    if (!isEmpty(resourceGroupsInRegion)) {
      for (const rg of resourceGroupsInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.resourceGroup,
          relation: 'child',
          field: 'resourceGroup',
        })
      }
    }
  }

  /**
   * Find integration runtimes related to this data factory
   */
  const integrationRuntimes: {
    name: string
    data: { [property: string]: RawAzureIntegrationRuntimeResource[] }
  } = data.find(({ name }) => name === services.integrationRuntime)

  if (integrationRuntimes?.data?.[region]) {
    const integrationRuntimesInRegion: RawAzureIntegrationRuntimeResource[] =
      integrationRuntimes.data[region].filter(
        ({
          factoryName: integrationRuntimeFactoryName,
        }: RawAzureIntegrationRuntimeResource) =>
          caseInsensitiveEqual(integrationRuntimeFactoryName, factoryName)
      )

    if (!isEmpty(integrationRuntimesInRegion)) {
      for (const integrationRuntime of integrationRuntimesInRegion) {
        connections.push({
          id: integrationRuntime.id,
          resourceType: services.integrationRuntime,
          relation: 'child',
          field: 'integrationRuntimes',
        })
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
