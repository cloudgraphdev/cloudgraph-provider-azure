import cuid from 'cuid'
import isArray from 'lodash/isArray'
import toString from 'lodash/toString'
import { AzureStorageInfoValue, SiteConfigResource } from '@azure/arm-appservice'
import {
  AzureFunctionApp,
  AzureAppServiceWebAppSiteConfig,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureFunctionApp } from './data'


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
      virtualApplications?.map(({virtualDirectories, ...v}) => ({ 
        id: cuid(),
        virtualDirectories: virtualDirectories?.map(d => ({
          id: cuid(),
          ...d
        })) || [],
        ...v 
      })) || [],
    experiments: {
      rampUpRules:
        experiments?.rampUpRules?.map(r => ({ id: cuid(), ...r })) || [],
    },
    ipSecurityRestrictions:
      ipSecurityRestrictions?.map(({ headers, ...i}) => ({ 
        id: cuid(), 
        headers: formatHeaders(headers),
        ...i 
      })) || [],
    scmIpSecurityRestrictions:
      scmIpSecurityRestrictions?.map(({ headers, ...s}) => ({ 
        id: cuid(), 
        headers: formatHeaders(headers),
        ...s 
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
    resourceGroupId,
    identity,
    siteConfig = {},
    ...rest
  } = service
  return {
    id: id || cuid(),
    ...rest,
    subscriptionId: account,
    region,
    resourceGroupId,
    hostNames,
    enabledHostNames,
    trafficManagerHostNames,
    hostingEnvironmentProfile,
    extendedLocation,
    lastModifiedTimeUtc: lastModifiedTimeUtc?.toUTCString(),
    suspendedTill: suspendedTill?.toUTCString(),
    functions: functions.map(({ ...data }) => ({ ...data, id: cuid() })),
    siteConfig: formatSiteConfig(siteConfig),
    tags: formatTagsFromMap(Tags),
  }
}
