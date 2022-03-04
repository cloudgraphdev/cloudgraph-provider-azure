import isEmpty from 'lodash/isEmpty'
import CloudGraph from '@cloudgraph/sdk'
import getResourceGroupData from '../resourceGroup/data'
import azureLoggerText from '../../properties/logger'
import { AzureServiceInput, TagMap } from '../../types'
import { getResourceGroupNames, lowerCaseLocation } from '../../utils/format'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'
import { RestApiClient } from '../../utils/apiUtils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'MonitorInsightsActivityLogAlertRule'

interface RestApiActivityLogAlertRule {
  id: string
  location: string
  name: string
  type: string
  properties: {
    actions: {
      actionGroups: Array<{
        actionGroupId: string
        webhookProperties: {
          [property: string]: string
        }
      }>
    }
    condition: {
      allOf: Array<{
        field?: string
        equals?: string
        containsAny?: string[]
        'odata.type'?: string
      }>
      containsAny?: string[]
      equals?: string
      field?: string
      'odata.type'?: string
    }
    description: string
    enabled: boolean
    scopes: string[]
  }
  resourceGroupId: string
  tags: {
    [property: string]: string
  }
}

export interface RawMonitorInsightsActivityLogAlertRule
  extends Omit<
    RestApiActivityLogAlertRule,
    'tags' | 'location' | 'resourceGroup'
  > {
  region: string
  resourceGroupId: string
  Tags: TagMap
}

class MicrosoftInsightsRestApiClient extends RestApiClient {}

export default async ({
  regions,
  config,
  rawData,
  opts,
}: AzureServiceInput): Promise<{
  [property: string]: RawMonitorInsightsActivityLogAlertRule[]
}> => {
  try {
    const client = new MicrosoftInsightsRestApiClient({
      config,
      scope: 'providers',
      kind: 'Microsoft.Insights',
    })

    const resourceGroups = await getResourceGroupData({
      regions,
      config,
      rawData,
      opts,
    })
    const resourceGroupsNames: string[] = getResourceGroupNames(resourceGroups)

    const alertRules: RestApiActivityLogAlertRule[] = []
    await tryCatchWrapper(
      async () => {
        await Promise.all(
          (resourceGroupsNames || []).map(async (rgName: string) => {
            const restAlertRulesInResourceGroup =
              await client.getRequestedData({
                type: 'activityLogAlerts',
                resourceGroupName: rgName,
              })

            if (!isEmpty(restAlertRulesInResourceGroup)) {
              for (const alertRule of restAlertRulesInResourceGroup) {
                alertRules.push({
                  ...alertRule,
                  resourceGroupId: rgName,
                })
              }
            }
          })
        )
      },
      {
        service: serviceName,
        client,
        scope: 'alertRules',
        operation: 'list',
      }
    )

    const result: {
      [property: string]: RawMonitorInsightsActivityLogAlertRule[]
    } = {}
    let numOfGroups = 0
    alertRules.map(({ tags, location, ...rest }) => {
      const region = lowerCaseLocation(location)
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          region,
          resourceGroupId,
          Tags: tags || {},
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundMonitorAlertRules(numOfGroups))

    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
