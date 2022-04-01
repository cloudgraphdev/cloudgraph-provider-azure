import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { caseInsensitiveEqual, caseInsensitiveIncludes } from '../../utils'
import { RawAzureAuthRoleDefinition } from '../authRoleDefinition/data'
import { RawAzureFunctionApp } from '../functionApp/data'
import { RawAzureActionGroup } from './data'
import { RawAzureEventHub } from '../eventHub/data'
import { RawAzureResourceGroup } from '../resourceGroup/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureActionGroup
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    resourceGroupId: rgName,
    azureFunctionReceivers = [],
    armRoleReceivers = [],
    eventHubReceivers = [],
  } = service
  const functionAppInfo =
    azureFunctionReceivers?.map(({ functionName, functionAppResourceId }) => ({
      name: functionName,
      id: functionAppResourceId,
    })) || []
  const roleIds = armRoleReceivers?.map(({ roleId }) => roleId) || []
  const eventHubNames =
    eventHubReceivers?.map(({ eventHubName }) => eventHubName) || []

  /**
   * Find resource group related to this action group
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
   * Find function apps related to this action group
   */
  const functionApps: {
    name: string
    data: { [property: string]: RawAzureFunctionApp[] }
  } = data.find(({ name }) => name === services.functionApp)

  if (functionApps?.data?.[region]) {
    const functionAppsInRegion: RawAzureFunctionApp[] = functionApps.data[
      region
    ].filter(
      ({ name: functionAppName, id: functionAppId }: RawAzureFunctionApp) =>
        caseInsensitiveIncludes(
          functionAppInfo.map(({ name }) => name),
          functionAppName
        ) ||
        caseInsensitiveIncludes(
          functionAppInfo.map(({ id: functionId }) => functionId),
          functionAppId
        )
    )

    if (!isEmpty(functionAppsInRegion)) {
      for (const rg of functionAppsInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.functionApp,
          relation: 'child',
          field: 'functionApps',
        })
      }
    }
  }

  /**
   * Find auth role definitions related to this action group
   */
  const authRoleDefinitions: {
    name: string
    data: { [property: string]: RawAzureAuthRoleDefinition[] }
  } = data.find(({ name }) => name === services.authRoleDefinition)

  if (authRoleDefinitions?.data?.[region]) {
    const authRoleDefinitionsInRegion: RawAzureAuthRoleDefinition[] =
      authRoleDefinitions.data[region].filter(
        ({ id: authRoleDefinitionId }: RawAzureAuthRoleDefinition) =>
          caseInsensitiveIncludes(
            roleIds,
            authRoleDefinitionId.split('/').pop() // to get the actual id from the resource id
          )
      )

    if (!isEmpty(authRoleDefinitionsInRegion)) {
      for (const rg of authRoleDefinitionsInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.authRoleDefinition,
          relation: 'child',
          field: 'roleDefinitions',
        })
      }
    }
  }

  /**
   * Find event hubs related to this action group
   */
  const eventHubs: {
    name: string
    data: { [property: string]: RawAzureEventHub[] }
  } = data.find(({ name }) => name === services.eventHub)

  if (eventHubs?.data?.[region]) {
    const eventHubsInRegion: RawAzureEventHub[] = eventHubs.data[region].filter(
      ({ name: eventHubName }: RawAzureEventHub) =>
        caseInsensitiveIncludes(eventHubNames, eventHubName)
    )

    if (!isEmpty(eventHubsInRegion)) {
      for (const rg of eventHubsInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.eventHub,
          relation: 'child',
          field: 'eventHubs',
        })
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
