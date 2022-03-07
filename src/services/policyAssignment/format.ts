import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import { isString } from 'lodash'
import cuid from 'cuid'
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

  const parameters: AzurePolicyAssignmentParameters[] =
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
          JSON.stringify(v2), // not sure about this one
      })),
    })) || []

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
      id: cuid(),
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
