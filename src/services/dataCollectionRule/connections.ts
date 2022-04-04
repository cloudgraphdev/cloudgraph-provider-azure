import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual, caseInsensitiveIncludes } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureDataCollectionRule } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureDataCollectionRule
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    resourceGroupId: rgName,
    destinations: { logAnalytics = [] } = {},
  } = service

  const logAnalyticsWorkspacesIds = logAnalytics.map(
    ({ workspaceResourceId }) => workspaceResourceId
  )

  /**
   * Find resource group related to this data collection rule
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
   * Find log analytics workspaces related to this data collection rule
   */
  const logAnalyticsWorkspaces: {
    name: string
    data: { [property: string]: RawAzureResourceGroup[] }
  } = data.find(({ name }) => name === services.logAnalyticsWorkspace)

  if (logAnalyticsWorkspaces?.data?.[region]) {
    const logAnalyticsWorkspacesInRegion: RawAzureResourceGroup[] =
      logAnalyticsWorkspaces.data[region].filter(
        ({ id: logAnalyticsWorkspaceId }: RawAzureResourceGroup) =>
          caseInsensitiveIncludes(
            logAnalyticsWorkspacesIds,
            logAnalyticsWorkspaceId
          )
      )

    if (!isEmpty(logAnalyticsWorkspacesInRegion)) {
      for (const rg of logAnalyticsWorkspacesInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.logAnalyticsWorkspace,
          relation: 'child',
          field: 'logAnalyticsWorkspaces',
        })
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
