import { WebSiteManagementClient } from '@azure/arm-appservice'
import { FunctionEnvelope, Site } from '@azure/arm-appservice/esm/models'
import CloudGraph from '@cloudgraph/sdk'
import head from 'lodash/head'

import getResourceGroupData from '../resourceGroup/data'
import apiSelectors from '../../enums/apiSelectors'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupNames, lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'FunctionApp'

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
  functions: FunctionEnvelope[]
  Tags: TagMap
}

export default async ({
  regions,
  config,
  rawData,
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
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)

    let functionApps: Site[] = []
    await tryCatchWrapper(
      async () => {
        functionApps =
          (
            await Promise.all(
              (resourceGroupsNames || []).map(
                async (resourceGroupName: string) =>
                  client.webApps.listByResourceGroup(resourceGroupName)
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
        scope: 'webApps',
        operation: 'listByResourceGroup',
      }
    )

    let azureFunctions: FunctionEnvelope[] = []
    await tryCatchWrapper(
      async () => {
        azureFunctions =
          (
            await Promise.all(
              (functionApps || []).map(
                async ({ name, resourceGroup: resourceGroupName }) =>
                  client.webApps.listFunctions(resourceGroupName, name)
              )
            )
          ).flat() || []
        logger.debug(lt.foundFunctions(azureFunctions.length))
      },
      {
        service: serviceName,
        client,
        scope: 'webApps',
        operation: 'listFunctions',
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
          result[region].push({
            name,
            ...rest,
            Tags: tags,
            functions: azureFunctions
              .filter(
                ({ name: funcName }) => head(funcName.split('/')) === name
              )
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
