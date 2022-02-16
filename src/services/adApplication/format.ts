import cuid from 'cuid'
import { AzureAdApplication } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureADApplication } from './data'

export default ({
  service,
}: {
  service: RawAzureADApplication
  account: string
  region: string
}): AzureAdApplication => {
  const {
    id,
    api: {
      acceptMappedClaims: apiAcceptMappedClaims,
      knownClientApplications: apiKnownClientApplications = [],
      preAuthorizedApplications: apiPreAuthorizedApplications = [],
    } = {},
    region,
    Tags,
    appId,
    applicationTemplateId,
    appRoles = [],
    createdDateTime,
    description,
    disabledByMicrosoftStatus,
    displayName,
    groupMembershipClaims,
    identifierUris = [],
    isDeviceOnlyAuthSupported,
    isFallbackPublicClient,
    notes,
    oauth2RequirePostResponse,
    publicClient: { redirectUris: publicClientRedirectUris = [] } = {},
    publisherDomain,
    signInAudience,
    spa: { redirectUris: spaApplicationRedirectUris = [] } = {},
    web: {
      homePageUrl: webAppHomePageUrl,
      redirectUris: webAppRedirectUris = [],
    } = {},
  } = service
  return {
    id: id || cuid(),
    region,
    appId,
    applicationTemplateId,
    apiAcceptMappedClaims,
    apiKnownClientApplications,
    apiPreAuthorizedApplications: apiPreAuthorizedApplications.map(
      ({ appId: preAuthAppId }) => preAuthAppId
    ),
    appRoles: appRoles.map(({ id: appRoleId, ...restOfAppRole }) => ({
      id: appRoleId || cuid(),
      ...restOfAppRole,
    })),
    createdDateTime,
    description,
    disabledByMicrosoftStatus,
    displayName,
    groupMembershipClaims,
    identifierUris,
    isDeviceOnlyAuthSupported,
    isFallbackPublicClient,
    notes,
    oauth2RequirePostResponse,
    publicClientRedirectUris,
    publisherDomain,
    signInAudience,
    spaApplicationRedirectUris,
    webAppHomePageUrl,
    webAppRedirectUris,
    tags: formatTagsFromMap(Tags),
  }
}
