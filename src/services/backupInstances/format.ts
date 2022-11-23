import { generateUniqueId } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import { BackupInstance } from '../../types'
import {
  AzureBackupInstance,
  AzureBackupInstanceProperties,
} from '../../types/generated'
import { transformSystemData } from '../../utils/format'
import { RawAzureBackupInstanceResource } from './data'

const formatProperties = (
  properties?: BackupInstance
): AzureBackupInstanceProperties => {
  if (isEmpty(properties)) {
    return {}
  }
  const {
    policyInfo = {},
    protectionErrorDetails = {},
    protectionStatus = {},
    currentProtectionState,
    dataSourceInfo = {},
    dataSourceSetInfo = {},
    friendlyName,
    objectType,
    provisioningState,
  } = properties

  return {
    currentProtectionState,
    dataSourceInfo: dataSourceInfo
      ? {
          datasourceType: dataSourceInfo.datasourceType,
          objectType: dataSourceInfo.objectType,
          resourceID: dataSourceInfo.resourceID,
          resourceLocation: dataSourceInfo.resourceLocation,
          resourceName: dataSourceInfo.resourceName,
          resourceType: dataSourceInfo.resourceType,
          resourceUri: dataSourceInfo.resourceUri,
        }
      : {},
    dataSourceSetInfo: dataSourceSetInfo
      ? {
          datasourceType: dataSourceSetInfo.datasourceType,
          objectType: dataSourceSetInfo.objectType,
          resourceID: dataSourceSetInfo.resourceID,
          resourceLocation: dataSourceSetInfo.resourceLocation,
          resourceName: dataSourceSetInfo.resourceName,
          resourceType: dataSourceSetInfo.resourceType,
          resourceUri: dataSourceSetInfo.resourceUri,
        }
      : {},
    friendlyName,
    objectType,
    provisioningState,
    policyInfo: {
      policyId: policyInfo?.policyId,
      policyParameters: {
        dataStoreParametersList:
          policyInfo?.policyParameters?.dataStoreParametersList?.map(p => ({
            id: generateUniqueId({
              policyId: policyInfo?.policyId,
              dataStoreType: p.dataStoreType,
              objectType: p.objectType,
              resourceGroupId: p.resourceGroupId,
            }),
            dataStoreType: p.dataStoreType,
            objectType: p.objectType,
            resourceGroupId: p.resourceGroupId,
          })) || [],
      },
      policyVersion: policyInfo?.policyVersion,
    },
    protectionErrorDetails: {
      code: protectionErrorDetails?.code,
      isRetryable: protectionErrorDetails?.isRetryable,
      isUserError: protectionErrorDetails?.isUserError,
      message: protectionErrorDetails?.message,
      recommendedAction: protectionErrorDetails?.recommendedAction,
      target: protectionErrorDetails?.target,
      innerError: {
        additionalInfo:
          Object.keys(
            protectionErrorDetails?.innerError?.additionalInfo ?? {}
          ).map(key => ({
            id: generateUniqueId({
              key,
              value: protectionErrorDetails?.innerError?.additionalInfo?.[key],
            }),
            key,
            value: protectionErrorDetails?.innerError?.additionalInfo?.[key],
          })) || [],
        code: protectionErrorDetails?.innerError?.code,
      },
      properties:
        Object.keys(protectionErrorDetails?.properties ?? {}).map(key => ({
          id: generateUniqueId({
            key,
            value: protectionErrorDetails?.properties?.[key],
          }),
          key,
          value: protectionErrorDetails?.properties?.[key],
        })) || [],
    },
    protectionStatus: {
      status: protectionStatus?.status,
      errorDetails: {
        code: protectionStatus?.errorDetails?.code,
        isRetryable: protectionStatus?.errorDetails?.isRetryable,
        isUserError: protectionStatus?.errorDetails?.isUserError,
        message: protectionStatus?.errorDetails?.message,
        recommendedAction: protectionStatus?.errorDetails?.recommendedAction,
        target: protectionStatus?.errorDetails?.target,
        innerError: {
          additionalInfo:
            Object.keys(
              protectionStatus?.errorDetails?.innerError?.additionalInfo ?? {}
            ).map(key => ({
              id: generateUniqueId({
                key,
                value:
                  protectionStatus?.errorDetails?.innerError?.additionalInfo?.[
                    key
                  ],
              }),
              key,
              value:
                protectionStatus?.errorDetails?.innerError?.additionalInfo?.[
                  key
                ],
            })) || [],
          code: protectionStatus?.errorDetails?.innerError?.code,
        },
        properties:
          Object.keys(protectionStatus?.errorDetails?.properties ?? {}).map(
            key => ({
              id: generateUniqueId({
                key,
                value: protectionStatus?.errorDetails?.properties?.[key],
              }),
              key,
              value: protectionStatus?.errorDetails?.properties?.[key],
            })
          ) || [],
      },
    },
  }
}

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureBackupInstanceResource
  account: string
}): AzureBackupInstance => {
  const { id, name, type, region, properties, resourceGroupId, systemData } =
    service
  return {
    id,
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    properties: formatProperties(properties),
    ...transformSystemData(systemData),
  }
}
