import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureVault } from './data'
import { RawAzureProtectedItemResource } from '../backupInstance/data'
import { RawAzureProtectionPolicyResource } from '../backupPolicy/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureVault
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, name: vaultName, resourceGroupId: rgName } = service

  /**
   * Find resource group related to this backup vault
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
   * Find backup instances related to this backup vault
   */
  const backupInstances: {
    name: string
    data: { [property: string]: RawAzureProtectedItemResource[] }
  } = data.find(({ name }) => name === services.backupInstance)

  if (backupInstances?.data?.[region]) {
    const backupInstancesInRegion: RawAzureProtectedItemResource[] =
      backupInstances.data[region].filter(
        ({ vaultName: instanceVaultName }: RawAzureProtectedItemResource) =>
          caseInsensitiveEqual(instanceVaultName, vaultName)
      )

    if (!isEmpty(backupInstancesInRegion)) {
      for (const backupInstance of backupInstancesInRegion) {
        connections.push({
          id: backupInstance.id,
          resourceType: services.backupInstance,
          relation: 'child',
          field: 'backupInstances',
        })
      }
    }
  }

  /**
   * Find backup policies related to this backup vault
   */
  const backupPolicies: {
    name: string
    data: { [property: string]: RawAzureProtectionPolicyResource[] }
  } = data.find(({ name }) => name === services.backupPolicy)

  if (backupPolicies?.data?.[region]) {
    const backupPoliciesInRegion: RawAzureProtectionPolicyResource[] =
      backupPolicies.data[region].filter(
        ({ vaultName: policyVaultName }: RawAzureProtectionPolicyResource) =>
          caseInsensitiveEqual(policyVaultName, vaultName)
      )

    if (!isEmpty(backupPoliciesInRegion)) {
      for (const backupPolicy of backupPoliciesInRegion) {
        connections.push({
          id: backupPolicy.id,
          resourceType: services.backupPolicy,
          relation: 'child',
          field: 'backupPolicies',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
