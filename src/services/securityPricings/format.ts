import cuid from 'cuid'
import { RawAzureSecurityPricing } from './data'
import { AzureSecurityPricing } from '../../types/generated'

export default ({
  service,
  account: subscriptionId
}: {
  service: RawAzureSecurityPricing
  account: string
}) : AzureSecurityPricing  => {
  const {
    id,
    name,
    type,
    region,
    pricingTier,
    freeTrialRemainingTime
  } = service
  return {
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    pricingTier,
    freeTrialRemainingTime
  }
}
