import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureLogAnalyticsWorkspace } from '../logAnalyticsWorkspace/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureLogAnalyticsSolution } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureLogAnalyticsSolution
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    resourceGroupId: rgName,
    properties: { workspaceResourceId } = {},
  } = service

  /**
   * Find resource group related to this log analytics solutions instance
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
   * Find log analytics workspace related to this log analytics solutions instance
   */
  const workspaces: {
    name: string
    data: { [property: string]: RawAzureLogAnalyticsWorkspace[] }
  } = data.find(({ name }) => name === services.logAnalyticsWorkspace)

  if (workspaces?.data?.[region]) {
    const workspacesInRegion: RawAzureLogAnalyticsWorkspace[] = workspaces.data[
      region
    ].filter(({ id: logAnalyticsWorkspaceId }: RawAzureLogAnalyticsWorkspace) =>
      caseInsensitiveEqual(logAnalyticsWorkspaceId, workspaceResourceId)
    )

    if (!isEmpty(workspacesInRegion)) {
      for (const rg of workspacesInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.logAnalyticsWorkspace,
          relation: 'child',
          field: 'logAnalyticsWorkspace',
        })
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
