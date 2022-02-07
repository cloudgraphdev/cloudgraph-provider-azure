import cuid from 'cuid'
import { Capability } from '@azure/arm-appservice'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureAppServicePlan } from './data'
import { AzureAppServicePlan } from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureAppServicePlan
  account: string
  region: string
}): AzureAppServicePlan => {
  const {
    id,
    name,
    type,
    Tags,
    elasticScaleEnabled,
    freeOfferExpirationTime,
    geoRegion,
    hyperV,
    isSpot,
    isXenon,
    maximumElasticWorkerCount,
    maximumNumberOfWorkers,
    numberOfSites,
    perSiteScaling,
    provisioningState,
    reserved,
    resourceGroup,
    sku: { capabilities = [], ...restOfSku } = {},
    spotExpirationTime,
    status,
    subscription,
    targetWorkerCount,
    targetWorkerSizeId,
    workerTierName,
    zoneRedundant,
  } = service
  return {
    id: id || cuid(),
    subscriptionId: subscription || account,
    name,
    type,
    region,
    elasticScaleEnabled,
    freeOfferExpirationTime: freeOfferExpirationTime?.toISOString(),
    geoRegion,
    hyperV,
    isSpot,
    isXenon,
    maximumElasticWorkerCount,
    maximumNumberOfWorkers,
    numberOfSites,
    perSiteScaling,
    provisioningState,
    reserved,
    resourceGroup,
    skuDescription: {
      capabilities:
        capabilities?.map((c: Capability) => ({ id: cuid(), ...c })) || [],
      ...restOfSku,
    },
    spotExpirationTime: spotExpirationTime?.toISOString(),
    status,
    targetWorkerCount,
    targetWorkerSizeId,
    workerTierName,
    zoneRedundant,
    tags: formatTagsFromMap(Tags),
  }
}
