import {
  AzureStorageInfoValue,
  SiteConfigResource,
} from '@azure/arm-appservice'
import cuid from 'cuid'
import isArray from 'lodash/isArray'
import toString from 'lodash/toString'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureAppServiceWebApp } from './data'
import {
  AzureAppServiceWebApp,
  AzureAppServiceWebAppHostNameSslState,
  AzureAppServiceWebAppSiteConfig,
} from '../../types/generated'

export interface RawAzureStorageInfoValue extends AzureStorageInfoValue {
  id: string
  name: string
}

export interface RawSiteConfigResource extends SiteConfigResource {
  tags?: {
    [propertyName: string]: string
  }
}

const formatAzureStorageAccounts = (azureStorageAccounts: {
  [propertyName: string]: AzureStorageInfoValue
}): RawAzureStorageInfoValue[] => {
  return Object.entries(azureStorageAccounts).map(([key, value]) => {
    if (!value) return {} as RawAzureStorageInfoValue
    return {
      id: cuid(),
      name: key,
      type: value.type,
      accountName: value.accountName,
      shareName: value.shareName,
      accessKey: value.accessKey,
      mountPath: value.mountPath,
      state: value.state,
    }
  })
}

const formatHeaders = headers => {
  if (!headers) return null
  return Object.entries(headers).map(([key, value]) => {
    const conVal = (isArray(value) ? value : [value]) || []
    return {
      id: cuid(),
      key,
      value: conVal.map(val => toString(val)),
    }
  })
}

const formatSiteConfig = ({
  id,
  apiDefinition = {},
  apiManagementConfig = {},
  appSettings = [],
  autoHealRules = {},
  azureStorageAccounts = {},
  connectionStrings = [],
  experiments = {},
  handlerMappings = [],
  ipSecurityRestrictions = [],
  push = {},
  requestTracingExpirationTime,
  scmIpSecurityRestrictions = [],
  virtualApplications = [],
  tags = {},
  ...restConfig
}: RawSiteConfigResource): AzureAppServiceWebAppSiteConfig => {
  return {
    id: id || cuid(),
    autoHealRules: {
      triggers:
        {
          requests: autoHealRules?.triggers?.requests,
          privateBytesInKB: autoHealRules?.triggers?.privateBytesInKB,
          statusCodes:
            autoHealRules?.triggers?.statusCodes?.map(s => ({
              id: cuid(),
              ...s,
            })) || [],
          slowRequests: autoHealRules?.triggers?.slowRequests,
          slowRequestsWithPath:
            autoHealRules?.triggers?.slowRequestsWithPath?.map(s => ({
              id: cuid(),
              ...s,
            })) || [],
          statusCodesRange:
            autoHealRules?.triggers?.statusCodesRange?.map(s => ({
              id: cuid(),
              ...s,
            })) || [],
        } || {},
      actions: autoHealRules?.actions || {},
    },
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
      virtualApplications?.map(({ virtualDirectories, ...v }) => ({
        id: cuid(),
        virtualDirectories:
          virtualDirectories?.map(d => ({
            id: cuid(),
            ...d,
          })) || [],
        ...v,
      })) || [],
    experiments: {
      rampUpRules:
        experiments?.rampUpRules?.map(r => ({ id: cuid(), ...r })) || [],
    },
    ipSecurityRestrictions:
      ipSecurityRestrictions?.map(({ headers, ...i }) => ({
        id: cuid(),
        headers: formatHeaders(headers),
        ...i,
      })) || [],
    scmIpSecurityRestrictions:
      scmIpSecurityRestrictions?.map(({ headers, ...s }) => ({
        id: cuid(),
        headers: formatHeaders(headers),
        ...s,
      })) || [],
    handlerMappings: handlerMappings?.map(h => ({ id: cuid(), ...h })) || [],
    azureStorageAccounts: formatAzureStorageAccounts(azureStorageAccounts),
    tags: formatTagsFromMap(tags),
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
    resourceGroupId,
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
    siteAuthSettings,
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
    resourceGroupId,
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
    siteConfig: formatSiteConfig(siteConfig as RawSiteConfigResource),
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
    authEnabled: siteAuthSettings?.enabled,
  }
}
