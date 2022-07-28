import { head, sumBy } from 'lodash'
import { RestApiClient } from '../../utils/apiUtils'
import { costInterface } from './data'

export interface RawAzureUsageDetailUnion {
  consumedService?: string
  date?: Date
  quantity?: number
  unitPrice?: number
  pricingCurrencyCode?: string
  costInUSD?: number
  paygCostInUSD?: number
  billingCurrency?: string // legacy
  cost?: number // legacy
}

export class ConsumptionUtils {
  // TODO: this flag should be set with the subscription type (modern/legacy)
  // legacy: customers with an Enterprise Agreement (EA) or a pay-as-you-go
  isLegacyCustomer: boolean 

  constructor(isLegacyCustomer: boolean) {
    this.isLegacyCustomer = isLegacyCustomer
  }

  getUsageDetails = async (
    client: RestApiClient,
    startDate?: Date | string,
    endDate?: Date | string
  ): Promise<RawAzureUsageDetailUnion[]> => {
    let filters = ''
    if (startDate && endDate) {
      filters = this.isLegacyCustomer
        ? `$filter=properties/usageStart eq ${startDate} and properties/usageEnd eq ${endDate}`
        : `startDate=${startDate}&endDate=${endDate}`
    }

    const path = 'providers/Microsoft.Consumption/usageDetails'

    const data = await client.listData({ path, filters })

    return data?.map(v => v.properties) || []
  }

  formatServiceName = (name: string): string => {
    const serviceName = name?.replace(/microsoft./gi, '')
    return serviceName.charAt(0).toUpperCase() + serviceName.slice(1)
  }

  formatCostData = (costData: {
    [key: string]: costInterface
  }): {
    name: string
    cost?: number
    currency?: string
    formattedCost?: string
  }[] =>
    Object.keys(costData).map(name => ({
      name: this.formatServiceName(name),
      ...costData[name],
    }))

  getRoundedAmount = (amount: number): number =>
    Math.round((amount + Number.EPSILON) * 100) / 100

  formatAmmountAndUnit = ({
    Amount: amount = 0,
    Unit: currency = 'USD',
  }: {
    Amount?: number
    Unit?: string
  }): string =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
      this.getRoundedAmount(amount)
    )

  getTotalCost = (usages: RawAzureUsageDetailUnion[]): number => {
    const cost = sumBy(usages, usage => {
      return usage.quantity * usage.unitPrice
    })

    return this.getRoundedAmount(cost)
  }

  getCurrency = (usages: RawAzureUsageDetailUnion[]): string =>
    this.isLegacyCustomer
      ? head(usages).billingCurrency
      : head(usages).pricingCurrencyCode
}
