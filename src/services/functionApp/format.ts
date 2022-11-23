import { generateUniqueId } from '@cloudgraph/sdk'
import isArray from 'lodash/isArray'
import toString from 'lodash/toString'
import {
  AzureStorageInfoValue,
  SiteConfigResource,
} from '@azure/arm-appservice'
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
      id: generateUniqueId({
        name: key,
        type: value.type,
      }),
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
      id: generateUniqueId({
        key,
      }),
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
  machineKey,
  tags = {},
  ...restConfig
}: RawSiteConfigResource): AzureAppServiceWebAppSiteConfig => {
  return {
    id,
    autoHealRules: {
      triggers:
        {
          requests: autoHealRules?.triggers?.requests,
          privateBytesInKB: autoHealRules?.triggers?.privateBytesInKB,
          statusCodes:
            autoHealRules?.triggers?.statusCodes?.map(s => ({
              id: generateUniqueId({ path: s.path }),
              ...s,
            })) || [],
          slowRequests: autoHealRules?.triggers?.slowRequests,
          slowRequestsWithPath:
            autoHealRules?.triggers?.slowRequestsWithPath?.map(s => ({
              id: generateUniqueId({ path: s.path }),
              ...s,
            })) || [],
          statusCodesRange:
            autoHealRules?.triggers?.statusCodesRange?.map(s => ({
              id: generateUniqueId({ path: s.path }),
              ...s,
            })) || [],
        } || {},
      actions: autoHealRules?.actions || {},
    },
    appSettings:
      appSettings?.map(({ name, value }) => ({
        id: generateUniqueId({ name }),
        name,
        value,
      })) || [],
    apiDefinitionInfoUrl: apiDefinition?.url || '',
    apiManagementConfigId: apiManagementConfig?.id || '',
    connectionStrings:
      connectionStrings?.map(c => ({ id: generateUniqueId({}), ...c })) || [],
    requestTracingExpirationTime: requestTracingExpirationTime?.toISOString(),
    isPushEnabled: push?.isPushEnabled || false,
    virtualApplications:
      virtualApplications?.map(({ virtualDirectories, ...v }) => ({
        id: generateUniqueId({ physicalPath: v.physicalPath }),
        virtualDirectories:
          virtualDirectories?.map(d => ({
            id: generateUniqueId({
              vPhysicalPath: v.physicalPath,
              physicalPath: d.physicalPath,
            }),
            ...d,
          })) || [],
        ...v,
      })) || [],
    experiments: {
      rampUpRules:
        experiments?.rampUpRules?.map(r => ({
          id: generateUniqueId({ name: r.name }),
          ...r,
        })) || [],
    },
    ipSecurityRestrictions:
      ipSecurityRestrictions?.map(({ headers, ...i }) => ({
        id: generateUniqueId({ name: i.name }),
        headers: formatHeaders(headers),
        ...i,
      })) || [],
    scmIpSecurityRestrictions:
      scmIpSecurityRestrictions?.map(({ headers, ...s }) => ({
        id: generateUniqueId({ name: s.name }),
        headers: formatHeaders(headers),
        ...s,
      })) || [],
    handlerMappings:
      handlerMappings?.map((h, index) => ({
        id: generateUniqueId({ ...h, id, index }),
        ...h,
      })) || [],
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
    id,
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
    functions: functions.map(({ ...data }) => ({
      ...data,
      id: generateUniqueId({}),
    })),
    siteConfig: formatSiteConfig(siteConfig),
    tags: formatTagsFromMap(Tags),
  }
}
