import cuid from 'cuid'
import { AzureFunctionApp } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureFunctionApp } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureFunctionApp
  account: string
  region: string
}): AzureFunctionApp => {
  const {
    enabledHostNames = [],
    extendedLocation = {},
    functions = [],
    hostNames = [],
    hostingEnvironmentProfile = {},
    id,
    lastModifiedTimeUtc,
    suspendedTill,
    Tags,
    trafficManagerHostNames = [],
    ...rest
  } = service
  return {
    id: id || cuid(),
    ...rest,
    subscriptionId: account,
    region,
    hostNames,
    enabledHostNames,
    trafficManagerHostNames,
    hostingEnvironmentProfile,
    extendedLocation,
    lastModifiedTimeUtc: lastModifiedTimeUtc?.toUTCString(),
    suspendedTill: suspendedTill?.toUTCString(),
    functions: functions.map(({ ...data }) => ({ ...data, id: cuid() })),
    tags: formatTagsFromMap(Tags),
  }
}
