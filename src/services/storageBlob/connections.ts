import isEmpty from 'lodash/isEmpty'
import { ServiceConnection } from '@cloudgraph/sdk'
import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'

import { RawAzureStorageBlob } from './data'

/**
 * StorageBlob
 */

export default ({
  service: storageBlob,
  data,
  region,
}: {
  data: { name: string; data: { [property: string]: any[] } }[]
  service: RawAzureStorageBlob
  region: string
}): { [key: string]: ServiceConnection[] } => {
  const connections: ServiceConnection[] = []

  /**
   * Find Storage Account
   * related to the Storage Blob
   */

  const { name: id, storageContainerId, resourceGroup: rgName } = storageBlob

  /**
   * Find resource group related to this storage blob
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
   * Find storage account related to this storage blob
   */
  const storageContainers = data.find(
    ({ name }) => name === services.storageContainer
  )

  if (storageContainers?.data?.[region]) {
    const storageContainer = storageContainers.data[region].find(
      ({ id: containerId }) => storageContainerId === containerId
    )
    if (storageContainer) {
      connections.push({
        id: storageContainerId,
        resourceType: services.storageContainer,
        relation: 'child',
        field: 'storageContainer',
      })
    }
  }

  const storageContainerResult = {
    [`${storageContainerId}/${id}`]: connections,
  }
  return storageContainerResult
}
