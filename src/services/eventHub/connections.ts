import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureStorageAccount } from '../storageAccount/data'
import { RawAzureEventHub } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureEventHub
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    resourceGroupId: rgName,
    captureDescription: {
      destination: { storageAccountResourceId = '' } = {},
    } = {},
  } = service

  /**
   * Find resource group related to this eventHub
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
   * Find storageAccount related to this eventHub
   */
  const storageAccounts: {
    name: string
    data: { [property: string]: RawAzureStorageAccount[] }
  } = data.find(({ name }) => name === services.storageAccount)

  if (storageAccounts?.data?.[region]) {
    const storageAccountsInRegion: RawAzureStorageAccount[] =
      storageAccounts.data[region].filter(
        ({ id: storageAccountId }: RawAzureStorageAccount) =>
          caseInsensitiveEqual(storageAccountId, storageAccountResourceId)
      )

    if (!isEmpty(storageAccountsInRegion)) {
      for (const plan of storageAccountsInRegion) {
        connections.push({
          id: plan.id,
          resourceType: services.storageAccount,
          relation: 'child',
          field: 'storageAccount',
        })
      }
    }
  }

  const eHResult = {
    [id]: connections,
  }
  return eHResult
}
