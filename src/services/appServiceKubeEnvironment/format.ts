import cuid from 'cuid'
import {
  AzureAppServiceKubeEnvironment,
  AzureAppServiceKubeEnvironmentAppLogsConfig,
  AzureAppServiceKubeEnvironmentArcConfig,
  AzureAppServiceKubeEnvironmentContainerAppsConfig,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureAppServiceKubeEnvironment } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureAppServiceKubeEnvironment
  account: string
  region: string
}): AzureAppServiceKubeEnvironment => {
  const {
    id,
    name,
    type,
    Tags = {},
    resourceGroupId,
    provisioningState,
    deploymentErrors,
    internalLoadBalancerEnabled,
    defaultDomain,
    staticIp,
    environmentType,
    arcConfiguration: {
      artifactsStorageType,
      artifactStorageClassName,
      artifactStorageMountPath,
      artifactStorageNodeName,
      artifactStorageAccessMode,
      frontEndServiceConfiguration: { kind: frontEndServiceConfigurationKind },
      kubeConfig,
    } = {},
    appLogsConfiguration: {
      destination,
      logAnalyticsConfiguration: { customerId: logAnalyticsCustomerId } = {},
    } = {},
    containerAppsConfiguration: {
      daprAIInstrumentationKey,
      ...restOfCAppConfig
    } = {},
    aksResourceID,
  } = service

  const arcConfiguration: AzureAppServiceKubeEnvironmentArcConfig =
    {
      artifactsStorageType,
      artifactStorageClassName,
      artifactStorageMountPath,
      artifactStorageNodeName,
      artifactStorageAccessMode,
      frontEndServiceConfigurationKind,
      kubeConfig,
    } || undefined
  const appLogsConfiguration: AzureAppServiceKubeEnvironmentAppLogsConfig =
    {
      destination,
      logAnalyticsCustomerId,
    } || undefined
  const containerAppsConfiguration: AzureAppServiceKubeEnvironmentContainerAppsConfig =
    { ...restOfCAppConfig } || undefined

  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
    provisioningState,
    deploymentErrors,
    internalLoadBalancerEnabled,
    defaultDomain,
    staticIp,
    environmentType,
    arcConfiguration,
    appLogsConfiguration,
    containerAppsConfiguration,
    aksResourceID,
  }
}
