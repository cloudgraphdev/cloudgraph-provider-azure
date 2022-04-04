import cuid from 'cuid'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureAppServiceEnvironment } from './data'
import { AzureAppServiceEnvironment } from '../../types/generated'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureAppServiceEnvironment
  account: string
  region: string
}): AzureAppServiceEnvironment => {
  const {
    id,
    name,
    type,
    Tags,
    kind,
    provisioningState,
    status,
    virtualNetwork,
    internalLoadBalancingMode,
    multiSize,
    multiRoleCount,
    ipsslAddressCount,
    dnsSuffix,
    maximumNumberOfMachines,
    frontEndScaleFactor,
    suspended,
    clusterSettings,
    userWhitelistedIpRanges,
    hasLinuxWorkers,
    dedicatedHostCount,
    zoneRedundant,
  } = service
  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    kind,
    type,
    region,
    provisioningState,
    status,
    virtualNetworkProfile: virtualNetwork,
    internalLoadBalancingMode,
    multiSize,
    multiRoleCount,
    ipsslAddressCount,
    dnsSuffix,
    maximumNumberOfMachines,
    frontEndScaleFactor,
    suspended,
    clusterSettings: clusterSettings?.map(({ name: settingsName, value }) => ({
      id: cuid(),
      name: settingsName,
      value,
    })),
    userWhitelistedIpRanges,
    hasLinuxWorkers,
    dedicatedHostCount,
    zoneRedundant,
    tags: formatTagsFromMap(Tags),
  }
}
