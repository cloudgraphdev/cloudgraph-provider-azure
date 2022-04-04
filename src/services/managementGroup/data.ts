import {
  ManagementGroupsAPI,
  ManagementGroup,
} from '@azure/arm-managementgroups'
import { PagedAsyncIterableIterator } from '@azure/core-paging'
import CloudGraph from '@cloudgraph/sdk'
import isEmpty from 'lodash/isEmpty'

import azureLoggerText from '../../properties/logger'
import services from '../../enums/services'
import { AzureServiceInput } from '../../types'
import { lowerCaseLocation } from '../../utils/format'
import { tryCatchWrapper } from '../../utils/index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'ManagementGroup'

export interface RawAzureManagementGroup extends ManagementGroup {
  region: string
}

export default async ({
  config,
  rawData,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureManagementGroup[]
}> => {
  try {
    const existingData: { [property: string]: RawAzureManagementGroup[] } =
      rawData.find(({ name }) => name === services.managementGroup)?.data || {}

    if (isEmpty(existingData)) {
      const { tokenCredentials } = config
      const client = new ManagementGroupsAPI(tokenCredentials)

      const managementGroups: RawAzureManagementGroup[] = []
      const managementGroupIterable: PagedAsyncIterableIterator<ManagementGroup> =
        client.managementGroups.list()
      await tryCatchWrapper(
        async () => {
          for await (const managementGroup of managementGroupIterable) {
            if (managementGroup) {
              const { ...rest } = managementGroup
              const region = lowerCaseLocation('')
              managementGroups.push({
                ...rest,
                region,
              })
            }
          }
        },
        {
          service: serviceName,
          client,
          scope: 'managementGroups',
          operation: 'list',
        }
      )
      logger.debug(lt.foundManagementGroups(managementGroups.length))

      const result: { [property: string]: RawAzureManagementGroup[] } = {}
      managementGroups.map(({ region, ...rest }) => {
        result[region].push({
          region,
          ...rest,
        })
      })
      return result
    }
    return existingData
  } catch (e) {
    logger.error(e)
    return {}
  }
}
