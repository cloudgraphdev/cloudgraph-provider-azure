import CloudGraph from '@cloudgraph/sdk'
import { MonitorClient, DiagnosticSettingsResource } from '@azure/arm-monitor'

import azureLoggerText from '../../properties/logger'
import { lowerCaseLocation } from '../../utils/format'
import { AzureServiceConfig, AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'DiagnosticSettingsResource'

export interface RawAzureDiagnosticSetting
  extends Omit<DiagnosticSettingsResource, 'location'> {
  region: string
  resourceGroupId: string
}

export const getDiagnosticSettings = async (
  config: AzureServiceConfig,
  resourceUri: string
): Promise<DiagnosticSettingsResource[]> => {
  const { tokenCredentials, subscriptionId } = config
  const client = new MonitorClient(tokenCredentials, subscriptionId)
  const diagnosticSettings: DiagnosticSettingsResource[] = []
  await tryCatchWrapper(
    async () => {
      const { value: settings = [] } = await client.diagnosticSettings.list(
        resourceUri
      )
      if (settings) {
        diagnosticSettings.push(...settings)
      }
    },
    {
      service: serviceName,
      client,
      scope: 'diagnosticSettings',
      operation: 'list',
    }
  )
  logger.debug(lt.foundDiagnosticSettingsResources(diagnosticSettings.length))
  return diagnosticSettings
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDiagnosticSetting[]
}> => {
  const { subscriptionId } = config
  try {
    const result: { [property: string]: RawAzureDiagnosticSetting[] } = {}
    const diagnosticSettings = await getDiagnosticSettings(
      config,
      `/subscriptions/${subscriptionId}`
    )
    diagnosticSettings.map(d => {
      const region = lowerCaseLocation('')
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroupId = getResourceGroupFromEntity(d)
        result[region].push({
          ...d,
          resourceGroupId,
          region,
        })
      }
    })

    return result
  } catch (e) {
    logger.debug(e)
    return {}
  }
}
