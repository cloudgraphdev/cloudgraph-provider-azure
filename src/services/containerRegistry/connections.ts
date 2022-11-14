import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureContainerRegistry } from './data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureKeyVault } from '../keyVault/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureContainerRegistry
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    resourceGroupId: rgName,
    encryption: {
      keyVaultProperties: { keyIdentifier: keyVaultUri } = {},
    } = {},
  } = service

  /**
   * Find resource group related to container registry
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
   * Find key vault related to this container registry
   */
  const keyVaults: {
    name: string
    data: { [property: string]: RawAzureKeyVault[] }
  } = data.find(({ name }) => name === services.keyVault)

  if (keyVaults?.data?.[region]) {
    const keyVaultsInRegion: RawAzureKeyVault[] = keyVaults.data[region].filter(
      ({ properties: { vaultUri } }: RawAzureKeyVault) =>
        keyVaultUri?.includes(vaultUri)
    )

    if (!isEmpty(keyVaultsInRegion)) {
      for (const rg of keyVaultsInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.keyVault,
          relation: 'child',
          field: 'keyVault',
        })
      }
    }
  }

  const aSPResult = {
    [id]: connections,
  }
  return aSPResult
}
