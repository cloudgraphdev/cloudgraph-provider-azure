import { generateUniqueId } from '@cloudgraph/sdk'
import { ThrottlingRule } from '@azure/arm-cognitiveservices'
import { RawAzureCognitiveServicesAccount } from './data'
import {
  AzureCognitiveServicesAccount,
  AzureCognitiveServicesAccountThrottlingRule,
} from '../../types/generated'
import { formatTagsFromMap, transformSystemData } from '../../utils/format'

const formatThrottlingRules = (
  rules: ThrottlingRule[]
): AzureCognitiveServicesAccountThrottlingRule[] => {
  return (
    rules?.map(
      ({
        key,
        renewalPeriod,
        count,
        minCount,
        dynamicThrottlingEnabled,
        matchPatterns = [],
      }) => ({
        key,
        renewalPeriod,
        count,
        minCount,
        dynamicThrottlingEnabled,
        matchPatterns: matchPatterns.map(({ path, method }) => ({
          id: generateUniqueId({ path, method }),
          path,
          method,
        })),
      })
    ) || []
  )
}

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureCognitiveServicesAccount
  account: string
}): AzureCognitiveServicesAccount => {
  const {
    id,
    name,
    type,
    region,
    resourceGroupId,
    Tags = {},
    etag,
    kind,
    sku,
    identity: { type: iType, tenantId, principalId } = {},
    systemData,
    properties: {
      provisioningState,
      endpoint,
      internalId,
      capabilities = [],
      isMigrated,
      migrationToken,
      skuChangeInfo: {
        countOfDowngrades,
        countOfUpgradesAfterDowngrades,
        lastChangeDate,
      } = {},
      customSubDomainName,
      networkAcls: {
        defaultAction,
        ipRules = [],
        virtualNetworkRules = [],
      } = {},
      encryption: {
        keyVaultProperties: {
          keyName,
          keyVersion,
          keyVaultUri,
          identityClientId,
        } = {},
        keySource: encrytionKeySource,
      } = {},
      userOwnedStorage = [],
      privateEndpointConnections = [],
      publicNetworkAccess,
      apiProperties: {
        qnaRuntimeEndpoint,
        qnaAzureSearchEndpointKey,
        qnaAzureSearchEndpointId,
        statisticsEnabled,
        eventHubConnectionString,
        storageAccountConnectionString,
        aadClientId,
        aadTenantId,
        superUser,
        websiteName,
      } = {},
      dateCreated,
      callRateLimit: {
        count: cRLCount,
        renewalPeriod: cRLRenewalPeriod,
        rules: cRLRules = [],
      } = {},
      quotaLimit: {
        count: qLCount,
        renewalPeriod: qLRenewalPeriod,
        rules: qLRules = [],
      } = {},
      restrictOutboundNetworkAccess,
      allowedFqdnList,
      disableLocalAuth,
      endpoints = {},
      restore,
    } = {},
  } = service
  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
    etag,
    kind,
    sku,
    identity: {
      type: iType,
      tenantId,
      principalId,
    },
    ...transformSystemData(systemData),
    provisioningState,
    endpoint,
    internalId,
    capabilities: capabilities.map(({ name: cName, value }) => ({
      id: generateUniqueId({
        name: cName,
        value,
      }),
      name: cName,
      value,
    })),
    isMigrated,
    migrationToken,
    skuChangeInfo: {
      countOfDowngrades,
      countOfUpgradesAfterDowngrades,
      lastChangeDate,
    },
    customSubDomainName,
    networkAcls: {
      defaultAction,
      ipRules: ipRules.map(({ value }) => value),
      virtualNetworkRules,
    },
    encryption: {
      keyVaultProperties: {
        keyName,
        keyVersion,
        keyVaultUri,
        identityClientId,
      },
      keySource: encrytionKeySource,
    },
    userOwnedStorage: userOwnedStorage.map(
      ({ resourceId, identityClientId: uOSIdentityClientId }) => ({
        id: resourceId,
        resourceId,
        identityClientId: uOSIdentityClientId,
      })
    ),
    privateEndpointConnections: privateEndpointConnections.map(
      ({
        id: pId,
        name: pName,
        type: pType,
        etag: pEtag,
        systemData: pSystemData,
        properties: {
          privateEndpoint: { id: pEId } = {},
          privateLinkServiceConnectionState,
          provisioningState: pEProvisioningState,
          groupIds = [],
        } = {},
      }) => ({
        id: pId,
        name: pName,
        type: pType,
        etag: pEtag,
        ...transformSystemData(pSystemData),
        privateEndpointId: pEId,
        privateLinkServiceConnectionState,
        provisioningState: pEProvisioningState,
        groupIds,
      })
    ),
    publicNetworkAccess,
    apiProperties: {
      qnaRuntimeEndpoint,
      qnaAzureSearchEndpointKey,
      qnaAzureSearchEndpointId,
      statisticsEnabled,
      eventHubConnectionString,
      storageAccountConnectionString,
      aadClientId,
      aadTenantId,
      superUser,
      websiteName,
    },
    dateCreated,
    callRateLimit: {
      count: cRLCount,
      renewalPeriod: cRLRenewalPeriod,
      rules: formatThrottlingRules(cRLRules),
    },
    quotaLimit: {
      count: qLCount,
      renewalPeriod: qLRenewalPeriod,
      rules: formatThrottlingRules(qLRules),
    },
    restrictOutboundNetworkAccess,
    allowedFqdnList,
    disableLocalAuth,
    endpoints: endpoints
      ? Object.entries(endpoints).map(([key, value]) => ({
          id: generateUniqueId({key, value}),
          key,
          value,
        }))
      : [],
    restore,
  }
}
