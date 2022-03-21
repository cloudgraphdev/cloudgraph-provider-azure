import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureFileShareItem } from './data'
import { RawAzureStorageAccount } from '../storageAccount/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureFileShareItem
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName, storageAccountName } = service

  /**
   * Find resource group related to this file share instance
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
   * Find storage account related to this file share instance
   */
  const storageAccounts: {
    name: string
    data: { [property: string]: RawAzureStorageAccount[] }
  } = data.find(({ name }) => name === services.storageAccount)

  if (storageAccounts?.data?.[region]) {
    const storageAccountsInRegion: RawAzureStorageAccount[] =
      storageAccounts.data[region].filter(({ name }: RawAzureStorageAccount) =>
        caseInsensitiveEqual(storageAccountName, name)
      )

    if (!isEmpty(storageAccountsInRegion)) {
      for (const sa of storageAccountsInRegion) {
        connections.push({
          id: sa.id,
          resourceType: services.storageAccount,
          relation: 'child',
          field: 'storageAccount',
        })
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
