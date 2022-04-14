import cuid from 'cuid'
import {
  AzPowerShellSetup,
  AzureKeyVaultSecretReference,
  CmdkeySetup,
  ComponentSetup,
  CustomSetupBase,
  CustomSetupBaseUnion,
  EnvironmentVariableSetup,
  IntegrationRuntimeComputeProperties,
  IntegrationRuntimeSsisProperties,
  IntegrationRuntimeUnion,
  LinkedIntegrationRuntimeKeyAuthorization,
  LinkedIntegrationRuntimeRbacAuthorization,
  LinkedIntegrationRuntimeTypeUnion,
  SecretBase,
  SecretBaseUnion,
  SecureString,
} from '@azure/arm-datafactory'
import { isArray, isEmpty, isObject, isString } from 'lodash'
import {
  AzureIntegrationRuntime,
  AzureIntegrationRuntimeProperties,
  AzureSecretBaseUnion,
  AzureLinkedServiceReferencePatameters,
  AzureIntegrationRuntimeSsisProperties,
  AzureCustomSetupBaseUnion,
  AzureLinkedIntegrationRuntimeTypeUnion,
  AzureIntegrationRuntimeComputeProperties,
} from '../../types/generated'
import { RawAzureIntegrationRuntimeResource } from './data'
import { isType } from '../../utils'

const formatParameters = (params: {
  [propertyName: string]: Record<string, unknown>
}): AzureLinkedServiceReferencePatameters[] => {
  if (isEmpty(params)) {
    return []
  }
  return (
    Object.entries(params).map(([k, v]) => ({
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
  )
}

const formatAzureSecret = (
  secret: SecretBase | SecureString | AzureKeyVaultSecretReference
): AzureSecretBaseUnion => {
  if (!isEmpty(secret)) {
    return {
      type: secret.type,
      ...(isType<SecretBaseUnion, SecureString>(secret, 'value')
        ? { value: secret.value }
        : {}),
      ...(isType<SecretBaseUnion, AzureKeyVaultSecretReference>(secret, 'store')
        ? {
            store: {
              type: secret.store.type,
              referenceName: secret.store.referenceName,
              parameters: formatParameters(secret.store.parameters),
            },
            secretName: Object.values(secret.secretName ?? {}).join(''),
            secretVersion: Object.values(secret.secretVersion ?? {}).join(''),
          }
        : {}),
    }
  }
  return {}
}

const formatExpressCustomSetupProperties = (
  props:
    | CustomSetupBase[]
    | CmdkeySetup[]
    | EnvironmentVariableSetup[]
    | ComponentSetup[]
    | AzPowerShellSetup[]
): AzureCustomSetupBaseUnion[] => {
  return props.map((item: CustomSetupBaseUnion) => ({
    id: cuid(),
    type: item.type,
    ...(isType<CustomSetupBaseUnion, CmdkeySetup>(item, 'targetName')
      ? {
          targetName: Object.values(item.targetName ?? {}).join(''),
          userName: Object.values(item.userName ?? {}).join(''),
          password: formatAzureSecret(item.password),
        }
      : {}),
    ...(isType<CustomSetupBaseUnion, ComponentSetup>(item, 'licenseKey')
      ? { licenseKey: formatAzureSecret(item.licenseKey) }
      : {}),
  }))
}

const formatSsisProperties = (
  ssisProperties: IntegrationRuntimeSsisProperties
): AzureIntegrationRuntimeSsisProperties => {
  const {
    expressCustomSetupProperties = [],
    packageStores = [],
    catalogInfo: {
      catalogAdminPassword: { type: ctaPType, value: ctaPValue } = {},
      ...restCatalogInfo
    } = {},
    credential: { type: cType, referenceName: cReferenceName } = {},
    licenseType,
    customSetupScriptProperties,
    dataProxyProperties,
    edition,
  } = ssisProperties

  return {
    expressCustomSetupProperties: formatExpressCustomSetupProperties(
      expressCustomSetupProperties
    ),
    packageStores:
      packageStores?.map(
        ({
          name,
          packageStoreLinkedService: { type, referenceName } = {},
        }) => ({
          id: cuid(),
          name,
          packageStoreLinkedService: { type, referenceName },
        })
      ) || [],
    catalogInfo: {
      catalogAdminPasswordType: ctaPType,
      catalogAdminPasswordValue: ctaPValue,
      ...restCatalogInfo,
    },
    credentialType: cType,
    credentialReferenceName: cReferenceName,
    licenseType,
    customSetupScriptProperties,
    dataProxyProperties,
    edition,
  }
}

const formatLinkedInfo = (
  input: LinkedIntegrationRuntimeTypeUnion
): AzureLinkedIntegrationRuntimeTypeUnion => {
  if (!isEmpty(input)) {
    return {
      authorizationType: input.authorizationType,
      ...(isType<
        LinkedIntegrationRuntimeTypeUnion,
        LinkedIntegrationRuntimeKeyAuthorization
      >(input, 'key')
        ? { key: input.key }
        : {}),
      ...(isType<
        LinkedIntegrationRuntimeTypeUnion,
        LinkedIntegrationRuntimeRbacAuthorization
      >(input, 'credential')
        ? { resourceId: input.resourceId, credential: input.credential }
        : {}),
    }
  }
  return {}
}

const formatComputeProperties = (
  props: IntegrationRuntimeComputeProperties
): AzureIntegrationRuntimeComputeProperties => {
  if (!isEmpty(props)) {
    const {
      location,
      nodeSize,
      numberOfNodes,
      maxParallelExecutionsPerNode,
      dataFlowProperties: { computeType, coreCount, timeToLive, cleanup } = {},
      vNetProperties,
    } = props
    return {
      location,
      nodeSize,
      numberOfNodes,
      maxParallelExecutionsPerNode,
      dataFlowProperties: { computeType, coreCount, timeToLive, cleanup },
      vNetProperties,
    }
  }
  return {}
}

const formatProperties = (
  runtimeProperties?: IntegrationRuntimeUnion
): AzureIntegrationRuntimeProperties => {
  if (!isEmpty(runtimeProperties)) {
    const {
      type,
      ssisProperties = {},
      customerVirtualNetwork = {},
      managedVirtualNetwork = {},
      computeProperties = {},
      linkedInfo = {},
    } = runtimeProperties

    return {
      integrationRuntimeType: type,
      ssisProperties: formatSsisProperties(ssisProperties) || {},
      ...(customerVirtualNetwork
        ? { customerVirtualNetworkSubnetId: customerVirtualNetwork?.subnetId }
        : {}),
      managedVirtualNetwork,
      computeProperties: formatComputeProperties(computeProperties),
      linkedInfo: formatLinkedInfo(linkedInfo),
    }
  }
  return {}
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
  const { id, name, type, resourceGroupId, etag, properties } = service

  return {
    id: id || cuid(),
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    etag,
    ...formatProperties(properties),
  }
}
