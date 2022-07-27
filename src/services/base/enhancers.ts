import { ProviderData } from '@cloudgraph/sdk'
import { rawDataInterface } from '../../types'
import { checkAndMergeConnections } from '../../utils'
import addSubscriptionConnections from '../subscription/connections'

/**
 * Data Enhancers
 */
export interface EnhancerConfig {
  rawData: rawDataInterface[]
  subscriptions: { id: string; accountId: string; regions: string[] }[]
  configuredRegions: string
  data: ProviderData
}

/**
 * Generates Azure services connections to Scanned subscriptions
 * @param {EnhancerConfig} subscriptions Scanned subscriptions
 * @param {EnhancerConfig} data Azure Services fetched data
 * @returns {ProviderData}
 */
export const connectAzureServicesToSubscription = ({
  subscriptions,
  data,
}: EnhancerConfig): ProviderData => {
  let subscriptionsConnections = {}
  for (const account of subscriptions) {
    const connections = addSubscriptionConnections({
      service: account,
      data: data.entities,
    })
    subscriptionsConnections = {
      ...subscriptionsConnections,
      ...connections,
    }
  }
  return {
    entities: data.entities,
    connections: checkAndMergeConnections(
      data.connections,
      subscriptionsConnections
    ),
  }
}

export default [
  { name: 'subscription', enhancer: connectAzureServicesToSubscription },
]
