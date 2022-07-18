import { AzureBilling } from '../../types/generated'
import { RawAzureBilling } from './data'
import { ConsumptionUtils } from './utils'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureBilling
  account: string
  region: string
}): AzureBilling => {
  const utils = new ConsumptionUtils(false)
  const {
    totalCostLast30Days,
    totalCostMonthToDate,
    last30DaysDailyAverage,
    monthToDateDailyAverage,
    monthToDate = {},
    last30Days = {},
  } = service
  const formattedMonthToDate = utils.formatCostData(monthToDate)
  const formattedLast30Days = utils.formatCostData(last30Days)
  const formattedLast30DailyAverage = utils.formatCostData(last30DaysDailyAverage)
  const formattedMonthToDateDailyAverage = utils.formatCostData(
    monthToDateDailyAverage
  )
  return {
    id: `billing:${account}`,
    subscriptionId: account,
    region,
    totalCostMonthToDate,
    totalCostLast30Days,
    monthToDate: formattedMonthToDate,
    last30Days: formattedLast30Days,
    monthToDateDailyAverage: formattedMonthToDateDailyAverage,
    last30DaysDailyAverage: formattedLast30DailyAverage,
  }
}
