import { generateUniqueId } from '@cloudgraph/sdk'
import {
  IntegrationRuntimeCustomerVirtualNetwork,
  CustomSetupBase,
  LinkedServiceReference,
  IntegrationRuntimeCustomSetupScriptProperties,
  IntegrationRuntimeDataProxyProperties,
  IntegrationRuntimeEdition,
  PackageStore,
} from '@azure/arm-datafactory'
import { isEmpty } from 'lodash'
import {
  AzureIntegrationRuntime,
  AzureIntegrationRuntimeProperties,
  AzureCustomSetupBaseUnion,
  AzurePackageStore,
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
  variableName?: string
  variableValue?: string
  componentName?: string
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

const formatProperties = (
  runtimeProperties?: RawAzureIntegrationRuntimeUnion
): AzureIntegrationRuntimeProperties => {
  if (isEmpty(runtimeProperties)) {
    return {}
  }

  const {
    type,
    ssisProperties: {
      expressCustomSetupProperties = [],
      packageStores = [],
      catalogInfo: {
        catalogServerEndpoint,
        catalogPricingTier,
        dualStandbyPairName,
      } = {},
      credential: {
        type: credentialType,
        referenceName: credentialReferenceName,
      } = {},
      licenseType,
      customSetupScriptProperties: { blobContainerUri } = {},
      dataProxyProperties: {
        connectVia: {
          type: connectViaType,
          referenceName: connectViaReferenceName,
        } = {},
        stagingLinkedService: {
          type: stagingLinkedServiceType,
          referenceName: stagingLinkedServiceReferenceName,
        } = {},
        path,
      } = {},
      edition,
    } = {},
    customerVirtualNetwork: { subnetId } = {},
    managedVirtualNetwork: {
      id: mvId,
      type: mvType,
      referenceName: mvReferenceName,
    } = {},
    computeProperties: {
      location,
      nodeSize,
      numberOfNodes,
      maxParallelExecutionsPerNode,
      dataFlowProperties: { computeType, coreCount, timeToLive, cleanup } = {},
      vNetProperties: {
        vNetId,
        subnet,
        publicIPs = [],
        subnetId: vNetPropertiesSubnetId,
      } = {},
    } = {},
    linkedInfo: {
      key: { type: keyType, value: keyValue } = {},
      credential: {
        type: linkedInfoCredentialType,
        referenceName: linkedInfoCredentialReferenceName,
      } = {},
      authorizationType,
      resourceId,
    } = {},
    description,
    state,
    referenceName,
  } = runtimeProperties

  return {
    integrationRuntimeType: type,
    ssisProperties: {
      expressCustomSetupProperties:
        expressCustomSetupProperties?.map(
          ({
            targetName,
            variableName,
            variableValue,
            version,
            type: expressCustomSetupPropertiesType,
            componentName,
          }): AzureCustomSetupBaseUnion => ({
            id: generateUniqueId({
              targetName,
              variableName,
              componentName,
            }),
            targetName: Object.values(targetName ?? {}).join(''),
            variableName,
            variableValue,
            version,
            type: expressCustomSetupPropertiesType,
            componentName,
          })
        ) || [],
      packageStores:
        packageStores?.map(
          ({
            name,
            packageStoreLinkedService: {
              type: packageStoreLinkedServiceType,
              referenceName: packageStoreLinkedServiceReferenceName,
            },
          }): AzurePackageStore => ({
            id: generateUniqueId({
              name,
              packageStoreLinkedServiceType,
              packageStoreLinkedServiceReferenceName,
            }),
            name,
            packageStoreLinkedServiceType,
            packageStoreLinkedServiceReferenceName,
          })
        ) || [],
      catalogInfo: {
        catalogServerEndpoint,
        catalogPricingTier,
        dualStandbyPairName,
      },
      credentialType,
      credentialReferenceName,
      licenseType,
      customSetupScriptProperties: { blobContainerUri },
      dataProxyProperties: {
        connectViaType,
        connectViaReferenceName,
        stagingLinkedServiceType,
        stagingLinkedServiceReferenceName,
        path,
      },
      edition,
    },
    customerVirtualNetworkSubnetId: subnetId,
    managedVirtualNetwork: {
      id: mvId,
      type: mvType,
      referenceName: mvReferenceName,
    },
    computeProperties: {
      location,
      nodeSize,
      numberOfNodes,
      maxParallelExecutionsPerNode,
      dataFlowProperties: { computeType, coreCount, timeToLive, cleanup },
      vNetProperties: {
        vNetId,
        subnet,
        publicIPs,
        subnetId: vNetPropertiesSubnetId,
      },
    },
    linkedInfo: {
      credentialType: linkedInfoCredentialType,
      credentialReferenceName: linkedInfoCredentialReferenceName,
      keyType,
      keyValue,
      authorizationType,
      resourceId,
    },
    description,
    state,
    referenceName,
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
    id,
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    etag,
    ...formatProperties(properties as RawAzureIntegrationRuntimeUnion),
  }
}
