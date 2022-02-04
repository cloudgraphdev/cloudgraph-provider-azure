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

  const { id, storageAccountId, resourceGroup: rgName } = storageBlob

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
          field: 'resourceGroups',
        })
      }
    }
  }

  /**
   * Find storage account related to this storage container
   */
  const storageAccounts = data.find(
    ({ name }) => name === services.storageAccount
  )

  if (storageAccounts?.data?.[region]) {
    const storageAccount = storageAccounts.data[region].find(
      ({ id: accountId }) => accountId === storageAccountId
    )

    if (storageAccount) {
      connections.push({
        id: storageAccountId,
        resourceType: services.storageAccount,
        relation: 'child',
        field: 'storageAccounts',
      })
    }
  }

  const storageContainerResult = {
    [id]: connections,
  }
  return storageContainerResult
}
