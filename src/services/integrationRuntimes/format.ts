import cuid from 'cuid'
import {
  IntegrationRuntimeCustomerVirtualNetwork,
  CustomSetupBase,
  LinkedServiceReference,
  IntegrationRuntimeCustomSetupScriptProperties,
  IntegrationRuntimeDataProxyProperties,
  IntegrationRuntimeEdition,
  PackageStore,
} from '@azure/arm-datafactory'
import { isArray, isEmpty, isObject, isString } from 'lodash'
import {
  AzureIntegrationRuntime,
  AzureIntegrationRuntimeProperties,
  AzureSecretBaseUnion,
  AzureLinkedServiceReferencePatameters,
} from '../../types/generated'
import { RawAzureIntegrationRuntimeResource } from './data'

export interface RawSecureString {
  type?: string
  value?: string
}

export interface RawCredentialReference {
  type?: string
  referenceName?: string
}

export interface RawAzureLinkedIntegrationRuntimeTypeUnion {
  authorizationType?: string
  key?: RawSecureString
  resourceId?: string
  credential?: RawCredentialReference
}

export interface RawAzureSecretBaseUnion {
  type?: string
  value?: string
  store?: LinkedServiceReference
  secretName?: Record<string, unknown>
  secretVersion?: Record<string, unknown>
}

export interface RawAzureCustomSetupBaseUnion extends CustomSetupBase {
  targetName?: Record<string, unknown>
  userName?: Record<string, unknown>
  password?: RawAzureSecretBaseUnion
  variableName?: string
  variableValue?: string
  componentName?: string
  licenseKey?: RawAzureSecretBaseUnion
  version?: string
}

export interface RawIntegrationRuntimeSsisCatalogInfo {
  catalogServerEndpoint?: string
  catalogAdminUserName?: string
  catalogAdminPassword?: RawSecureString
  catalogPricingTier?: string
  dualStandbyPairName?: string
}

export interface RawAzureIntegrationRuntimeSsisProperties {
  catalogInfo?: RawIntegrationRuntimeSsisCatalogInfo
  licenseType?: string
  customSetupScriptProperties?: IntegrationRuntimeCustomSetupScriptProperties
  dataProxyProperties?: IntegrationRuntimeDataProxyProperties
  edition?: IntegrationRuntimeEdition
  expressCustomSetupProperties?: RawAzureCustomSetupBaseUnion[]
  packageStores?: PackageStore[]
  credential?: RawCredentialReference
}

export declare interface RawIntegrationRuntimeDataFlowProperties {
  computeType?: string
  coreCount?: number
  timeToLive?: number
  cleanup?: boolean
}

export declare interface RawIntegrationRuntimeVNetProperties {
  vNetId?: string
  subnet?: string
  publicIPs?: string[]
  subnetId?: string
}

export declare interface RawIntegrationRuntimeComputeProperties {
  location?: string
  nodeSize?: string
  numberOfNodes?: number
  maxParallelExecutionsPerNode?: number
  dataFlowProperties?: RawIntegrationRuntimeDataFlowProperties
  vNetProperties?: RawIntegrationRuntimeVNetProperties
}

export interface RawManagedVirtualNetworkReference {
  id?: string
  type?: string
  referenceName?: string
}

export interface RawAzureIntegrationRuntimeUnion {
  type?: string
  description?: string
  state?: string
  managedVirtualNetwork?: RawManagedVirtualNetworkReference
  computeProperties?: RawIntegrationRuntimeComputeProperties
  ssisProperties?: RawAzureIntegrationRuntimeSsisProperties
  customerVirtualNetwork?: IntegrationRuntimeCustomerVirtualNetwork
  linkedInfo?: RawAzureLinkedIntegrationRuntimeTypeUnion
  referenceName?: string
}

const formatParameters = (
  params: { [propertyName: string]: Record<string, unknown> }
): AzureLinkedServiceReferencePatameters[] => {
  if (isEmpty(params)) {
    return []
  }
  return  Object.entries(params).map(([k, v]) => ({
    id: cuid(),
    key: k,
    value: Object.entries(v.value).map(([k2, v2]) => ({
      id: isObject(v) ? cuid() : `${k2}:${v2}`,
      key: k,
      value:
        (isString(v2) && v2) ||
        (isArray(v2) &&
          (v2 as Array<any>)
            .map(i => (isString(i) && i) || JSON.stringify(i))
            .join(',')) ||
        JSON.stringify(v2),
    })),
  })) || []
}

const formatAzureSecret = (
  secret: RawAzureSecretBaseUnion
): AzureSecretBaseUnion => {
  if (isEmpty(secret)) {
    return {}
  }
  return {
    type: secret?.type,
    value: secret?.value,
    store: {
      type: secret?.store?.type,
      referenceName: secret?.store?.referenceName,
      parameters: formatParameters(secret?.store?.parameters),
    },
    secretName: Object.values(secret?.secretName ?? {}).join(''),
    secretVersion: Object.values(secret?.secretVersion ?? {}).join(''),
  }
}

const formatProperties = (
  runtimeProperties?: RawAzureIntegrationRuntimeUnion
): AzureIntegrationRuntimeProperties => {
  if (isEmpty(runtimeProperties)) {
    return {}
  }

  const {
    type,
    ssisProperties = {},
    customerVirtualNetwork = {},
    managedVirtualNetwork = {},
    computeProperties = {},
    linkedInfo = {},
    ...rest
  } = runtimeProperties

  const {
    expressCustomSetupProperties = [],
    packageStores = [],
    catalogInfo = {},
    credential = {},
    ...restSsisProperties
  } = ssisProperties
  const { catalogAdminPassword = {}, ...restCatalogInfo } = catalogInfo
  const {
    key = {},
    credential: linkedInfoCredential = {},
    ...restLinkedInfo
  } = linkedInfo

  return {
    integrationRuntimeType: type,
    ssisProperties: {
      expressCustomSetupProperties:
        expressCustomSetupProperties?.map(
          ({ targetName, userName, password, licenseKey, ...sp }) => ({
            id: cuid(),
            targetName: Object.values(targetName ?? {}).join(''),
            userName: Object.values(userName ?? {}).join(''),
            password: formatAzureSecret(password),
            licenseKey: formatAzureSecret(licenseKey),
            ...sp,
          })
        ) || [],
      packageStores: packageStores?.map(ps => ({ id: cuid(), ...ps })) || [],
      catalogInfo: {
        catalogAdminPasswordType: catalogAdminPassword?.type,
        catalogAdminPasswordValue: catalogAdminPassword?.value,
        ...restCatalogInfo,
      },
      credentialType: credential?.type,
      credentialReferenceName: credential?.referenceName,
      ...restSsisProperties,
    },
    customerVirtualNetworkSubnetId: customerVirtualNetwork?.subnetId,
    managedVirtualNetwork,
    computeProperties,
    linkedInfo: {
      credentialType: linkedInfoCredential?.type,
      credentialReferenceName: linkedInfoCredential?.referenceName,
      keyType: key?.type,
      keyValue: key?.value,
      ...restLinkedInfo,
    },
    ...rest,
  }
}

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureIntegrationRuntimeResource
  account: string
  region: string
}): AzureIntegrationRuntime => {
  const { id, name, type, resourceGroupId, etag, properties = {} } = service

  return {
    id: id || cuid(),
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    etag,
    ...formatProperties(properties as RawAzureIntegrationRuntimeUnion),
  }
}
