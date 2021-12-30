import { WebSiteManagementClient } from '@azure/arm-appservice'
import {
  FunctionEnvelope,
  Site,
  WebAppsListByResourceGroupNextResponse,
  WebAppsListByResourceGroupResponse,
  WebAppsListFunctionsNextResponse,
  WebAppsListFunctionsResponse,
} from '@azure/arm-appservice/esm/models'
import CloudGraph from '@cloudgraph/sdk'

import getResourceGroupData from '../resourceGroup/data'
import apiSelectors from '../../enums/apiSelectors'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupNames, lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils'
import { getAllResources } from '../../utils/apiUtils'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'FunctionApp'

export interface RawAzureFunctionEnvelope extends FunctionEnvelope {
  functionAppName: string
}

export interface RawAzureFunctionApp
  extends Omit<
    Site,
    | 'tags'
    | 'siteConfig'
    | 'hostNameSslStates'
    | 'cloningInfo'
    | 'slotSwapStatus'
    | 'location'
  > {
  region: string
  resourceGroup: string
  functions: FunctionEnvelope[]
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureFunctionApp[]
}> => {
  const { subscriptionId, credentials } = config
  const client = new WebSiteManagementClient(credentials, subscriptionId)
  try {
    const resourceGroups = await getResourceGroupData({
      regions,
      config,
      rawData,
      opts,
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)

    let functionApps: Site[] = []
    await tryCatchWrapper(
      async () => {
        functionApps =
          (
            await Promise.all(
              (resourceGroupsNames || []).map(async (rgName: string) =>
                getAllResources({
                  resourceGroupName: rgName,
                  listCall: (
                    resourceGroupName: string
                  ): Promise<WebAppsListByResourceGroupResponse> =>
                    client.webApps.listByResourceGroup(resourceGroupName),
                  listNextCall: (
                    nextLink: string
                  ): Promise<WebAppsListByResourceGroupNextResponse> =>
                    client.webApps.listByResourceGroupNext(nextLink),
                  debugScope: {
                    service: serviceName,
                    client,
                    scope: 'webApps',
                  },
                })
              )
            )
          )
            .flat()
            .filter(({ kind }) => kind.includes(apiSelectors.functionApp)) || []
        logger.debug(lt.foundFunctionApps(functionApps.length))
      },
      {
        service: serviceName,
        client,
        scope: 'functionApps',
        operation: 'getAllResources',
      }
    )

    let azureFunctions: RawAzureFunctionEnvelope[] = []
    await tryCatchWrapper(
      async () => {
        azureFunctions =
          (
            await Promise.all(
              (functionApps || []).map(
                async ({
                  name: functionAppName,
                  resourceGroup: functionAppResourceGroupName,
                }) =>
                  getAllResources({
                    resourceGroupName: functionAppResourceGroupName,
                    uniqueIdentifier: functionAppName,
                    propertyName: 'functionAppName',
                    listCall: (
                      resourceGroupName: string,
                      name: string
                    ): Promise<WebAppsListFunctionsResponse> =>
                      client.webApps.listFunctions(resourceGroupName, name),
                    listNextCall: (
                      nextLink: string
                    ): Promise<WebAppsListFunctionsNextResponse> =>
                      client.webApps.listFunctionsNext(nextLink),
                    debugScope: {
                      service: serviceName,
                      client,
                      scope: 'webApps',
                    },
                  })
              )
            )
          ).flat() || []
        logger.debug(lt.foundFunctions(azureFunctions.length))
      },
      {
        service: serviceName,
        client,
        scope: 'azureFunctions',
        operation: 'getAllResources',
      }
    )

    const result: { [property: string]: RawAzureFunctionApp[] } = {}
    functionApps.map(
      ({
        name,
        tags,
        location,
        siteConfig,
        hostNameSslStates,
        cloningInfo,
        slotSwapStatus,
        ...rest
      }) => {
        const region = lowerCaseLocation(location)
        if (regions.includes(region)) {
          if (!result[region]) {
            result[region] = []
          }
          const resourceGroup = getResourceGroupFromEntity(rest)
          result[region].push({
            name,
            ...rest,
            region,
            resourceGroup,
            Tags: tags || {},
            functions: azureFunctions
              .filter(i => i.functionAppName === name)
              .map(({ config: functionConfig, files, ...restOfFunction }) => ({
                ...restOfFunction,
              })),
          })
        }
      }
    )

    return result
  } catch (e) {
    logger.error(e)
  }
}
