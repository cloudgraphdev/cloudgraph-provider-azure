import cuid from 'cuid'
import { RawAzureSynapseBigDataPool } from './data'
import { AzureSynapseBigDataPool } from '../../types/generated'

export default ({
  service,
  account: subscriptionId
}: {
  service : RawAzureSynapseBigDataPool
  account: string
}): AzureSynapseBigDataPool => {
  const {
    id,
    name,
    type,
    region,
    provisioningState,
    autoScale,
    creationDate,
    autoPause,
    isComputeIsolationEnabled,
    sessionLevelPackagesEnabled,
    cacheSize,
    dynamicExecutorAllocation,
    sparkEventsFolder,
    libraryRequirements,
    customLibraries,
    sparkConfigProperties,
    sparkVersion,
    defaultSparkLogFolder,
    nodeSize,
    nodeSizeFamily,
    lastSucceededTimestamp,
  } = service

  return {
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    provisioningState,
    autoScale,
    creationDate: creationDate?.toISOString(),
    autoPause,
    isComputeIsolationEnabled,
    sessionLevelPackagesEnabled,
    cacheSize,
    dynamicExecutorAllocation,
    sparkEventsFolder,
    libraryRequirements: {
      ...libraryRequirements,
      time: libraryRequirements?.time?.toISOString(),
    },
    customLibraries: customLibraries?.map(lib => ({
      ...lib,
      id: cuid(),
      uploadedTimestamp: lib?.uploadedTimestamp?.toISOString(),
    })),
    sparkConfigProperties: {
      ...sparkConfigProperties,
      time: sparkConfigProperties?.time?.toISOString(),
    },
    sparkVersion,
    defaultSparkLogFolder,
    nodeSize,
    nodeSizeFamily,
    lastSucceededTimestamp: lastSucceededTimestamp?.toISOString(),
  }
}
