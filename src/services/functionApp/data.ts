import {
  FunctionEnvelope,
  Site,
  WebSiteManagementClient,
} from '@azure/arm-appservice'
import CloudGraph from '@cloudgraph/sdk'

import getResourceGroupData from '../resourceGroup/data'
import apiSelectors from '../../enums/apiSelectors'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupNames, lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils'
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
  const { subscriptionId, tokenCredentials } = config
  const client = new WebSiteManagementClient(tokenCredentials, subscriptionId)
  try {
    const resourceGroups = await getResourceGroupData({
      regions,
      config,
      rawData,
      opts,
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)

    const functionApps: Site[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (resourceGroupsNames || []).map(async (rgName: string) => {
            const functionAppsIterable =
              client.webApps.listByResourceGroup(rgName)
            for await (const functionApp of functionAppsIterable) {
              if (
                functionApp &&
                functionApp.kind.includes(apiSelectors.functionApp)
              ) {
                const resourceGroup = getResourceGroupFromEntity(functionApp)
                functionApps.push({
                  ...functionApp,
                  resourceGroup,
                })
              }
            }
          })
        )
        logger.debug(lt.foundFunctionApps(functionApps.length))
      },
      {
        service: serviceName,
        client,
        scope: 'webApps',
        operation: 'listByResourceGroup',
      }
    )

    const azureFunctions: RawAzureFunctionEnvelope[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (functionApps || []).map(
            async ({
              name: functionAppName,
              resourceGroup: functionAppResourceGroupName,
            }) => {
              const functionsIterable = client.webApps.listFunctions(
                functionAppResourceGroupName,
                functionAppName
              )
              for await (const functionObj of functionsIterable) {
                if (functionObj) {
                  azureFunctions.push({
                    ...functionObj,
                    functionAppName,
                  })
                }
              }
            }
          )
        )
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
