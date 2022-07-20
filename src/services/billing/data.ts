import CloudGraph from '@cloudgraph/sdk'
import * as _ from 'lodash'
import { regionMap } from '../../enums/regions'
import azureLoggerText from '../../properties/logger'
import { AzureRestApiNewClientParams, AzureServiceInput } from '../../types'
import { tryCatchWrapper } from '../../utils'
import { RestApiClient } from '../../utils/apiUtils'
import {
  createDiffSecs,
  getCurrentDayOfMonth,
  getDaysAgo,
  getFirstDayOfMonth
} from '../../utils/dateutils'
import { ConsumptionUtils, RawAzureUsageDetailUnion } from './utils'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }
const serviceName = 'Billing'

export interface costInterface {
  cost?: number
  currency?: string
  formattedCost?: string
}

export interface RawAzureBilling {
  totalCostLast30Days: costInterface
  totalCostMonthToDate: costInterface
  monthToDateDailyAverage: { [key: string]: costInterface }
  last30DaysDailyAverage: { [key: string]: costInterface }
  monthToDate: { [key: string]: costInterface }
  last30Days: { [key: string]: costInterface }
  individualData: { [key: string]: costInterface }
}

export default async ({
  config,
}: AzureServiceInput): Promise<{
  [property: string]: RawAzureBilling[]
}> => {
  const utils = new ConsumptionUtils(false)
  const startDate = new Date()
  const region = regionMap.global
  const results: RawAzureBilling = {
    totalCostLast30Days: {},
    totalCostMonthToDate: {},
    monthToDateDailyAverage: {},
    last30DaysDailyAverage: {},
    monthToDate: {},
    last30Days: {},
    individualData: {},
  }
  const resultPromises = []
  logger.debug(lt.fetchingAggregateFinOpsData)
  try {
    const client = new RestApiClient({
      config,
      options: { version: '2021-10-01' },
    } as AzureRestApiNewClientParams)

    const listAggregateFinOpsData = async ({
      resolve,
      type,
      groupBy = true,
      individualData = false,
      timePeriod: TimePeriod,
    }: {
      resolve: () => void
      type: string
      groupBy?: boolean
      individualData?: boolean
      timePeriod: { Start: string; End: string }
    }): Promise<void> => {
      logger.debug(lt.queryingAggregateFinOpsDataForRegion(region, type))
      const usageDetails: RawAzureUsageDetailUnion[] = []
      await tryCatchWrapper(
        async () => {
          const data = await utils.getUsageDetails(
            client,
            TimePeriod.Start,
            TimePeriod.End
          )
          if (data) {
            usageDetails.push(...data)
          }
        },
        {
          service: serviceName,
          client,
          scope: 'usageDetails',
          operation: 'list',
        }
      )

      if (_.isEmpty(usageDetails)) {
        logger.debug(lt.unableToFindFinOpsAggregateData)
        return resolve()
      }

      if (groupBy || individualData) {
        const services = _.groupBy(usageDetails, u => u.consumedService)
        Object.keys(services).map(name => {
          const serviceUsages = services[name]
          const currency = utils.getCurrency(serviceUsages)
          const cost = utils.getTotalCost(serviceUsages)
          const costData = {
            cost,
            currency,
            formattedCost: utils.formatAmmountAndUnit({
              Amount: cost,
              Unit: currency,
            }),
          }
          if (individualData) {
            results.individualData[name] = costData
          } else {
            results[type][name] = costData
          }
        })
      } else {
        const currency = utils.getCurrency(usageDetails)
        const cost = utils.getTotalCost(usageDetails)
        results[type] = {
          cost,
          currency,
          formattedCost: utils.formatAmmountAndUnit({
            Amount: cost,
            Unit: currency,
          }),
        }
      }

      resolve()
    }

    /**
     * Now we make 4 queries to the api in order to get aggregate pricing data sliced in various ways
     */

    const today = new Date().toLocaleDateString('en-ca')
    const startOfMonth = getFirstDayOfMonth()

    const commonArgs = {
      timePeriod: {
        Start: getDaysAgo(30),
        End: today,
      },
    }

    /**
     * Breakdown by service types and spend for last 30 days
     */
    const last30DaysData = new Promise<void>(resolve =>
      listAggregateFinOpsData({
        ...commonArgs,
        resolve,
        type: 'last30Days',
      })
    )
    resultPromises.push(last30DaysData)

    /**
     * Breakdown by service types and spend since the beginning of the month
     */
    if (!(today === startOfMonth)) {
      const monthToDateData = new Promise<void>(resolve =>
        listAggregateFinOpsData({
          resolve,
          type: 'monthToDate',
          timePeriod: {
            Start: startOfMonth,
            End: today,
          },
        })
      )
      resultPromises.push(monthToDateData)
    }

    /**
     * The single total cost of everything in the last 30 days
     */
    const totalCostLast30Days = new Promise<void>(resolve =>
      listAggregateFinOpsData({
        ...commonArgs,
        resolve,
        type: 'totalCostLast30Days',
        groupBy: false,
      })
    )
    resultPromises.push(totalCostLast30Days)

    /**
     * The single total cost of everything in the current month
     */
    if (!(today === startOfMonth)) {
      const totalCostMonthToDate = new Promise<void>(resolve =>
        listAggregateFinOpsData({
          resolve,
          type: 'totalCostMonthToDate',
          groupBy: false,
          timePeriod: {
            Start: startOfMonth,
            End: today,
          },
        })
      )
      resultPromises.push(totalCostMonthToDate)
    }

    const individualDataPromise = new Promise<void>(resolve =>
      listAggregateFinOpsData({
        resolve,
        type: 'individualData',
        individualData: true,
        timePeriod: {
          Start: getDaysAgo(1), // i.e. get the daily cost
          End: today,
        },
      })
    )
    resultPromises.push(individualDataPromise)

    await Promise.all(resultPromises)

    /**
     * Create Daily Averages
     */

    const createDailyAverage = ({
      days,
      resultMonthlyData,
      resultAverageData,
    }): void[] =>
      Object.keys(resultMonthlyData).map(service => {
        const { cost: aggregateCost, currency } = resultMonthlyData[service]
        const cost = parseFloat((aggregateCost / days).toFixed(10))
        results[resultAverageData][service] = {
          cost,
          currency,
          formattedCost: utils.formatAmmountAndUnit({ Amount: cost, Unit: currency }),
        }
      })

    if (!_.isEmpty(results.monthToDate)) {
      createDailyAverage({
        days: parseInt(getCurrentDayOfMonth(), 10),
        resultMonthlyData: results.monthToDate,
        resultAverageData: 'monthToDateDailyAverage',
      })
    }
    if (!_.isEmpty(results.last30Days)) {
      createDailyAverage({
        days: 30,
        resultMonthlyData: results.last30Days,
        resultAverageData: 'last30DaysDailyAverage',
      })
    }

    logger.debug(lt.doneFetchingAggregateFinOpsData(createDiffSecs(startDate)))
    return { [regionMap.global]: [results] }
  } catch (e) {
    logger.error(e)
  }
}
