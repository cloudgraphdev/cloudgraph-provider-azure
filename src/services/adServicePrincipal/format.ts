import { AzureAdServicePrincipal } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureADServicePrincipal } from './data'

export default ({
  service,
}: {
  service: RawAzureADServicePrincipal
  account: string
}): AzureAdServicePrincipal => {
  const {
    id,
    region,
    deletedDateTime,
    accountEnabled,
    alternativeNames,
    appDescription,
    appDisplayName,
    appId,
    applicationTemplateId,
    appOwnerOrganizationId,
    appRoleAssignmentRequired,
    appRoles = [],
    description,
    disabledByMicrosoftStatus,
    displayName,
    homepage,
    loginUrl,
    logoutUrl,
    notes,
    notificationEmailAddresses = [],
    preferredSingleSignOnMode,
    replyUrls = [],
    servicePrincipalNames = [],
    servicePrincipalType,
    signInAudience,
    Tags = {},
    tokenEncryptionKeyId,
    appRoleAssignedTo = [],
    appRoleAssignments = [],
    endpoints = [],
  } = service
  return {
    id,
    region,
    deletedDateTime,
    accountEnabled,
    alternativeNames,
    appDescription,
    appDisplayName,
    appId,
    applicationTemplateId,
    appOwnerOrganizationId,
    appRoleAssignmentRequired,
    appRoles: appRoles.map(({ id: aRId, ...aR }) => ({
      id: aRId,
      ...aR,
    })),
    description,
    disabledByMicrosoftStatus,
    displayName,
    homepage,
    loginUrl,
    logoutUrl,
    notes,
    notificationEmailAddresses,
    preferredSingleSignOnMode,
    replyUrls,
    servicePrincipalNames,
    servicePrincipalType,
    signInAudience,
    tags: formatTagsFromMap(Tags),
    tokenEncryptionKeyId,
    appRoleAssignedTo: appRoleAssignedTo.map(({ id: aRaTId, ...aRaT }) => ({
      id: aRaTId,
      ...aRaT,
    })),
    appRoleAssignments: appRoleAssignments.map(({ id: aRAId, ...aRA }) => ({
      id: aRAId,
      ...aRA,
    })),
    endpoints: endpoints.map(({ id: eId, ...e }) => ({
      id: eId,
      ...e,
    })),
  }
}
