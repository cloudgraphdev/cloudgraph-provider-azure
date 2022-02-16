import { PagedAsyncIterableIterator } from '@azure/core-paging'
import {
  SecurityCenter,
  SecurityAssessmentResponse,
} from '@azure/arm-security'
import CloudGraph from '@cloudgraph/sdk'

import azureLoggerText from '../../properties/logger'
import { AzureServiceInput } from '../../types'
import { getResourceGroupFromEntity } from '../../utils/idParserUtils'
import { tryCatchWrapper } from '../../utils'
import { regionMap } from '../../enums/regions'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'SecurityAssesments'

export interface RawAzureSecurityAssesment
  extends SecurityAssessmentResponse {
  region: string
  resourceGroup: string
}

export default async ({
  regions,
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureSecurityAssesment[]
}> => {
  try {
    const { subscriptionId, tokenCredentials } = config
    const assestmentData: SecurityAssessmentResponse & { region: string }[] = []
    const clientGlobal = new SecurityCenter(
      tokenCredentials,
      subscriptionId,
      regionMap.global
    )
    const locationsIterable = clientGlobal.locations.list()
    const locations: string[] = []
    await tryCatchWrapper(
      async () => {
        for await (const location of locationsIterable) {
          locations.push(location.name)
        }
      },
      {
        service: serviceName,
        client: clientGlobal,
        scope: 'locations',
        operation: 'list',
      }
    )

    await Promise.all(
      (locations || []).map(async (location: string) => {
        const client = new SecurityCenter(tokenCredentials, subscriptionId, location)
        const scope = `/subscriptions/${subscriptionId}`
        const assesmentsIterableForRegion: PagedAsyncIterableIterator<SecurityAssessmentResponse> =
          client.assessments.list(scope)
        await tryCatchWrapper(
          async () => {
            for await (const assesment of assesmentsIterableForRegion) {
              assestmentData.push({ ...assesment, region: location })
            }
          },
          {
            service: serviceName,
            client,
            scope: 'assesments',
            operation: 'list',
          }
        )
      })
    )

    const result: {
      [property: string]: RawAzureSecurityAssesment[]
    } = {}
    let numOfGroups = 0
    assestmentData.map(({ region, ...rest }) => {
      if (regions.includes(region)) {
        if (!result[region]) {
          result[region] = []
        }
        const resourceGroup = getResourceGroupFromEntity(rest)
        result[region].push({
          ...rest,
          region,
          resourceGroup,
        })
        numOfGroups += 1
      }
    })
    logger.debug(lt.foundSecurityAssesments(numOfGroups))
    return result
  } catch (e) {
    logger.error(e)
    return {}
  }
}
