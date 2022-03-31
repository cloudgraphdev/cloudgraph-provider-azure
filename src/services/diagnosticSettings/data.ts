import CloudGraph from '@cloudgraph/sdk'
import { MonitorClient, DiagnosticSettingsResource } from '@azure/arm-monitor'

import azureLoggerText from '../../properties/logger'
import { lowerCaseLocation } from '../../utils/format'
import { AzureServiceInput } from '../../types'
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

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureDiagnosticSetting[]
}> => {
  const { tokenCredentials, subscriptionId } = config
  const client = new MonitorClient(tokenCredentials, subscriptionId)

  try {
    const result: { [property: string]: RawAzureDiagnosticSetting[] } = {}
    let numOfGroups = 0
    await tryCatchWrapper(
      async () => {
        const diagnosticSettings: DiagnosticSettingsResource[] =
          (
            await client.diagnosticSettings.list(
              `/subscriptions/${subscriptionId}`
            )
          )?.value || []
        logger.debug(diagnosticSettings)
        numOfGroups = diagnosticSettings.length
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
      },
      {
        service: serviceName,
        client,
        scope: 'diagnosticSettings',
        operation: 'list',
      }
    )
    logger.debug(lt.foundDiagnosticSettingsResources(numOfGroups))
    return result
  } catch (e) {
    logger.debug(e)
    return {}
  }
}
