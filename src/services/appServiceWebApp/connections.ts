import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureAppServicePlan } from '../appServicePlan/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureStorageAccount } from '../storageAccount/data'
import { RawAzureAppServiceWebApp } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureAppServiceWebApp
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    resourceGroupId: rgName,
    appServicePlanId: planId,
    siteConfig: { azureStorageAccounts = {} } = {},
  } = service
  const storageAccountNames =
    (azureStorageAccounts &&
      Object.entries(azureStorageAccounts).map(([, { accountName }]) =>
        accountName.toLowerCase()
      )) ||
    []
  
  /**
   * Find resource group related to this appServiceWebApp
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
   * Find appServicePlan related to this appServiceWebApp
   */
  const appServicePlans: {
    name: string
    data: { [property: string]: RawAzureAppServicePlan[] }
  } = data.find(({ name }) => name === services.appServicePlan)

  if (appServicePlans?.data?.[region]) {
    const appServicePlansInRegion: RawAzureAppServicePlan[] =
      appServicePlans.data[region].filter(
        ({ id: appServiceId }: RawAzureAppServicePlan) =>
          caseInsensitiveEqual(appServiceId, planId)
      )

    if (!isEmpty(appServicePlansInRegion)) {
      for (const plan of appServicePlansInRegion) {
        connections.push({
          id: plan.id,
          resourceType: services.appServicePlan,
          relation: 'child',
          field: 'appServicePlan',
        })
      }
    }
  }

  /**
   * Find storageAccount related to this appServiceWebApp
   */
  const storageAccounts: {
    name: string
    data: { [property: string]: RawAzureStorageAccount[] }
  } = data.find(({ name }) => name === services.storageAccount)

  if (storageAccounts?.data?.[region]) {
    const storageAccountsInRegion: RawAzureStorageAccount[] =
      storageAccounts.data[region].filter(
        ({ name: storageAccountName }: RawAzureStorageAccount) =>
          storageAccountNames.includes(storageAccountName.toLowerCase())
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

  const aSWAResult = {
    [id]: connections,
  }
  return aSWAResult
}
