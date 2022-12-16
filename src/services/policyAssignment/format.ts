import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import { isString } from 'lodash'
import { generateUniqueId } from '@cloudgraph/sdk'
import {
  AzurePolicyAssignment,
  AzurePolicyAssignmentParameters,
} from '../../types/generated'
import { RawAzurePolicyAssignment } from './data'

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzurePolicyAssignment
  account: string
  region: string
}): AzurePolicyAssignment => {
  const {
    id,
    type,
    name,
    resourceGroupId,
    identity = {},
    systemData = {},
    displayName,
    policyDefinitionId,
    scope,
    notScopes = [],
    parameters: params = {},
    description,
    enforcementMode,
    nonComplianceMessages = [],
    metadata,
  } = service

  const getParameterValue = (value) => {
    // Set parameter value
    let parameterValue = JSON.stringify(value)
    if (isString(value)) parameterValue = value
    if (isArray(value)) {
      parameterValue = (value as Array<any>)
        .map(i => (isString(i) && i) || JSON.stringify(i))
        .join(',')
    }
    return parameterValue
  }

  const parameters: AzurePolicyAssignmentParameters[] =
    Object.entries(params).map(([k, v]) => {

      return ({
        id: generateUniqueId({
          key: k,
          value: v
        }),
        key: k,
        value: Object.entries(v.value).map(([k2, v2]) => ({
          id: isObject(v) ? generateUniqueId({
            id,
            ...v,
          }) : `${k2}:${v2}`,
          key: k,
          value: getParameterValue(v.value)
        })
        ),
      })
    }
    ) || []

  return {
    id,
    type,
    name,
    subscriptionId,
    region,
    resourceGroupId,
    description,
    displayName,
    enforcementMode,
    identity,
    nonComplianceMessages: nonComplianceMessages.map(item => ({
      id: generateUniqueId({
        ...item,
      }),
      ...item,
    })),
    notScopes,
    parameters,
    policyDefinitionId,
    scope,
    createdBy: systemData?.createdBy || metadata?.createdBy?.toString() || '',
    createdByType: systemData?.createdByType,
    createdAt:
      systemData?.createdAt?.toISOString() ||
      (metadata?.createdAt &&
        new Date(metadata?.createdAt.toString()).toISOString()) ||
      '',
  }
}
