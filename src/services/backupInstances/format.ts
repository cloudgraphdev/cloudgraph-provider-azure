import cuid from 'cuid'
import { isEmpty } from 'lodash'
import {
  AzureBackupInstance,
  AzureBackupInstanceProperties
} from '../../types/generated'
import { transformSystemData } from '../../utils/format'
import { RawAzureBackupInstanceResource } from './data'
import { BackupInstance } from './utils'

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
    ...rest
  } = properties

  return {
    policyInfo: {
      policyId: policyInfo?.policyId,
      policyParameters: {
        dataStoreParametersList:
          policyInfo?.policyParameters?.dataStoreParametersList?.map(p => ({
            id: cuid(),
            ...p,
          })) || [],
      },
      policyVersion: policyInfo?.policyVersion,
    },
    protectionErrorDetails: {
      ...protectionErrorDetails,
      innerError: {
        additionalInfo:
          Object.keys(
            protectionErrorDetails?.innerError?.additionalInfo ?? {}
          ).map(key => ({
            id: cuid(),
            key,
            value: protectionErrorDetails?.innerError?.additionalInfo?.[key],
          })) || [],
        code: protectionErrorDetails?.innerError?.code,
      },
      properties:
        Object.keys(protectionErrorDetails?.properties ?? {}).map(key => ({
          id: cuid(),
          key,
          value: protectionErrorDetails?.properties?.[key],
        })) || [],
    },
    protectionStatus: {
      ...protectionStatus,
      errorDetails: {
        ...protectionStatus?.errorDetails,
        innerError: {
          additionalInfo:
            Object.keys(
              protectionStatus?.errorDetails?.innerError?.additionalInfo ?? {}
            ).map(key => ({
              id: cuid(),
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
              id: cuid(),
              key,
              value: protectionStatus?.errorDetails?.properties?.[key],
            })
          ) || [],
      },
    },
    ...rest,
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
    id: id || cuid(),
    name,
    type,
    region,
    subscriptionId,
    resourceGroupId,
    properties: formatProperties(properties),
    ...transformSystemData(systemData),
  }
}
