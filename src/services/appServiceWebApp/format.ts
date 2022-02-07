import { SiteConfig } from '@azure/arm-appservice'
import cuid from 'cuid'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureAppServiceWebApp } from './data'
import {
  AzureAppServiceWebApp,
  AzureAppServiceWebAppHostNameSslState,
  AzureAppServiceWebAppSiteConfig,
} from '../../types/generated'

interface ExtendedAzureAppServiceWebAppSiteConfig extends SiteConfig {
  apiManagementConfig: any
  customAppPoolIdentityAdminState: any
  customAppPoolIdentityTenantState: any
  ipSecurityRestrictions: any[]
  machineKey: any
  metadata: any
  publishingPassword: string
  push: any
  routingRules: any[]
  runtimeADUser: string
  runtimeADUserPassword: string
  scmIpSecurityRestrictions: any[]
}

const formatSiteConfig = ({
  apiDefinition = {},
  apiManagementConfig = {},
  appSettings = [],
  autoHealRules, // ignored
  azureStorageAccounts, // ignored
  connectionStrings = [],
  customAppPoolIdentityAdminState, // ignored
  customAppPoolIdentityTenantState, // ignored
  experiments, // ignored
  handlerMappings, // ignored
  ipSecurityRestrictions, // ignored
  machineKey, // ignored
  metadata, // ignored
  publishingPassword, // ignored
  push = {},
  requestTracingExpirationTime,
  routingRules, // ignored
  runtimeADUser, // ignored
  runtimeADUserPassword, // ignored
  scmIpSecurityRestrictions, // ignored
  virtualApplications = [],
  ...restConfig
}: ExtendedAzureAppServiceWebAppSiteConfig): AzureAppServiceWebAppSiteConfig => {
  return {
    appSettings:
      appSettings?.map(({ name, value }) => ({
        id: cuid(),
        name,
        value,
      })) || [],
    apiDefinitionInfoUrl: apiDefinition?.url || '',
    apiManagementConfigId: apiManagementConfig?.id || '',
    connectionStrings:
      connectionStrings?.map(c => ({ id: cuid(), ...c })) || [],
    requestTracingExpirationTime: requestTracingExpirationTime?.toISOString(),
    isPushEnabled: push?.isPushEnabled || false,
    virtualApplications:
      virtualApplications?.map(v => ({ id: cuid(), ...v })) || [],
    ...restConfig,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureAppServiceWebApp
  account: string
  region: string
}): AzureAppServiceWebApp => {
  const {
    id,
    name,
    type,
    Tags = {},
    resourceGroup,
    state,
    hostNames = [],
    repositorySiteName,
    usageState,
    enabled,
    enabledHostNames = [],
    availabilityState,
    hostNameSslStates = [],
    serverFarmId,
    reserved,
    isXenon,
    hyperV,
    lastModifiedTimeUtc,
    siteConfig = {},
    trafficManagerHostNames = [],
    scmSiteAlsoStopped,
    targetSwapSlot,
    clientAffinityEnabled,
    clientCertEnabled,
    clientCertMode,
    clientCertExclusionPaths,
    hostNamesDisabled,
    customDomainVerificationId,
    outboundIpAddresses,
    possibleOutboundIpAddresses,
    containerSize,
    dailyMemoryTimeQuota,
    suspendedTill,
    maxNumberOfWorkers,
    isDefaultContainer,
    defaultHostName,
    httpsOnly,
    redundancyMode,
    inProgressOperationId,
    storageAccountRequired,
    keyVaultReferenceIdentity,
    virtualNetworkSubnetId,
  } = service

  return {
    id: id || cuid(),
    subscriptionId: account,
    name,
    type,
    region,
    hyperV,
    isXenon,
    reserved,
    resourceGroup,
    tags: formatTagsFromMap(Tags),
    state,
    hostNames,
    repositorySiteName,
    usageState,
    enabled,
    enabledHostNames,
    availabilityState,
    hostNameSslStates:
      hostNameSslStates?.map(h => ({
        id: cuid(),
        ...(h as AzureAppServiceWebAppHostNameSslState),
      })) || [],
    serverFarmId,
    lastModifiedTimeUtc: lastModifiedTimeUtc?.toISOString(),
    siteConfig: formatSiteConfig(
      siteConfig as ExtendedAzureAppServiceWebAppSiteConfig
    ),
    trafficManagerHostNames,
    scmSiteAlsoStopped,
    targetSwapSlot,
    clientAffinityEnabled,
    clientCertEnabled,
    clientCertMode,
    clientCertExclusionPaths,
    hostNamesDisabled,
    customDomainVerificationId,
    outboundIpAddresses,
    possibleOutboundIpAddresses,
    containerSize,
    dailyMemoryTimeQuota,
    suspendedTill: suspendedTill?.toISOString(),
    maxNumberOfWorkers,
    isDefaultContainer,
    defaultHostName,
    httpsOnly,
    redundancyMode,
    inProgressOperationId,
    storageAccountRequired,
    keyVaultReferenceIdentity,
    virtualNetworkSubnetId,
  }
}
