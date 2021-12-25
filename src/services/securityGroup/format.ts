import {
  ApplicationSecurityGroup,
  SecurityRule,
} from '@azure/arm-network/esm/models'
import cuid from 'cuid'
import {
  AzureNetworkSecurityGroup,
  AzureNetworkSecurityGroupApplication,
  AzureNetworkSecurityGroupRule,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureNetworkSecurityGroup } from './data'

const normalizeApplicationSecurityGroups = (
  asgArr: Array<ApplicationSecurityGroup>
): Array<AzureNetworkSecurityGroupApplication> =>
  asgArr.map(({ id: asgId, ...restData }) => ({
    id: asgId || cuid(),
    ...restData,
  }))

const normalizeSecurityRules = (
  sgArr: Array<SecurityRule>
): Array<AzureNetworkSecurityGroupRule> =>
  sgArr.map(
    ({
      id: sgId,
      sourceApplicationSecurityGroups: sASG = [],
      destinationApplicationSecurityGroups: dASG = [],
      ...dataSR
    }) => ({
      id: sgId || cuid(),
      ...dataSR,
      destinationApplicationSecurityGroups:
        normalizeApplicationSecurityGroups(dASG),
      sourceApplicationSecurityGroups: normalizeApplicationSecurityGroups(sASG),
    })
  )

export default ({
  service,
  account: subscriptionId,
  region,
}: {
  service: RawAzureNetworkSecurityGroup
  account: string
  region: string
}): AzureNetworkSecurityGroup => {
  const {
    id,
    name,
    type,
    resourceGuid,
    provisioningState,
    securityRules = [],
    defaultSecurityRules = [],
    etag,
    resourceGroup,
    Tags,
  } = service
  return {
    id: id || cuid(),
    subscriptionId,
    name,
    type,
    region,
    resourceGuid,
    resourceGroup,
    provisioningState,
    securityRules: normalizeSecurityRules(securityRules),
    defaultSecurityRules: normalizeSecurityRules(defaultSecurityRules),
    etag,
    tags: formatTagsFromMap(Tags),
  }
}
