import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureProtectedItemResource } from '../recoveryInstances/data'
import { RawAzureProtectionPolicyResource } from '../recoveryPolicies/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureRecoveryVault } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureRecoveryVault
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, name: vaultName, resourceGroupId: rgName } = service

  /**
   * Find resource group related to this recovery vault
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
   * Find backup instances related to this recovery vault
   */
  const backupInstances: {
    name: string
    data: { [property: string]: RawAzureProtectedItemResource[] }
  } = data.find(({ name }) => name === services.recoveryInstances)

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
          resourceType: services.recoveryInstances,
          relation: 'child',
          field: 'recoveryInstances',
        })
      }
    }
  }

  /**
   * Find backup policies related to this recovery vault
   */
  const backupPolicies: {
    name: string
    data: { [property: string]: RawAzureProtectionPolicyResource[] }
  } = data.find(({ name }) => name === services.recoveryPolicies)

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
          resourceType: services.recoveryPolicies,
          relation: 'child',
          field: 'recoveryPolicies',
        })
      }
    }
  }

  const result = {
    [id]: connections,
  }
  return result
}
