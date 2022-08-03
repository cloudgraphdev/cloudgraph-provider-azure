export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  Int64: number;
};

export type AwsServiceBillingInfo = {
  cost?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  formattedCost?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type AwsTotalBillingInfo = {
  cost?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  formattedCost?: Maybe<Scalars['String']>;
};

export type AzureAdApplication = {
  apiAcceptMappedClaims?: Maybe<Scalars['Boolean']>;
  apiKnownClientApplications?: Maybe<Array<Maybe<Scalars['String']>>>;
  apiPreAuthorizedApplications?: Maybe<Array<Maybe<Scalars['String']>>>;
  appId?: Maybe<Scalars['String']>;
  appRoles?: Maybe<Array<Maybe<AzureAdApplicationRole>>>;
  applicationTemplateId?: Maybe<Scalars['String']>;
  authRoleAssignments?: Maybe<Array<Maybe<AzureAuthRoleAssignment>>>;
  cognitiveServicesAccounts?: Maybe<Array<Maybe<AzureCognitiveServicesAccount>>>;
  createdDateTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabledByMicrosoftStatus?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  groupMembershipClaims?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  identifierUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  instancedBy?: Maybe<Array<Maybe<AzureAdServicePrincipal>>>;
  isDeviceOnlyAuthSupported?: Maybe<Scalars['Boolean']>;
  isFallbackPublicClient?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  oauth2RequirePostResponse?: Maybe<Scalars['Boolean']>;
  ownerGroups?: Maybe<Array<Maybe<AzureAdGroup>>>;
  ownerServicePrincipals?: Maybe<Array<Maybe<AzureAdServicePrincipal>>>;
  ownerUsers?: Maybe<Array<Maybe<AzureAdUser>>>;
  publicClientRedirectUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  publisherDomain?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  signInAudience?: Maybe<Scalars['String']>;
  spaApplicationRedirectUris?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  webAppHomePageUrl?: Maybe<Scalars['String']>;
  webAppRedirectUris?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureAdApplicationRole = {
  allowedMemberTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isEnabled?: Maybe<Scalars['Boolean']>;
  origin?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureAdApplicationRoleAssignment = {
  appRoleId?: Maybe<Scalars['String']>;
  createdDateTime?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  principalDisplayName?: Maybe<Scalars['String']>;
  principalId?: Maybe<Scalars['String']>;
  principalType?: Maybe<Scalars['String']>;
  resourceDisplayName?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
};

export type AzureAdGroup = {
  allowExternalSenders?: Maybe<Scalars['Boolean']>;
  appOwnerOf?: Maybe<Array<Maybe<AzureAdApplication>>>;
  appRoleAssignments?: Maybe<Array<Maybe<AzureAdApplicationRoleAssignment>>>;
  authRoleAssignments?: Maybe<Array<Maybe<AzureAuthRoleAssignment>>>;
  classification?: Maybe<Scalars['String']>;
  createdDateTime?: Maybe<Scalars['String']>;
  deletedDateTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  expirationDateTime?: Maybe<Scalars['String']>;
  groupTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  isArchived?: Maybe<Scalars['Boolean']>;
  isAssignableToRole?: Maybe<Scalars['Boolean']>;
  isSubscribedByMail?: Maybe<Scalars['Boolean']>;
  mail?: Maybe<Scalars['String']>;
  mailEnabled?: Maybe<Scalars['Boolean']>;
  mailNickname?: Maybe<Scalars['String']>;
  membershipRule?: Maybe<Scalars['String']>;
  membershipRuleProcessingState?: Maybe<Scalars['String']>;
  onPremisesDomainName?: Maybe<Scalars['String']>;
  onPremisesLastSyncDateTime?: Maybe<Scalars['String']>;
  onPremisesNetBiosName?: Maybe<Scalars['String']>;
  onPremisesSamAccountName?: Maybe<Scalars['String']>;
  onPremisesSecurityIdentifier?: Maybe<Scalars['String']>;
  onPremisesSyncEnabled?: Maybe<Scalars['Boolean']>;
  permissionGrants?: Maybe<Array<Maybe<AzureAdGroupResourceSpecificPermissionGrant>>>;
  preferredDataLocation?: Maybe<Scalars['String']>;
  preferredLanguage?: Maybe<Scalars['String']>;
  proxyAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  renewedDateTime?: Maybe<Scalars['String']>;
  securityEnabled?: Maybe<Scalars['Boolean']>;
  settings?: Maybe<Array<Maybe<AzureAdGroupSetting>>>;
  visibility?: Maybe<Scalars['String']>;
};

export type AzureAdGroupResourceSpecificPermissionGrant = {
  clientAppId?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  permission?: Maybe<Scalars['String']>;
  permissionType?: Maybe<Scalars['String']>;
  resourceAppId?: Maybe<Scalars['String']>;
};

export type AzureAdGroupSetting = {
  deletedDateTime?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  templateId?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<AzureAdSettingValue>>>;
};

export type AzureAdServicePrincipal = {
  accountEnabled?: Maybe<Scalars['Boolean']>;
  alternativeNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  appDescription?: Maybe<Scalars['String']>;
  appDisplayName?: Maybe<Scalars['String']>;
  appId?: Maybe<Scalars['String']>;
  appOwnerOf?: Maybe<Array<Maybe<AzureAdApplication>>>;
  appOwnerOrganizationId?: Maybe<Scalars['String']>;
  appRoleAssignedTo?: Maybe<Array<Maybe<AzureAdApplicationRoleAssignment>>>;
  appRoleAssignmentRequired?: Maybe<Scalars['Boolean']>;
  appRoleAssignments?: Maybe<Array<Maybe<AzureAdApplicationRoleAssignment>>>;
  appRoles?: Maybe<Array<Maybe<AzureAdApplicationRole>>>;
  applicationTemplateId?: Maybe<Scalars['String']>;
  authRoleAssignments?: Maybe<Array<Maybe<AzureAuthRoleAssignment>>>;
  deletedDateTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabledByMicrosoftStatus?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  endpoints?: Maybe<Array<Maybe<AzureAdServicePrincipalEndpoint>>>;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  instanceOf?: Maybe<Array<Maybe<AzureAdApplication>>>;
  loginUrl?: Maybe<Scalars['String']>;
  logoutUrl?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  notificationEmailAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  preferredSingleSignOnMode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  replyUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  servicePrincipalNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  servicePrincipalType?: Maybe<Scalars['String']>;
  signInAudience?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  tokenEncryptionKeyId?: Maybe<Scalars['String']>;
};

export type AzureAdServicePrincipalEndpoint = {
  capability?: Maybe<Scalars['String']>;
  deletedDateTime?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  providerId?: Maybe<Scalars['String']>;
  providerName?: Maybe<Scalars['String']>;
  providerResourceId?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type AzureAdSettingValue = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureAdUser = {
  accountEnabled?: Maybe<Scalars['Boolean']>;
  ageGroup?: Maybe<Scalars['String']>;
  appOwnerOf?: Maybe<Array<Maybe<AzureAdApplication>>>;
  appRoleAssignments?: Maybe<Array<Maybe<AzureAdApplicationRoleAssignment>>>;
  authRoleAssignments?: Maybe<Array<Maybe<AzureAuthRoleAssignment>>>;
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdDateTime?: Maybe<Scalars['String']>;
  creationType?: Maybe<Scalars['String']>;
  deletedDateTime?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  employeeHireDate?: Maybe<Scalars['String']>;
  employeeId?: Maybe<Scalars['String']>;
  employeeType?: Maybe<Scalars['String']>;
  externalUserState?: Maybe<Scalars['String']>;
  externalUserStateChangeDateTime?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isResourceAccount?: Maybe<Scalars['Boolean']>;
  lastPasswordChangeDateTime?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  mailNickname?: Maybe<Scalars['String']>;
  officeLocation?: Maybe<Scalars['String']>;
  onPremisesDistinguishedName?: Maybe<Scalars['String']>;
  onPremisesDomainName?: Maybe<Scalars['String']>;
  onPremisesImmutableId?: Maybe<Scalars['String']>;
  onPremisesLastSyncDateTime?: Maybe<Scalars['String']>;
  onPremisesSyncEnabled?: Maybe<Scalars['Boolean']>;
  onPremisesUserPrincipalName?: Maybe<Scalars['String']>;
  otherMails?: Maybe<Array<Maybe<Scalars['String']>>>;
  passwordPolicies?: Maybe<Scalars['String']>;
  preferredLanguage?: Maybe<Scalars['String']>;
  preferredName?: Maybe<Scalars['String']>;
  proxyAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  responsibilities?: Maybe<Array<Maybe<Scalars['String']>>>;
  state?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  usageLocation?: Maybe<Scalars['String']>;
  userPrincipalName?: Maybe<Scalars['String']>;
  userType?: Maybe<Scalars['String']>;
};

export type AzureActionGroup = AzureResource & {
  emailReceivers?: Maybe<Array<Maybe<AzureActionGroupEmailReceiver>>>;
  enabled?: Maybe<Scalars['Boolean']>;
  eventHubs?: Maybe<Array<Maybe<AzureEventHub>>>;
  functionApps?: Maybe<Array<Maybe<AzureFunctionApp>>>;
  groupShortName?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  roleDefinitions?: Maybe<Array<Maybe<AzureAuthRoleDefinition>>>;
  smsReceivers?: Maybe<Array<Maybe<AzureActionGroupSmsReceiver>>>;
  webhookReceivers?: Maybe<Array<Maybe<AzureActionGroupWebhookReceiver>>>;
};

export type AzureActionGroupEmailReceiver = {
  emailAddress?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  useCommonAlertSchema?: Maybe<Scalars['Boolean']>;
};

export type AzureActionGroupSmsReceiver = {
  countryCode?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureActionGroupWebhookReceiver = {
  id: Scalars['String'];
  identifierUri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  objectId?: Maybe<Scalars['String']>;
  serviceUri?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  useAadAuth?: Maybe<Scalars['Boolean']>;
  useCommonAlertSchema?: Maybe<Scalars['Boolean']>;
};

export type AzureActivityLogAlert = AzureBaseResource & {
  actions?: Maybe<AzureActivityLogAlertActionList>;
  condition?: Maybe<AzureActivityLogAlertAllOfCondition>;
  description?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  subscriptionId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
};

export type AzureActivityLogAlertActionGroup = {
  actionGroupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  webhookProperties?: Maybe<Array<Maybe<AzureKeyValueProperty>>>;
};

export type AzureActivityLogAlertActionList = {
  actionGroups?: Maybe<Array<Maybe<AzureActivityLogAlertActionGroup>>>;
};

export type AzureActivityLogAlertAllOfCondition = {
  allOf?: Maybe<Array<Maybe<AzureActivityLogAlertLeafCondition>>>;
};

export type AzureActivityLogAlertLeafCondition = {
  equals?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type AzureAdIdentitySecurityDefaultsEnforcementPolicy = {
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isEnabled?: Maybe<Scalars['Boolean']>;
  region?: Maybe<Scalars['String']>;
};

export type AzureAksManagedCluster = AzureResource & {
  aadProfile?: Maybe<AzureAksManagedClusterAadProfile>;
  agentPoolProfiles?: Maybe<Array<Maybe<AzureAksManagedClusterAgentPoolProfile>>>;
  apiServerAccessProfile?: Maybe<AzureAksManagedClusterApiServerAccessProfile>;
  autoScalerProfile?: Maybe<AzureAksManagedClusterPropertiesAutoScalerProfile>;
  autoUpgradeChannel?: Maybe<Scalars['String']>;
  azureDefenderEnabled?: Maybe<Scalars['Boolean']>;
  azurePortalFqdn?: Maybe<Scalars['String']>;
  disableLocalAccounts?: Maybe<Scalars['Boolean']>;
  diskEncryptionSetID?: Maybe<Scalars['String']>;
  dnsPrefix?: Maybe<Scalars['String']>;
  enableRbac?: Maybe<Scalars['Boolean']>;
  fqdn?: Maybe<Scalars['String']>;
  fqdnSubdomain?: Maybe<Scalars['String']>;
  httpProxyConfig?: Maybe<AzureAksManagedClusterHttpProxyConfig>;
  identity?: Maybe<AzureAksManagedClusterManagedIdentity>;
  kubernetesVersion?: Maybe<Scalars['String']>;
  maxAgentPools?: Maybe<Scalars['Int']>;
  networkProfile?: Maybe<AzureAksManagedClusterNetworkProfile>;
  nodeResourceGroup?: Maybe<Scalars['String']>;
  podIdentityProfileAllowNetworkPluginKubenet?: Maybe<Scalars['Boolean']>;
  podIdentityProfileEnabled?: Maybe<Scalars['Boolean']>;
  powerStateCode?: Maybe<Scalars['String']>;
  privateFqdn?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  servicePrincipalProfileClientId?: Maybe<Scalars['String']>;
  skuName?: Maybe<Scalars['String']>;
  skuTier?: Maybe<Scalars['String']>;
};

export type AzureAksManagedClusterAadProfile = {
  adminGroupObjectIDs?: Maybe<Array<Maybe<Scalars['String']>>>;
  clientAppID?: Maybe<Scalars['String']>;
  enableAzureRbac?: Maybe<Scalars['Boolean']>;
  managed?: Maybe<Scalars['Boolean']>;
  serverAppID?: Maybe<Scalars['String']>;
  tenantID?: Maybe<Scalars['String']>;
};

export type AzureAksManagedClusterApiServerAccessProfile = {
  authorizedIPRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  disableRunCommand?: Maybe<Scalars['Boolean']>;
  enablePrivateCluster?: Maybe<Scalars['Boolean']>;
  enablePrivateClusterPublicFqdn?: Maybe<Scalars['Boolean']>;
  privateDNSZone?: Maybe<Scalars['String']>;
};

export type AzureAksManagedClusterAgentPoolKubeletConfig = {
  allowedUnsafeSysctls?: Maybe<Array<Maybe<Scalars['String']>>>;
  containerLogMaxFiles?: Maybe<Scalars['Int']>;
  containerLogMaxSizeMB?: Maybe<Scalars['Int']>;
  cpuCfsQuota?: Maybe<Scalars['Boolean']>;
  cpuCfsQuotaPeriod?: Maybe<Scalars['String']>;
  cpuManagerPolicy?: Maybe<Scalars['String']>;
  failSwapOn?: Maybe<Scalars['Boolean']>;
  imageGcHighThreshold?: Maybe<Scalars['Int']>;
  imageGcLowThreshold?: Maybe<Scalars['Int']>;
  podMaxPids?: Maybe<Scalars['Int']>;
  topologyManagerPolicy?: Maybe<Scalars['String']>;
};

export type AzureAksManagedClusterAgentPoolLinuxOsConfig = {
  swapFileSizeMB?: Maybe<Scalars['Int']>;
  transparentHugePageDefrag?: Maybe<Scalars['String']>;
  transparentHugePageEnabled?: Maybe<Scalars['String']>;
};

export type AzureAksManagedClusterAgentPoolProfile = {
  availabilityZones?: Maybe<Array<Maybe<Scalars['String']>>>;
  count?: Maybe<Scalars['Int']>;
  enableAutoScaling?: Maybe<Scalars['Boolean']>;
  enableEncryptionAtHost?: Maybe<Scalars['Boolean']>;
  enableFips?: Maybe<Scalars['Boolean']>;
  enableNodePublicIP?: Maybe<Scalars['Boolean']>;
  enableUltraSSD?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  kubeletConfig?: Maybe<AzureAksManagedClusterAgentPoolKubeletConfig>;
  kubeletDiskType?: Maybe<Scalars['String']>;
  linuxOSConfig?: Maybe<AzureAksManagedClusterAgentPoolLinuxOsConfig>;
  maxCount?: Maybe<Scalars['Int']>;
  maxPods?: Maybe<Scalars['Int']>;
  minCount?: Maybe<Scalars['Int']>;
  mode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nodeImageVersion?: Maybe<Scalars['String']>;
  nodePublicIPPrefixID?: Maybe<Scalars['String']>;
  nodeTaints?: Maybe<Array<Maybe<Scalars['String']>>>;
  orchestratorVersion?: Maybe<Scalars['String']>;
  osDiskSizeGB?: Maybe<Scalars['Int']>;
  osDiskType?: Maybe<Scalars['String']>;
  osSKU?: Maybe<Scalars['String']>;
  osType?: Maybe<Scalars['String']>;
  podSubnetID?: Maybe<Scalars['String']>;
  powerStateCode?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  proximityPlacementGroupID?: Maybe<Scalars['String']>;
  scaleDownMode?: Maybe<Scalars['String']>;
  scaleSetEvictionPolicy?: Maybe<Scalars['String']>;
  scaleSetPriority?: Maybe<Scalars['String']>;
  spotMaxPrice?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  upgradeMaxSurge?: Maybe<Scalars['String']>;
  vmSize?: Maybe<Scalars['String']>;
  vnetSubnetID?: Maybe<Scalars['String']>;
  workloadRuntime?: Maybe<Scalars['String']>;
};

export type AzureAksManagedClusterHttpProxyConfig = {
  httpProxy?: Maybe<Scalars['String']>;
  httpsProxy?: Maybe<Scalars['String']>;
  noProxy?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureAksManagedClusterManagedIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureAksManagedClusterNetworkProfile = {
  dnsServiceIP?: Maybe<Scalars['String']>;
  dockerBridgeCidr?: Maybe<Scalars['String']>;
  ipFamilies?: Maybe<Array<Maybe<Scalars['String']>>>;
  loadBalancerSku?: Maybe<Scalars['String']>;
  networkMode?: Maybe<Scalars['String']>;
  networkPlugin?: Maybe<Scalars['String']>;
  networkPolicy?: Maybe<Scalars['String']>;
  outboundType?: Maybe<Scalars['String']>;
  podCidr?: Maybe<Scalars['String']>;
  podCidrs?: Maybe<Array<Maybe<Scalars['String']>>>;
  serviceCidr?: Maybe<Scalars['String']>;
  serviceCidrs?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureAksManagedClusterPropertiesAutoScalerProfile = {
  balanceSimilarNodeGroups?: Maybe<Scalars['String']>;
  expander?: Maybe<Scalars['String']>;
  maxEmptyBulkDelete?: Maybe<Scalars['String']>;
  maxGracefulTerminationSec?: Maybe<Scalars['String']>;
  maxNodeProvisionTime?: Maybe<Scalars['String']>;
  maxTotalUnreadyPercentage?: Maybe<Scalars['String']>;
  newPodScaleUpDelay?: Maybe<Scalars['String']>;
  okTotalUnreadyCount?: Maybe<Scalars['String']>;
  scaleDownDelayAfterAdd?: Maybe<Scalars['String']>;
  scaleDownDelayAfterDelete?: Maybe<Scalars['String']>;
  scaleDownDelayAfterFailure?: Maybe<Scalars['String']>;
  scaleDownUnneededTime?: Maybe<Scalars['String']>;
  scaleDownUnreadyTime?: Maybe<Scalars['String']>;
  scaleDownUtilizationThreshold?: Maybe<Scalars['String']>;
  scanInterval?: Maybe<Scalars['String']>;
  skipNodesWithLocalStorage?: Maybe<Scalars['String']>;
  skipNodesWithSystemPods?: Maybe<Scalars['String']>;
};

export type AzureAppInsights = AzureResource & {
  appId?: Maybe<Scalars['String']>;
  applicationId?: Maybe<Scalars['String']>;
  applicationType?: Maybe<Scalars['String']>;
  connectionString?: Maybe<Scalars['String']>;
  creationDate?: Maybe<Scalars['DateTime']>;
  etag?: Maybe<Scalars['String']>;
  flowType?: Maybe<Scalars['String']>;
  ingestionMode?: Maybe<Scalars['String']>;
  instrumentationKey?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccessForIngestion?: Maybe<Scalars['String']>;
  publicNetworkAccessForQuery?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  retentionInDays?: Maybe<Scalars['Int']>;
  samplingPercentage?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  tenantId?: Maybe<Scalars['String']>;
};

export type AzureAppServiceEnvironment = AzureResource & {
  clusterSettings?: Maybe<Array<Maybe<AzureAppServiceEnvironmentClusterSettingValue>>>;
  dedicatedHostCount?: Maybe<Scalars['Int']>;
  dnsSuffix?: Maybe<Scalars['String']>;
  frontEndScaleFactor?: Maybe<Scalars['Int']>;
  hasLinuxWorkers?: Maybe<Scalars['Boolean']>;
  internalLoadBalancingMode?: Maybe<Scalars['String']>;
  ipsslAddressCount?: Maybe<Scalars['Int']>;
  maximumNumberOfMachines?: Maybe<Scalars['Int']>;
  multiRoleCount?: Maybe<Scalars['Int']>;
  multiSize?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  status?: Maybe<Scalars['String']>;
  suspended?: Maybe<Scalars['Boolean']>;
  userWhitelistedIpRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  virtualNetwork?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
  virtualNetworkProfile?: Maybe<AzureAppServiceEnvironmentVirtualNetworkProfile>;
  zoneRedundant?: Maybe<Scalars['Boolean']>;
};

export type AzureAppServiceEnvironmentClusterSettingValue = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureAppServiceEnvironmentVirtualNetworkProfile = AzureBaseResource & {
  subnet?: Maybe<Scalars['String']>;
};

export type AzureAppServicePlan = AzureResource & {
  appServiceWebApps?: Maybe<Array<Maybe<AzureAppServiceWebApp>>>;
  elasticScaleEnabled?: Maybe<Scalars['Boolean']>;
  freeOfferExpirationTime?: Maybe<Scalars['String']>;
  geoRegion?: Maybe<Scalars['String']>;
  hyperV?: Maybe<Scalars['Boolean']>;
  isSpot?: Maybe<Scalars['Boolean']>;
  isXenon?: Maybe<Scalars['Boolean']>;
  maximumElasticWorkerCount?: Maybe<Scalars['Int']>;
  maximumNumberOfWorkers?: Maybe<Scalars['Int']>;
  numberOfSites?: Maybe<Scalars['Int']>;
  perSiteScaling?: Maybe<Scalars['Boolean']>;
  provisioningState?: Maybe<Scalars['String']>;
  reserved?: Maybe<Scalars['Boolean']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  skuDescription?: Maybe<AzureAppServicePlanSkuDescription>;
  spotExpirationTime?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subscription?: Maybe<Scalars['String']>;
  targetWorkerCount?: Maybe<Scalars['Int']>;
  targetWorkerSizeId?: Maybe<Scalars['Int']>;
  workerTierName?: Maybe<Scalars['String']>;
  zoneRedundant?: Maybe<Scalars['Boolean']>;
};

export type AzureAppServicePlanSkuCapability = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureAppServicePlanSkuCapacity = {
  default?: Maybe<Scalars['Int']>;
  elasticMaximum?: Maybe<Scalars['Int']>;
  maximum?: Maybe<Scalars['Int']>;
  minimum?: Maybe<Scalars['Int']>;
  scaleType?: Maybe<Scalars['String']>;
};

export type AzureAppServicePlanSkuDescription = {
  capabilities?: Maybe<Array<Maybe<AzureAppServicePlanSkuCapability>>>;
  capacity?: Maybe<Scalars['Int']>;
  family?: Maybe<Scalars['String']>;
  locations?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  skuCapacity?: Maybe<AzureAppServicePlanSkuCapacity>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebApp = AzureResource & {
  appServicePlan?: Maybe<Array<Maybe<AzureAppServicePlan>>>;
  authEnabled?: Maybe<Scalars['Boolean']>;
  availabilityState?: Maybe<Scalars['String']>;
  clientAffinityEnabled?: Maybe<Scalars['Boolean']>;
  clientCertEnabled?: Maybe<Scalars['Boolean']>;
  clientCertExclusionPaths?: Maybe<Scalars['String']>;
  clientCertMode?: Maybe<Scalars['String']>;
  containerSize?: Maybe<Scalars['Int']>;
  customDomainVerificationId?: Maybe<Scalars['String']>;
  dailyMemoryTimeQuota?: Maybe<Scalars['Int']>;
  defaultHostName?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  enabledHostNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  hostNameSslStates?: Maybe<Array<Maybe<AzureAppServiceWebAppHostNameSslState>>>;
  hostNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  hostNamesDisabled?: Maybe<Scalars['Boolean']>;
  hostingEnvironmentProfile?: Maybe<AzureOptionalResource>;
  httpsOnly?: Maybe<Scalars['Boolean']>;
  hyperV?: Maybe<Scalars['Boolean']>;
  inProgressOperationId?: Maybe<Scalars['String']>;
  isDefaultContainer?: Maybe<Scalars['Boolean']>;
  isXenon?: Maybe<Scalars['Boolean']>;
  keyVaultReferenceIdentity?: Maybe<Scalars['String']>;
  lastModifiedTimeUtc?: Maybe<Scalars['String']>;
  maxNumberOfWorkers?: Maybe<Scalars['Int']>;
  outboundIpAddresses?: Maybe<Scalars['String']>;
  possibleOutboundIpAddresses?: Maybe<Scalars['String']>;
  redundancyMode?: Maybe<Scalars['String']>;
  repositorySiteName?: Maybe<Scalars['String']>;
  reserved?: Maybe<Scalars['Boolean']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  scmSiteAlsoStopped?: Maybe<Scalars['Boolean']>;
  serverFarmId?: Maybe<Scalars['String']>;
  siteConfig?: Maybe<AzureAppServiceWebAppSiteConfig>;
  state?: Maybe<Scalars['String']>;
  storageAccountRequired?: Maybe<Scalars['Boolean']>;
  storageAccounts?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  suspendedTill?: Maybe<Scalars['String']>;
  targetSwapSlot?: Maybe<Scalars['String']>;
  trafficManagerHostNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  usageState?: Maybe<Scalars['String']>;
  virtualNetworkSubnetId?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppHostNameSslState = {
  hostType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  ipBasedSslResult?: Maybe<Scalars['String']>;
  ipBasedSslState?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sslState?: Maybe<Scalars['String']>;
  thumbprint?: Maybe<Scalars['String']>;
  toUpdate?: Maybe<Scalars['Boolean']>;
  toUpdateIpBasedSsl?: Maybe<Scalars['Boolean']>;
  virtualIP?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfig = {
  acrUseManagedIdentityCreds?: Maybe<Scalars['Boolean']>;
  acrUserManagedIdentityID?: Maybe<Scalars['String']>;
  alwaysOn?: Maybe<Scalars['Boolean']>;
  apiDefinitionInfoUrl?: Maybe<Scalars['String']>;
  apiManagementConfigId?: Maybe<Scalars['String']>;
  appCommandLine?: Maybe<Scalars['String']>;
  appSettings?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigAppSettings>>>;
  autoHealEnabled?: Maybe<Scalars['Boolean']>;
  autoHealRules?: Maybe<AzureAppServiceWebAppSiteConfigAutoHealRules>;
  autoSwapSlotName?: Maybe<Scalars['String']>;
  azureStorageAccounts?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigAzureStorageInfoValue>>>;
  connectionStrings?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigDatabaseConnectionInfo>>>;
  cors?: Maybe<AzureAppServiceWebAppSiteConfigCorsSettings>;
  defaultDocuments?: Maybe<Array<Maybe<Scalars['String']>>>;
  detailedErrorLoggingEnabled?: Maybe<Scalars['Boolean']>;
  documentRoot?: Maybe<Scalars['String']>;
  experiments?: Maybe<AzureAppServiceWebAppSiteConfigExperiments>;
  ftpsState?: Maybe<Scalars['String']>;
  functionAppScaleLimit?: Maybe<Scalars['Int']>;
  functionsRuntimeScaleMonitoringEnabled?: Maybe<Scalars['Boolean']>;
  handlerMappings?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigHandlerMapping>>>;
  healthCheckPath?: Maybe<Scalars['String']>;
  http20Enabled?: Maybe<Scalars['Boolean']>;
  http20ProxyFlag?: Maybe<Scalars['String']>;
  httpLoggingEnabled?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  ipSecurityRestrictions?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigIpSecurityRestriction>>>;
  isPushEnabled?: Maybe<Scalars['Boolean']>;
  javaContainer?: Maybe<Scalars['String']>;
  javaContainerVersion?: Maybe<Scalars['String']>;
  javaVersion?: Maybe<Scalars['String']>;
  keyVaultReferenceIdentity?: Maybe<Scalars['String']>;
  limits?: Maybe<AzureAppServiceWebAppSiteConfigLimits>;
  linuxFxVersion?: Maybe<Scalars['String']>;
  loadBalancing?: Maybe<Scalars['String']>;
  localMySqlEnabled?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  logsDirectorySizeLimit?: Maybe<Scalars['Int']>;
  managedPipelineMode?: Maybe<Scalars['String']>;
  managedServiceIdentityId?: Maybe<Scalars['Int']>;
  minTlsVersion?: Maybe<Scalars['String']>;
  minimumElasticInstanceCount?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  netFrameworkVersion?: Maybe<Scalars['String']>;
  nodeVersion?: Maybe<Scalars['String']>;
  numberOfWorkers?: Maybe<Scalars['Int']>;
  phpVersion?: Maybe<Scalars['String']>;
  powerShellVersion?: Maybe<Scalars['String']>;
  preWarmedInstanceCount?: Maybe<Scalars['Int']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  publishingUsername?: Maybe<Scalars['String']>;
  pythonVersion?: Maybe<Scalars['String']>;
  remoteDebuggingEnabled?: Maybe<Scalars['Boolean']>;
  remoteDebuggingVersion?: Maybe<Scalars['String']>;
  requestTracingEnabled?: Maybe<Scalars['Boolean']>;
  requestTracingExpirationTime?: Maybe<Scalars['String']>;
  scmIpSecurityRestrictions?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigIpSecurityRestriction>>>;
  scmIpSecurityRestrictionsUseMain?: Maybe<Scalars['Boolean']>;
  scmMinTlsVersion?: Maybe<Scalars['String']>;
  scmType?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  tracingOptions?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  use32BitWorkerProcess?: Maybe<Scalars['Boolean']>;
  virtualApplications?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigVirtualApplication>>>;
  vnetName?: Maybe<Scalars['String']>;
  vnetPrivatePortsCount?: Maybe<Scalars['Int']>;
  vnetRouteAllEnabled?: Maybe<Scalars['Boolean']>;
  webSocketsEnabled?: Maybe<Scalars['Boolean']>;
  websiteTimeZone?: Maybe<Scalars['String']>;
  windowsFxVersion?: Maybe<Scalars['String']>;
  xManagedServiceIdentityId?: Maybe<Scalars['Int']>;
};

export type AzureAppServiceWebAppSiteConfigARequestsBasedTrigger = {
  count?: Maybe<Scalars['Int']>;
  timeInterval?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigAppSettings = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigAutoHealActions = {
  actionType?: Maybe<Scalars['String']>;
  customAction?: Maybe<AzureAppServiceWebAppSiteConfigAutoHealCustomAction>;
  minProcessExecutionTime?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigAutoHealCustomAction = {
  exe?: Maybe<Scalars['String']>;
  parameters?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigAutoHealRules = {
  actions?: Maybe<AzureAppServiceWebAppSiteConfigAutoHealActions>;
  triggers?: Maybe<AzureAppServiceWebAppSiteConfigAutoHealTriggers>;
};

export type AzureAppServiceWebAppSiteConfigAutoHealTriggers = {
  privateBytesInKB?: Maybe<Scalars['Int64']>;
  requests?: Maybe<AzureAppServiceWebAppSiteConfigARequestsBasedTrigger>;
  slowRequests?: Maybe<AzureAppServiceWebAppSiteConfigSlowRequestsBasedTrigger>;
  slowRequestsWithPath?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigSlowRequestsBasedTriggers>>>;
  statusCodes?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigStatusCodesBasedTrigger>>>;
  statusCodesRange?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigStatusCodesRangeBasedTrigger>>>;
};

export type AzureAppServiceWebAppSiteConfigAzureStorageInfoValue = {
  accessKey?: Maybe<Scalars['String']>;
  accountName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  mountPath?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shareName?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigCorsSettings = {
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>;
  supportCredentials?: Maybe<Scalars['Boolean']>;
};

export type AzureAppServiceWebAppSiteConfigDatabaseConnectionInfo = {
  connectionString?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigExperiments = {
  rampUpRules?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigRampUpRule>>>;
};

export type AzureAppServiceWebAppSiteConfigHandlerMapping = {
  arguments?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
  scriptProcessor?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigHeaders = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureAppServiceWebAppSiteConfigIpSecurityRestriction = {
  action?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  headers?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigHeaders>>>;
  id: Scalars['String'];
  ipAddress?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  subnetMask?: Maybe<Scalars['String']>;
  subnetTrafficTag?: Maybe<Scalars['Int']>;
  tag?: Maybe<Scalars['String']>;
  vnetSubnetResourceId?: Maybe<Scalars['String']>;
  vnetTrafficTag?: Maybe<Scalars['Int']>;
};

export type AzureAppServiceWebAppSiteConfigLimits = {
  maxDiskSizeInMb?: Maybe<Scalars['Int']>;
  maxMemoryInMb?: Maybe<Scalars['Int']>;
  maxPercentageCpu?: Maybe<Scalars['Int']>;
};

export type AzureAppServiceWebAppSiteConfigRampUpRule = {
  actionHostName?: Maybe<Scalars['String']>;
  changeDecisionCallbackUrl?: Maybe<Scalars['String']>;
  changeIntervalInMinutes?: Maybe<Scalars['Int']>;
  changeStep?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  maxReroutePercentage?: Maybe<Scalars['Int']>;
  minReroutePercentage?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  reroutePercentage?: Maybe<Scalars['Int']>;
};

export type AzureAppServiceWebAppSiteConfigSlowRequestsBasedTrigger = {
  count?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  timeInterval?: Maybe<Scalars['String']>;
  timeTaken?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigSlowRequestsBasedTriggers = {
  count?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  timeInterval?: Maybe<Scalars['String']>;
  timeTaken?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigStatusCodesBasedTrigger = {
  count?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  subStatus?: Maybe<Scalars['Int']>;
  timeInterval?: Maybe<Scalars['String']>;
  win32Status?: Maybe<Scalars['Int']>;
};

export type AzureAppServiceWebAppSiteConfigStatusCodesRangeBasedTrigger = {
  count?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  statusCodes?: Maybe<Scalars['String']>;
  timeInterval?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigVirtualApplication = {
  id: Scalars['String'];
  physicalPath?: Maybe<Scalars['String']>;
  preloadEnabled?: Maybe<Scalars['Boolean']>;
  virtualDirectories?: Maybe<Array<Maybe<AzureAppServiceWebAppSiteConfigVirtualDirectory>>>;
  virtualPath?: Maybe<Scalars['String']>;
};

export type AzureAppServiceWebAppSiteConfigVirtualDirectory = {
  id: Scalars['String'];
  physicalPath?: Maybe<Scalars['String']>;
  virtualPath?: Maybe<Scalars['String']>;
};

export type AzureArcConnectedCluster = AzureResource & {
  agentPublicKeyCertificate?: Maybe<Scalars['String']>;
  agentVersion?: Maybe<Scalars['String']>;
  connectivityStatus?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  distribution?: Maybe<Scalars['String']>;
  identity?: Maybe<AzureArcConnectedClusterIdentity>;
  infrastructure?: Maybe<Scalars['String']>;
  kubernetesVersion?: Maybe<Scalars['String']>;
  lastConnectivityTime?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  managedIdentityCertificateExpirationTime?: Maybe<Scalars['String']>;
  offering?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  totalCoreCount?: Maybe<Scalars['Int']>;
  totalNodeCount?: Maybe<Scalars['Int']>;
};

export type AzureArcConnectedClusterIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureArmResourceSku = {
  capacity?: Maybe<Scalars['Int']>;
  family?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureAuthRoleAssignment = AzureBaseResource & {
  applications?: Maybe<Array<Maybe<AzureAdApplication>>>;
  canDelegate?: Maybe<Scalars['Boolean']>;
  groups?: Maybe<Array<Maybe<AzureAdGroup>>>;
  principalId?: Maybe<Scalars['String']>;
  principalType?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  roleDefinition?: Maybe<Array<Maybe<AzureAuthRoleDefinition>>>;
  roleDefinitionId?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  servicePrincipals?: Maybe<Array<Maybe<AzureAdServicePrincipal>>>;
  subscriptionId?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<AzureAdUser>>>;
};

export type AzureAuthRoleDefinition = AzureBaseResource & {
  actionGroups?: Maybe<Array<Maybe<AzureActionGroup>>>;
  assignableScopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  authRoleAssignments?: Maybe<Array<Maybe<AzureAuthRoleAssignment>>>;
  description?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<AzureAuthRoleDefinitionPermission>>>;
  region?: Maybe<Scalars['String']>;
  roleName?: Maybe<Scalars['String']>;
  roleType?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureAuthRoleDefinitionPermission = {
  actions?: Maybe<Array<Maybe<Scalars['String']>>>;
  dataActions?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  notActions?: Maybe<Array<Maybe<Scalars['String']>>>;
  notDataActions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureAutoProvisioningSetting = AzureBaseResource & {
  autoProvision?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureBackupInstance = AzureBaseResource & {
  backupVault?: Maybe<Array<Maybe<AzureBackupVault>>>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  properties?: Maybe<AzureBackupInstanceProperties>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureBackupInstanceDatasource = {
  datasourceType?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  resourceID?: Maybe<Scalars['String']>;
  resourceLocation?: Maybe<Scalars['String']>;
  resourceName?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  resourceUri?: Maybe<Scalars['String']>;
};

export type AzureBackupInstanceDatasourceSet = {
  datasourceType?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  resourceID?: Maybe<Scalars['String']>;
  resourceLocation?: Maybe<Scalars['String']>;
  resourceName?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  resourceUri?: Maybe<Scalars['String']>;
};

export type AzureBackupInstanceInnerError = {
  additionalInfo?: Maybe<Array<Maybe<AzureBackupInstanceKeyValue>>>;
  code?: Maybe<Scalars['String']>;
};

export type AzureBackupInstanceKeyValue = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureBackupInstanceOperationalStoreParameters = {
  dataStoreType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  objectType?: Maybe<Scalars['String']>;
  resourceGroupId?: Maybe<Scalars['String']>;
};

export type AzureBackupInstancePolicyInfo = {
  policyId?: Maybe<Scalars['String']>;
  policyParameters?: Maybe<AzureBackupInstancePolicyParameters>;
  policyVersion?: Maybe<Scalars['String']>;
};

export type AzureBackupInstancePolicyParameters = {
  dataStoreParametersList?: Maybe<Array<Maybe<AzureBackupInstanceOperationalStoreParameters>>>;
};

export type AzureBackupInstanceProperties = {
  currentProtectionState?: Maybe<Scalars['String']>;
  dataSourceInfo?: Maybe<AzureBackupInstanceDatasource>;
  dataSourceSetInfo?: Maybe<AzureBackupInstanceDatasourceSet>;
  friendlyName?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  policyInfo?: Maybe<AzureBackupInstancePolicyInfo>;
  protectionErrorDetails?: Maybe<AzureBackupInstanceUserFacingError>;
  protectionStatus?: Maybe<AzureBackupInstanceProtectionStatusDetails>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureBackupInstanceProtectionStatusDetails = {
  errorDetails?: Maybe<AzureBackupInstanceUserFacingError>;
  status?: Maybe<Scalars['String']>;
};

export type AzureBackupInstanceUserFacingError = {
  code?: Maybe<Scalars['String']>;
  innerError?: Maybe<AzureBackupInstanceInnerError>;
  isRetryable?: Maybe<Scalars['Boolean']>;
  isUserError?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<Maybe<AzureBackupInstanceKeyValue>>>;
  recommendedAction?: Maybe<Array<Maybe<Scalars['String']>>>;
  target?: Maybe<Scalars['String']>;
};

export type AzureBackupPolicy = AzureBaseResource & {
  backupVault?: Maybe<Array<Maybe<AzureBackupVault>>>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  properties?: Maybe<AzureBackupPolicyProperties>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureBackupPolicyAbsoluteOption = {
  duration?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type AzureBackupPolicyBackupParams = {
  backupType?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type AzureBackupPolicyBackupRule = {
  backupParameters?: Maybe<AzureBackupPolicyBackupParams>;
  dataStore?: Maybe<AzureBackupPolicyDataStoreInfoBase>;
  id: Scalars['String'];
  isDefault?: Maybe<Scalars['Boolean']>;
  lifecycles?: Maybe<Array<Maybe<AzureBackupPolicySourceLifeCycle>>>;
  name?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  trigger?: Maybe<AzureBackupPolicyTriggerContext>;
};

export type AzureBackupPolicyBackupSchedule = {
  repeatingTimeIntervals?: Maybe<Array<Maybe<Scalars['String']>>>;
  timeZone?: Maybe<Scalars['String']>;
};

export type AzureBackupPolicyDataStoreInfoBase = {
  dataStoreType?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type AzureBackupPolicyDay = {
  date?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  isLast?: Maybe<Scalars['Boolean']>;
};

export type AzureBackupPolicyProperties = {
  datasourceTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  objectType?: Maybe<Scalars['String']>;
  policyRules?: Maybe<Array<Maybe<AzureBackupPolicyBackupRule>>>;
};

export type AzureBackupPolicyRetentionTag = {
  eTag?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  tagName?: Maybe<Scalars['String']>;
};

export type AzureBackupPolicyScheduleBasedBackupCriteria = {
  absoluteCriteria?: Maybe<Array<Maybe<Scalars['String']>>>;
  daysOfMonth?: Maybe<Array<Maybe<AzureBackupPolicyDay>>>;
  daysOfTheWeek?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  monthsOfYear?: Maybe<Array<Maybe<Scalars['String']>>>;
  objectType?: Maybe<Scalars['String']>;
  scheduleTimes?: Maybe<Array<Maybe<Scalars['String']>>>;
  weeksOfTheMonth?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureBackupPolicySourceLifeCycle = {
  deleteAfter?: Maybe<AzureBackupPolicyAbsoluteOption>;
  id: Scalars['String'];
  sourceDataStore?: Maybe<AzureBackupPolicyDataStoreInfoBase>;
  targetDataStoreCopySettings?: Maybe<Array<Maybe<AzureBackupPolicyTargetCopySetting>>>;
};

export type AzureBackupPolicyTaggingCriteria = {
  criteria?: Maybe<Array<Maybe<AzureBackupPolicyScheduleBasedBackupCriteria>>>;
  id: Scalars['String'];
  isDefault?: Maybe<Scalars['Boolean']>;
  tagInfo?: Maybe<AzureBackupPolicyRetentionTag>;
  taggingPriority?: Maybe<Scalars['Int']>;
};

export type AzureBackupPolicyTargetCopySetting = {
  copyAfter?: Maybe<AzureBackupPolicyAbsoluteOption>;
  dataStore?: Maybe<AzureBackupPolicyDataStoreInfoBase>;
  id: Scalars['String'];
};

export type AzureBackupPolicyTriggerContext = {
  objectType?: Maybe<Scalars['String']>;
  schedule?: Maybe<AzureBackupPolicyBackupSchedule>;
  taggingCriteria?: Maybe<Array<Maybe<AzureBackupPolicyTaggingCriteria>>>;
};

export type AzureBackupVault = AzureResource & {
  backupInstances?: Maybe<Array<Maybe<AzureBackupInstance>>>;
  backupPolicies?: Maybe<Array<Maybe<AzureBackupPolicy>>>;
  eTag?: Maybe<Scalars['String']>;
  identity?: Maybe<AzureBackupVaultIdentity>;
  properties?: Maybe<AzureBackupVaultProperties>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureBackupVaultIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureBackupVaultProperties = {
  isVaultProtectedByResourceGuard?: Maybe<Scalars['Boolean']>;
  provisioningState?: Maybe<Scalars['String']>;
  storageSettings?: Maybe<Array<Maybe<AzureBackupVaultStorageSettings>>>;
};

export type AzureBackupVaultStorageSettings = {
  datastoreType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type AzureBaseResource = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureBilling = AzureBaseResource & {
  last30Days?: Maybe<Array<Maybe<AwsServiceBillingInfo>>>;
  last30DaysDailyAverage?: Maybe<Array<Maybe<AwsServiceBillingInfo>>>;
  monthToDate?: Maybe<Array<Maybe<AwsServiceBillingInfo>>>;
  monthToDateDailyAverage?: Maybe<Array<Maybe<AwsServiceBillingInfo>>>;
  region?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  totalCostLast30Days?: Maybe<AwsTotalBillingInfo>;
  totalCostMonthToDate?: Maybe<AwsTotalBillingInfo>;
};

export type AzureCdnCertificateSourceParameters = {
  certificateType?: Maybe<Scalars['String']>;
  deleteRule?: Maybe<Scalars['String']>;
  odataType?: Maybe<Scalars['String']>;
  resourceGroupName?: Maybe<Scalars['String']>;
  secretName?: Maybe<Scalars['String']>;
  secretVersion?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  updateRule?: Maybe<Scalars['String']>;
  vaultName?: Maybe<Scalars['String']>;
};

export type AzureCdnCustomDomain = AzureBaseResource & {
  cdnEndpoints?: Maybe<Array<Maybe<AzureCdnEndpoint>>>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  customHttpsParameters?: Maybe<AzureCdnCustomDomainHttpsParametersUnion>;
  customHttpsProvisioningState?: Maybe<Scalars['String']>;
  customHttpsProvisioningSubstate?: Maybe<Scalars['String']>;
  hostName?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  resourceState?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  validationData?: Maybe<Scalars['String']>;
};

export type AzureCdnCustomDomainHttpsParametersUnion = {
  certificateSource?: Maybe<Scalars['String']>;
  certificateSourceParameters?: Maybe<AzureCdnCertificateSourceParameters>;
  minimumTlsVersion?: Maybe<Scalars['String']>;
  protocolType?: Maybe<Scalars['String']>;
};

export type AzureCdnDeliveryRule = {
  actions?: Maybe<Array<Maybe<AzureCdnDeliveryRuleActionAutoGeneratedUnion>>>;
  conditions?: Maybe<Array<Maybe<AzureCdnDeliveryRuleConditionUnion>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
};

export type AzureCdnDeliveryRuleActionAutoGeneratedUnion = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  parameters?: Maybe<AzureCdnDeliveryRuleActionParameter>;
};

export type AzureCdnDeliveryRuleActionParameter = {
  algorithm?: Maybe<Scalars['String']>;
  cacheBehavior?: Maybe<Scalars['String']>;
  cacheDuration?: Maybe<Scalars['String']>;
  cacheType?: Maybe<Scalars['String']>;
  customFragment?: Maybe<Scalars['String']>;
  customHostname?: Maybe<Scalars['String']>;
  customPath?: Maybe<Scalars['String']>;
  customQueryString?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  destinationProtocol?: Maybe<Scalars['String']>;
  headerAction?: Maybe<Scalars['String']>;
  headerName?: Maybe<Scalars['String']>;
  odataType?: Maybe<Scalars['String']>;
  originGroup?: Maybe<AzureCdnResourceReference>;
  parameterNameOverride?: Maybe<Array<Maybe<AzureCdnSigningParamIdentifier>>>;
  preserveUnmatchedPath?: Maybe<Scalars['Boolean']>;
  queryParameters?: Maybe<Scalars['String']>;
  queryStringBehavior?: Maybe<Scalars['String']>;
  redirectType?: Maybe<Scalars['String']>;
  sourcePattern?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureCdnDeliveryRuleConditionParameter = {
  matchValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  negateCondition?: Maybe<Scalars['Boolean']>;
  odataType?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  selector?: Maybe<Scalars['String']>;
  transforms?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureCdnDeliveryRuleConditionUnion = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  parameters?: Maybe<AzureCdnDeliveryRuleConditionParameter>;
};

export type AzureCdnEndpoint = AzureResource & {
  cdnCustomDomains?: Maybe<Array<Maybe<AzureCdnCustomDomain>>>;
  cdnOriginGroups?: Maybe<Array<Maybe<AzureCdnOriginGroup>>>;
  cdnOrigins?: Maybe<Array<Maybe<AzureCdnOrigin>>>;
  cdnProfiles?: Maybe<Array<Maybe<AzureCdnProfile>>>;
  contentTypesToCompress?: Maybe<Array<Maybe<Scalars['String']>>>;
  defaultOriginGroupId?: Maybe<Scalars['String']>;
  deliveryPolicy?: Maybe<AzureCdnEndpointPropertiesUpdateParametersDeliveryPolicy>;
  geoFilters?: Maybe<Array<Maybe<AzureCdnGeoFilter>>>;
  hostName?: Maybe<Scalars['String']>;
  isCompressionEnabled?: Maybe<Scalars['Boolean']>;
  isHttpAllowed?: Maybe<Scalars['Boolean']>;
  isHttpsAllowed?: Maybe<Scalars['Boolean']>;
  optimizationType?: Maybe<Scalars['String']>;
  originHostHeader?: Maybe<Scalars['String']>;
  originPath?: Maybe<Scalars['String']>;
  probePath?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  queryStringCachingBehavior?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceState?: Maybe<Scalars['String']>;
  urlSigningKeys?: Maybe<Array<Maybe<AzureCdnUrlSigningKey>>>;
  webApplicationFirewallPolicyLinkId?: Maybe<Scalars['String']>;
};

export type AzureCdnEndpointPropertiesUpdateParametersDeliveryPolicy = {
  description?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<Maybe<AzureCdnDeliveryRule>>>;
};

export type AzureCdnGeoFilter = {
  action?: Maybe<Scalars['String']>;
  countryCodes?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  relativePath?: Maybe<Scalars['String']>;
};

export type AzureCdnHealthProbeParameters = {
  probeIntervalInSeconds?: Maybe<Scalars['Int']>;
  probePath?: Maybe<Scalars['String']>;
  probeProtocol?: Maybe<Scalars['String']>;
  probeRequestType?: Maybe<Scalars['String']>;
};

export type AzureCdnHttpErrorRangeParameters = {
  begin?: Maybe<Scalars['Int']>;
  end?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
};

export type AzureCdnKeyVaultSigningKeyParameters = {
  odataType?: Maybe<Scalars['String']>;
  resourceGroupName?: Maybe<Scalars['String']>;
  secretName?: Maybe<Scalars['String']>;
  secretVersion?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  vaultName?: Maybe<Scalars['String']>;
};

export type AzureCdnOrigin = AzureBaseResource & {
  cdnEndpoints?: Maybe<Array<Maybe<AzureCdnEndpoint>>>;
  cdnOriginGroups?: Maybe<Array<Maybe<AzureCdnOriginGroup>>>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  hostName?: Maybe<Scalars['String']>;
  httpPort?: Maybe<Scalars['Int']>;
  httpsPort?: Maybe<Scalars['Int']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  originHostHeader?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  privateEndpointStatus?: Maybe<Scalars['String']>;
  privateLinkAlias?: Maybe<Scalars['String']>;
  privateLinkApprovalMessage?: Maybe<Scalars['String']>;
  privateLinkLocation?: Maybe<Scalars['String']>;
  privateLinkResourceId?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  resourceState?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type AzureCdnOriginGroup = AzureBaseResource & {
  cdnEndpoints?: Maybe<Array<Maybe<AzureCdnEndpoint>>>;
  cdnOrigins?: Maybe<Array<Maybe<AzureCdnOrigin>>>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  healthProbeSettings?: Maybe<AzureCdnHealthProbeParameters>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  resourceState?: Maybe<Scalars['String']>;
  responseBasedOriginErrorDetectionSettings?: Maybe<AzureCdnResponseBasedOriginErrorDetectionParameters>;
  subscriptionId?: Maybe<Scalars['String']>;
  trafficRestorationTimeToHealedOrNewEndpointsInMinutes?: Maybe<Scalars['Int']>;
};

export type AzureCdnProfile = AzureResource & {
  cdnEndpoints?: Maybe<Array<Maybe<AzureCdnEndpoint>>>;
  frontdoorId?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceState?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
};

export type AzureCdnResourceReference = {
  id: Scalars['String'];
};

export type AzureCdnResponseBasedOriginErrorDetectionParameters = {
  httpErrorRanges?: Maybe<Array<Maybe<AzureCdnHttpErrorRangeParameters>>>;
  responseBasedDetectedErrorTypes?: Maybe<Scalars['String']>;
  responseBasedFailoverThresholdPercentage?: Maybe<Scalars['Int']>;
};

export type AzureCdnSigningParamIdentifier = {
  id: Scalars['String'];
  paramIndicator?: Maybe<Scalars['String']>;
  paramName?: Maybe<Scalars['String']>;
};

export type AzureCdnUrlSigningKey = {
  id: Scalars['String'];
  keySourceParameters?: Maybe<AzureCdnKeyVaultSigningKeyParameters>;
};

export type AzureCognitiveServicesAccount = AzureResource & {
  allowedFqdnList?: Maybe<Array<Maybe<Scalars['String']>>>;
  apiProperties?: Maybe<AzureCognitiveServicesAccountApiProperties>;
  application?: Maybe<Array<Maybe<AzureAdApplication>>>;
  callRateLimit?: Maybe<AzureCognitiveServicesAccountCallRateLimit>;
  capabilities?: Maybe<Array<Maybe<AzureCognitiveServicesAccountCapability>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  customSubDomainName?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  disableLocalAuth?: Maybe<Scalars['Boolean']>;
  encryption?: Maybe<AzureCognitiveServicesAccountEncryption>;
  endpoint?: Maybe<Scalars['String']>;
  endpoints?: Maybe<Array<Maybe<AzureCognitiveServicesAccountEndpoint>>>;
  etag?: Maybe<Scalars['String']>;
  identity?: Maybe<AzureCognitiveServicesAccountIdentity>;
  internalId?: Maybe<Scalars['String']>;
  isMigrated?: Maybe<Scalars['Boolean']>;
  lastModifiedAt?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  migrationToken?: Maybe<Scalars['String']>;
  networkAcls?: Maybe<AzureCognitiveServicesAccountNetworkAcls>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureCognitiveServicesAccountPrivateEndpointConnection>>>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  quotaLimit?: Maybe<AzureCognitiveServicesAccountQuotaLimit>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  restore?: Maybe<Scalars['Boolean']>;
  restrictOutboundNetworkAccess?: Maybe<Scalars['Boolean']>;
  sku?: Maybe<AzureCognitiveServicesAccountSku>;
  skuChangeInfo?: Maybe<AzureCognitiveServicesAccountSkuChangeInfo>;
  userOwnedStorage?: Maybe<Array<Maybe<AzureCognitiveServicesAccountUserOwnedStorage>>>;
};

export type AzureCognitiveServicesAccountApiProperties = {
  aadClientId?: Maybe<Scalars['String']>;
  aadTenantId?: Maybe<Scalars['String']>;
  eventHubConnectionString?: Maybe<Scalars['String']>;
  qnaAzureSearchEndpointId?: Maybe<Scalars['String']>;
  qnaAzureSearchEndpointKey?: Maybe<Scalars['String']>;
  qnaRuntimeEndpoint?: Maybe<Scalars['String']>;
  statisticsEnabled?: Maybe<Scalars['Boolean']>;
  storageAccountConnectionString?: Maybe<Scalars['String']>;
  superUser?: Maybe<Scalars['String']>;
  websiteName?: Maybe<Scalars['String']>;
};

export type AzureCognitiveServicesAccountCallRateLimit = {
  count?: Maybe<Scalars['Int']>;
  renewalPeriod?: Maybe<Scalars['Int']>;
  rules?: Maybe<Array<Maybe<AzureCognitiveServicesAccountThrottlingRule>>>;
};

export type AzureCognitiveServicesAccountCapability = AzureNameValueProperty & {
  id: Scalars['String'];
};

export type AzureCognitiveServicesAccountEncryption = {
  keySource?: Maybe<Scalars['String']>;
  keyVaultProperties?: Maybe<AzureCognitiveServicesAccountKeyVaultProperties>;
};

export type AzureCognitiveServicesAccountEndpoint = AzureKeyValueProperty & {
  id: Scalars['String'];
};

export type AzureCognitiveServicesAccountIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureCognitiveServicesAccountKeyVaultProperties = {
  identityClientId?: Maybe<Scalars['String']>;
  keyName?: Maybe<Scalars['String']>;
  keyVaultUri?: Maybe<Scalars['String']>;
  keyVersion?: Maybe<Scalars['String']>;
};

export type AzureCognitiveServicesAccountNetworkAcls = {
  defaultAction?: Maybe<Scalars['String']>;
  ipRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  virtualNetworkRules?: Maybe<Array<Maybe<AzureCognitiveServicesAccountVirtualNetworkRules>>>;
};

export type AzureCognitiveServicesAccountPrivateEndpointConnection = {
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  groupIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  lastModifiedAt?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  privateEndpointId?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionState?: Maybe<AzureCognitiveServicesAccountPrivateEndpointServiceConnectionStatus>;
  provisioningState?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureCognitiveServicesAccountPrivateEndpointServiceConnectionStatus = {
  actionsRequired?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureCognitiveServicesAccountQuotaLimit = {
  count?: Maybe<Scalars['Int']>;
  renewalPeriod?: Maybe<Scalars['Int']>;
  rules?: Maybe<Array<Maybe<AzureCognitiveServicesAccountThrottlingRule>>>;
};

export type AzureCognitiveServicesAccountSku = {
  capacity?: Maybe<Scalars['Int']>;
  family?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureCognitiveServicesAccountSkuChangeInfo = {
  countOfDowngrades?: Maybe<Scalars['Int']>;
  countOfUpgradesAfterDowngrades?: Maybe<Scalars['Int']>;
  lastChangeDate?: Maybe<Scalars['DateTime']>;
};

export type AzureCognitiveServicesAccountThrottlingRule = {
  count?: Maybe<Scalars['Int']>;
  dynamicThrottlingEnabled?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  matchPatterns?: Maybe<Array<Maybe<AzureCognitiveServicesAccountThrottlingRuleMatchPattern>>>;
  minCount?: Maybe<Scalars['Int']>;
  renewalPeriod?: Maybe<Scalars['Int']>;
};

export type AzureCognitiveServicesAccountThrottlingRuleMatchPattern = {
  id: Scalars['String'];
  method?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type AzureCognitiveServicesAccountUserOwnedStorage = {
  id: Scalars['String'];
  identityClientId?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
};

export type AzureCognitiveServicesAccountVirtualNetworkRules = {
  id: Scalars['String'];
  ignoreMissingVnetServiceEndpoint?: Maybe<Scalars['Boolean']>;
  state?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistry = AzureResource & {
  adminUserEnabled?: Maybe<Scalars['Boolean']>;
  creationDate?: Maybe<Scalars['String']>;
  dataEndpointEnabled?: Maybe<Scalars['Boolean']>;
  dataEndpointHostNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  encryption?: Maybe<AzureContainerRegistryEncryption>;
  identity?: Maybe<AzureContainerRegistryIdentity>;
  keyVault?: Maybe<Array<Maybe<AzureKeyVault>>>;
  loginServer?: Maybe<Scalars['String']>;
  networkRuleBypassOptions?: Maybe<Scalars['String']>;
  networkRuleSet?: Maybe<AzureContainerRegistryNetworkRuleSet>;
  policies?: Maybe<AzureContainerRegistryPolicies>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureContainerRegistryPrivateEndpointConnection>>>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  sku?: Maybe<AzureContainerRegistrySku>;
  status?: Maybe<AzureContainerRegistryStatus>;
  zoneRedundancy?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistryEncryption = {
  keyVaultProperties?: Maybe<AzureContainerRegistryKeyVaultProperties>;
  status?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistryIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistryKeyVaultProperties = {
  identity?: Maybe<Scalars['String']>;
  keyIdentifier?: Maybe<Scalars['String']>;
  keyRotationEnabled?: Maybe<Scalars['Boolean']>;
  lastKeyRotationTimestamp?: Maybe<Scalars['String']>;
  versionedKeyIdentifier?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistryNetworkRuleIpSetRule = {
  action?: Maybe<Scalars['String']>;
  iPAddressOrRange?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistryNetworkRuleSet = {
  defaultAction?: Maybe<Scalars['String']>;
  ipRules?: Maybe<Array<Maybe<AzureContainerRegistryNetworkRuleIpSetRule>>>;
};

export type AzureContainerRegistryPolicies = {
  exportPolicy?: Maybe<AzureContainerRegistryPolicyInfo>;
  quarantinePolicy?: Maybe<AzureContainerRegistryPolicyInfo>;
  retentionPolicy?: Maybe<AzureContainerRegistryPolicyInfo>;
  trustPolicy?: Maybe<AzureContainerRegistryPolicyInfo>;
};

export type AzureContainerRegistryPolicyInfo = {
  days?: Maybe<Scalars['Int']>;
  lastUpdatedTime?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistryPrivateEndpoint = {
  id?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistryPrivateEndpointConnection = {
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  privateEndpoint?: Maybe<AzureContainerRegistryPrivateEndpoint>;
  privateEndpointId?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionStateActionsRequired?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionStateDescription?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionStateStatus?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistrySku = {
  name?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureContainerRegistryStatus = {
  displayStatus?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
};

export type AzureCosmosDb = AzureResource & {
  analyticalStorageConfigurationSchemaType?: Maybe<Scalars['String']>;
  apiServerVersion?: Maybe<Scalars['String']>;
  azureTables?: Maybe<Array<Maybe<AzureCosmosDbTable>>>;
  backupPolicy?: Maybe<AzureCosmosDbBackupPolicy>;
  capabilities?: Maybe<Array<Maybe<AzureCosmosDbCapability>>>;
  capacityTotalThroughputLimit?: Maybe<Scalars['Int']>;
  connectorOffer?: Maybe<Scalars['String']>;
  consistencyPolicy?: Maybe<AzureCosmosDbConsistencyPolicy>;
  cors?: Maybe<Array<Maybe<AzureCosmosDbCorsPolicy>>>;
  createMode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  databaseAccountOfferType?: Maybe<Scalars['String']>;
  databases?: Maybe<Array<Maybe<AzureCosmosDbDatabase>>>;
  defaultIdentity?: Maybe<Scalars['String']>;
  disableKeyBasedMetadataWriteAccess?: Maybe<Scalars['Boolean']>;
  disableLocalAuth?: Maybe<Scalars['Boolean']>;
  documentEndpoint?: Maybe<Scalars['String']>;
  enableAnalyticalStorage?: Maybe<Scalars['Boolean']>;
  enableAutomaticFailover?: Maybe<Scalars['Boolean']>;
  enableCassandraConnector?: Maybe<Scalars['Boolean']>;
  enableFreeTier?: Maybe<Scalars['Boolean']>;
  enableMultipleWriteLocations?: Maybe<Scalars['Boolean']>;
  failoverPolicies?: Maybe<Array<Maybe<AzureCosmosDbFailoverPolicy>>>;
  identity?: Maybe<AzureCosmosDbIdentity>;
  instanceId?: Maybe<Scalars['String']>;
  ipRules?: Maybe<Array<Maybe<AzureCosmosDbIpAddressOrRange>>>;
  isVirtualNetworkFilterEnabled?: Maybe<Scalars['Boolean']>;
  keyVaultKeyUri?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  locations?: Maybe<Array<Maybe<AzureCosmosDbLocation>>>;
  networkAclBypass?: Maybe<Scalars['String']>;
  networkAclBypassResourceIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureCosmosDbPrivateEndpointConnection>>>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  readLocations?: Maybe<Array<Maybe<AzureCosmosDbLocation>>>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  restoreParameters?: Maybe<AzureCosmosDbRestoreParameters>;
  virtualNetworkRules?: Maybe<Array<Maybe<AzureCosmosDbVirtualNetworkRule>>>;
  writeLocations?: Maybe<Array<Maybe<AzureCosmosDbLocation>>>;
};

export type AzureCosmosDbBackupPolicy = {
  migrationState?: Maybe<AzureCosmosDbMigrationState>;
  periodicModeProperties?: Maybe<AzureCosmosDbPeriodicModeBackupPolicy>;
  type?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbCapability = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbConsistencyPolicy = {
  defaultConsistencyLevel?: Maybe<Scalars['String']>;
  maxIntervalInSeconds?: Maybe<Scalars['Int']>;
  maxStalenessPrefix?: Maybe<Scalars['Int']>;
};

export type AzureCosmosDbCorsPolicy = {
  allowedHeaders?: Maybe<Scalars['String']>;
  allowedMethods?: Maybe<Scalars['String']>;
  allowedOrigins?: Maybe<Scalars['String']>;
  exposedHeaders?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  maxAgeInSeconds?: Maybe<Scalars['Int']>;
};

export type AzureCosmosDbData = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbDatabase = {
  data?: Maybe<Array<Maybe<AzureCosmosDbData>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  options?: Maybe<AzureCosmosDbDatabaseOptionsResource>;
  resource?: Maybe<AzureCosmosDbDatabaseResource>;
  type?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbDatabaseOptionsResource = {
  maxThroughput?: Maybe<Scalars['Int']>;
  throughput?: Maybe<Scalars['Int']>;
};

export type AzureCosmosDbDatabaseResource = {
  etag?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  rid?: Maybe<Scalars['String']>;
  ts?: Maybe<Scalars['Int']>;
};

export type AzureCosmosDbDatabaseRestoreResource = {
  collectionNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  databaseName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type AzureCosmosDbFailoverPolicy = {
  failoverPriority?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  locationName?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userAssignedIdentities?: Maybe<Array<Maybe<AzureCosmosDbUserAssignedIdentity>>>;
};

export type AzureCosmosDbIpAddressOrRange = {
  id: Scalars['String'];
  ipAddressOrRange?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbLocation = {
  documentEndpoint?: Maybe<Scalars['String']>;
  failoverPriority?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  isZoneRedundant?: Maybe<Scalars['Boolean']>;
  locationName?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbMigrationState = {
  startTime?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['String']>;
  targetType?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbPeriodicModeBackupPolicy = {
  backupIntervalInMinutes?: Maybe<Scalars['Int']>;
  backupRetentionIntervalInHours?: Maybe<Scalars['Int']>;
  backupStorageRedundancy?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbPrivateEndpointConnection = {
  groupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  privateEndpointId?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionState?: Maybe<AzureCosmosDbPrivateLinkServiceConnectionStateProperty>;
  provisioningState?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbPrivateLinkServiceConnectionStateProperty = {
  actionsRequired?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbRestoreParameters = {
  databasesToRestore?: Maybe<Array<Maybe<AzureCosmosDbDatabaseRestoreResource>>>;
  restoreMode?: Maybe<Scalars['String']>;
  restoreSource?: Maybe<Scalars['String']>;
  restoreTimestampInUtc?: Maybe<Scalars['DateTime']>;
};

export type AzureCosmosDbTable = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  options?: Maybe<AzureCosmosDbDatabaseOptionsResource>;
  resource?: Maybe<AzureCosmosDbDatabaseResource>;
  type?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbUserAssignedIdentity = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<AzureCosmosDbUserIdentity>;
};

export type AzureCosmosDbUserIdentity = {
  clientId?: Maybe<Scalars['String']>;
  principalId?: Maybe<Scalars['String']>;
};

export type AzureCosmosDbVirtualNetworkRule = {
  id: Scalars['String'];
  ignoreMissingVNetServiceEndpoint?: Maybe<Scalars['Boolean']>;
};

export type AzureCredentialReference = {
  referenceName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureCustomSetupBaseUnion = {
  componentName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  licenseKey?: Maybe<AzureSecretBaseUnion>;
  password?: Maybe<AzureSecretBaseUnion>;
  targetName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  variableName?: Maybe<Scalars['String']>;
  variableValue?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type AzureDataCollectionRule = AzureResource & {
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  dataFlows?: Maybe<Array<Maybe<AzureDataCollectionRuleDataFlow>>>;
  dataSources?: Maybe<AzureDataCollectionRuleDataSourcesSpec>;
  description?: Maybe<Scalars['String']>;
  destinations?: Maybe<AzureDataCollectionRuleDestinationsSpec>;
  etag?: Maybe<Scalars['String']>;
  immutableId?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  logAnalyticsWorkspaces?: Maybe<Array<Maybe<AzureLogAnalyticsWorkspace>>>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureDataCollectionRuleDataFlow = {
  destinations?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  streams?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureDataCollectionRuleDataSourcesSpec = {
  extensions?: Maybe<Array<Maybe<AzureDataCollectionRuleExtensionDataSource>>>;
  performanceCounters?: Maybe<Array<Maybe<AzureDataCollectionRulePerfCounterDataSource>>>;
  syslog?: Maybe<Array<Maybe<AzureDataCollectionRuleSyslogDataSource>>>;
  windowsEventLogs?: Maybe<Array<Maybe<AzureDataCollectionRuleWindowsEventLogDataSource>>>;
};

export type AzureDataCollectionRuleDestinationsSpec = {
  azureMonitorMetricsName?: Maybe<Scalars['String']>;
  logAnalyticsDestinations?: Maybe<Array<Maybe<AzureDataCollectionRuleLogAnalyticsDestination>>>;
};

export type AzureDataCollectionRuleExtensionDataSource = {
  extensionName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  inputDataSources?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  streams?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureDataCollectionRuleLogAnalyticsDestination = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  workspaceId?: Maybe<Scalars['String']>;
  workspaceResourceId?: Maybe<Scalars['String']>;
};

export type AzureDataCollectionRulePerfCounterDataSource = {
  counterSpecifiers?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  samplingFrequencyInSeconds?: Maybe<Scalars['Int']>;
  streams?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureDataCollectionRuleSyslogDataSource = {
  facilityNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  logLevels?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  streams?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureDataCollectionRuleWindowsEventLogDataSource = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  streams?: Maybe<Array<Maybe<Scalars['String']>>>;
  xPathQueries?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureDataFactory = AzureResource & {
  createTime?: Maybe<Scalars['String']>;
  eTag?: Maybe<Scalars['String']>;
  identity?: Maybe<AzureDataFactoryIdentity>;
  integrationRuntimes?: Maybe<Array<Maybe<AzureIntegrationRuntime>>>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  version?: Maybe<Scalars['String']>;
};

export type AzureDataFactoryIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureDataLakeStorageAccount = AzureResource & {
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  suffix?: Maybe<Scalars['String']>;
};

export type AzureDatabaseManagedSqlInstance = AzureResource & {
  collation?: Maybe<Scalars['String']>;
  currentBackupStorageRedundancy?: Maybe<Scalars['String']>;
  dnsZone?: Maybe<Scalars['String']>;
  dnsZonePartner?: Maybe<Scalars['String']>;
  fullyQualifiedDomainName?: Maybe<Scalars['String']>;
  identity?: Maybe<AzureDatabaseManagedSqlInstanceIdentity>;
  instancePoolId?: Maybe<Scalars['String']>;
  keyId?: Maybe<Scalars['String']>;
  licenseType?: Maybe<Scalars['String']>;
  maintenanceConfigurationId?: Maybe<Scalars['String']>;
  minimalTlsVersion?: Maybe<Scalars['String']>;
  primaryUserAssignedIdentityId?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  proxyOverride?: Maybe<Scalars['String']>;
  publicDataEndpointEnabled?: Maybe<Scalars['Boolean']>;
  requestedBackupStorageRedundancy?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  restorePointInTime?: Maybe<Scalars['String']>;
  skuName?: Maybe<Scalars['String']>;
  skuTier?: Maybe<Scalars['String']>;
  sourceManagedInstanceId?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  storageSizeInGB?: Maybe<Scalars['Int']>;
  subnetId?: Maybe<Scalars['String']>;
  timezoneId?: Maybe<Scalars['String']>;
  vCores?: Maybe<Scalars['Int']>;
  zoneRedundant?: Maybe<Scalars['Boolean']>;
};

export type AzureDatabaseManagedSqlInstanceIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userAssignedIdentities?: Maybe<Array<Maybe<AzureDatabaseSqlUserAssignedIdentity>>>;
};

export type AzureDatabaseMySql = AzureResource & {
  charset?: Maybe<Scalars['String']>;
  collation?: Maybe<Scalars['String']>;
  mySqlServer?: Maybe<Array<Maybe<AzureMySqlServer>>>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureDatabasePostgreSql = AzureResource & {
  charset?: Maybe<Scalars['String']>;
  collation?: Maybe<Scalars['String']>;
  postgreSqlServer?: Maybe<Array<Maybe<AzurePostgreSqlServer>>>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureDatabaseSql = AzureResource & {
  autoPauseDelay?: Maybe<Scalars['Int']>;
  catalogCollation?: Maybe<Scalars['String']>;
  collation?: Maybe<Scalars['String']>;
  createMode?: Maybe<Scalars['String']>;
  creationDate?: Maybe<Scalars['String']>;
  currentBackupStorageRedundancy?: Maybe<Scalars['String']>;
  currentServiceObjectiveName?: Maybe<Scalars['String']>;
  currentSku?: Maybe<AzureDatabaseSqlSku>;
  databaseId?: Maybe<Scalars['String']>;
  defaultSecondaryLocation?: Maybe<Scalars['String']>;
  earliestRestoreDate?: Maybe<Scalars['String']>;
  elasticPoolId?: Maybe<Scalars['String']>;
  failoverGroupId?: Maybe<Scalars['String']>;
  federatedClientId?: Maybe<Scalars['String']>;
  highAvailabilityReplicaCount?: Maybe<Scalars['Int']>;
  identity?: Maybe<AzureDatabaseSqlDatabaseIdentity>;
  isInfraEncryptionEnabled?: Maybe<Scalars['Boolean']>;
  isLedgerOn?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  licenseType?: Maybe<Scalars['String']>;
  longTermRetentionBackupResourceId?: Maybe<Scalars['String']>;
  maintenanceConfigurationId?: Maybe<Scalars['String']>;
  managedBy?: Maybe<Scalars['String']>;
  maxLogSizeBytes?: Maybe<Scalars['Int64']>;
  maxSizeBytes?: Maybe<Scalars['String']>;
  minCapacity?: Maybe<Scalars['Int']>;
  pausedDate?: Maybe<Scalars['String']>;
  primaryDelegatedIdentityClientId?: Maybe<Scalars['String']>;
  readScale?: Maybe<Scalars['String']>;
  recoverableDatabaseId?: Maybe<Scalars['String']>;
  recoveryServicesRecoveryPointId?: Maybe<Scalars['String']>;
  requestedBackupStorageRedundancy?: Maybe<Scalars['String']>;
  requestedServiceObjectiveName?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  restorableDroppedDatabaseId?: Maybe<Scalars['String']>;
  restorePointInTime?: Maybe<Scalars['String']>;
  resumedDate?: Maybe<Scalars['String']>;
  sampleName?: Maybe<Scalars['String']>;
  secondaryType?: Maybe<Scalars['String']>;
  sku?: Maybe<AzureDatabaseSqlDiskSku>;
  sourceDatabaseDeletionDate?: Maybe<Scalars['String']>;
  sourceDatabaseId?: Maybe<Scalars['String']>;
  sqlServers?: Maybe<Array<Maybe<AzureSqlServer>>>;
  status?: Maybe<Scalars['String']>;
  transparentDataEncryptions?: Maybe<Array<Maybe<AzureDatabaseSqlLogicalDatabaseTransparentDataEncryption>>>;
  zoneRedundant?: Maybe<Scalars['Boolean']>;
};

export type AzureDatabaseSqlDatabaseIdentity = {
  delegatedResources?: Maybe<Array<Maybe<AzureDatabaseSqldelegatedResource>>>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userAssignedIdentities?: Maybe<Array<Maybe<AzureDatabaseSqlUserAssignedIdentity>>>;
};

export type AzureDatabaseSqlDatabaseUserIdentity = {
  clientId?: Maybe<Scalars['String']>;
  principalId?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlDelegation = {
  resourceId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlDiskSku = {
  capacity?: Maybe<Scalars['Int']>;
  family?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlLogicalDatabaseTransparentDataEncryption = AzureResource & {
  state?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlSku = {
  capacity?: Maybe<Scalars['Int']>;
  family?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlUserAssignedIdentity = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<AzureDatabaseSqlDatabaseUserIdentity>;
};

export type AzureDatabaseSqlVm = AzureResource & {
  autoBackupSettings?: Maybe<AzureDatabaseSqlVmAutoBackupSettings>;
  autoPatchingSettings?: Maybe<AzureDatabaseSqlVmAutoPatchingSettings>;
  identity?: Maybe<AzureDatabaseSqlVmResourceIdentity>;
  keyVaultCredentialSettings?: Maybe<AzureDatabaseSqlVmKeyVaultCredentialSettings>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  serverConfigurationsManagementSettings?: Maybe<AzureDatabaseSqlVmServerConfigurationsManagementSettings>;
  sqlImageOffer?: Maybe<Scalars['String']>;
  sqlImageSku?: Maybe<Scalars['String']>;
  sqlManagement?: Maybe<Scalars['String']>;
  sqlServerLicenseType?: Maybe<Scalars['String']>;
  sqlVirtualMachineGroupResourceId?: Maybe<Scalars['String']>;
  storageConfigurationSettings?: Maybe<AzureDatabaseSqlVmStorageConfigurationSettings>;
  virtualMachineResourceId?: Maybe<Scalars['String']>;
  wsfcDomainCredentials?: Maybe<AzureDatabaseSqlVmWsfcDomainCredentials>;
};

export type AzureDatabaseSqlVmAdditionalFeaturesServerConfigurations = {
  isRServicesEnabled?: Maybe<Scalars['Boolean']>;
};

export type AzureDatabaseSqlVmAutoBackupSettings = {
  backupScheduleType?: Maybe<Scalars['String']>;
  backupSystemDbs?: Maybe<Scalars['Boolean']>;
  enable?: Maybe<Scalars['Boolean']>;
  enableEncryption?: Maybe<Scalars['Boolean']>;
  fullBackupFrequency?: Maybe<Scalars['String']>;
  fullBackupStartTime?: Maybe<Scalars['Int']>;
  fullBackupWindowHours?: Maybe<Scalars['Int']>;
  logBackupFrequency?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  retentionPeriod?: Maybe<Scalars['Int']>;
  storageAccessKey?: Maybe<Scalars['String']>;
  storageAccountUrl?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlVmAutoPatchingSettings = {
  dayOfWeek?: Maybe<Scalars['String']>;
  enable?: Maybe<Scalars['Boolean']>;
  maintenanceWindowDuration?: Maybe<Scalars['Int']>;
  maintenanceWindowStartingHour?: Maybe<Scalars['Int']>;
};

export type AzureDatabaseSqlVmKeyVaultCredentialSettings = {
  azureKeyVaultUrl?: Maybe<Scalars['String']>;
  credentialName?: Maybe<Scalars['String']>;
  enable?: Maybe<Scalars['Boolean']>;
  servicePrincipalName?: Maybe<Scalars['String']>;
  servicePrincipalSecret?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlVmResourceIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlVmSqlStorageSettings = {
  defaultFilePath?: Maybe<Scalars['String']>;
  luns?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type AzureDatabaseSqlVmServerConfigurationsManagementSettings = {
  additionalFeaturesServerConfigurations?: Maybe<AzureDatabaseSqlVmAdditionalFeaturesServerConfigurations>;
  sqlConnectivityUpdateSettings?: Maybe<AzureDatabaseSqlVmSqlConnectivityUpdateSettings>;
  sqlStorageUpdateSettings?: Maybe<AzureDatabaseSqlVmSqlStorageUpdateSettings>;
  sqlWorkloadTypeUpdateSettings?: Maybe<AzureDatabaseSqlVmSqlWorkloadTypeUpdateSettings>;
};

export type AzureDatabaseSqlVmSqlConnectivityUpdateSettings = {
  connectivityType?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
  sqlAuthUpdatePassword?: Maybe<Scalars['String']>;
  sqlAuthUpdateUserName?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlVmSqlStorageUpdateSettings = {
  diskConfigurationType?: Maybe<Scalars['String']>;
  diskCount?: Maybe<Scalars['Int']>;
  startingDeviceId?: Maybe<Scalars['Int']>;
};

export type AzureDatabaseSqlVmSqlWorkloadTypeUpdateSettings = {
  sqlWorkloadType?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlVmStorageConfigurationSettings = {
  diskConfigurationType?: Maybe<Scalars['String']>;
  sqlDataSettings?: Maybe<AzureDatabaseSqlVmSqlStorageSettings>;
  sqlLogSettings?: Maybe<AzureDatabaseSqlVmSqlStorageSettings>;
  sqlTempDbSettings?: Maybe<AzureDatabaseSqlVmSqlStorageSettings>;
  storageWorkloadType?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqlVmWsfcDomainCredentials = {
  clusterBootstrapAccountPassword?: Maybe<Scalars['String']>;
  clusterOperatorAccountPassword?: Maybe<Scalars['String']>;
  sqlServiceAccountPassword?: Maybe<Scalars['String']>;
};

export type AzureDatabaseSqldelegatedResource = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<AzureDatabaseSqlDelegation>;
};

export type AzureDiagnosticSetting = AzureBaseResource & {
  appropiateCategories?: Maybe<Scalars['Boolean']>;
  eventHubAuthorizationRuleId?: Maybe<Scalars['String']>;
  eventHubName?: Maybe<Scalars['String']>;
  logAnalyticsDestinationType?: Maybe<Scalars['String']>;
  logs?: Maybe<Array<Maybe<AzureDiagnosticSettingLogs>>>;
  metrics?: Maybe<Array<Maybe<AzureDiagnosticSettingMetricSettings>>>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  serviceBusRuleId?: Maybe<Scalars['String']>;
  storageAccount?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  storageAccountId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type AzureDiagnosticSettingLogs = {
  category?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  retentionPolicyDays?: Maybe<Scalars['Int']>;
  retentionPolicyEnabled?: Maybe<Scalars['Boolean']>;
};

export type AzureDiagnosticSettingMetricSettings = {
  category?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  retentionPolicyDays?: Maybe<Scalars['Int']>;
  retentionPolicyEnabled?: Maybe<Scalars['Boolean']>;
  timeGrain?: Maybe<Scalars['String']>;
};

export type AzureDisk = AzureResource & {
  azureDiskEncryptionEnabled?: Maybe<Scalars['Boolean']>;
  createOption?: Maybe<Scalars['String']>;
  diskIopsReadWrite?: Maybe<Scalars['Int']>;
  diskMbpsReadWrite?: Maybe<Scalars['Int']>;
  diskSizeBytes?: Maybe<Scalars['Int64']>;
  diskSizeGb?: Maybe<Scalars['Int']>;
  diskState?: Maybe<Scalars['String']>;
  encryptionSettings?: Maybe<Scalars['String']>;
  hyperVGeneration?: Maybe<Scalars['String']>;
  imageReferenceId?: Maybe<Scalars['String']>;
  managedBy?: Maybe<Scalars['String']>;
  networkAccessPolicy?: Maybe<Scalars['String']>;
  osType?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  tier?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['String']>;
  uniqueId?: Maybe<Scalars['String']>;
  virtualMachine?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
  zones?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureDnsZone = AzureResource & {
  maxNumberOfRecordSets?: Maybe<Scalars['Int']>;
  nameServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  numberOfRecordSets?: Maybe<Scalars['Int']>;
  recordSets?: Maybe<Array<Maybe<AzureDnsZoneRecordSet>>>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  zoneType?: Maybe<Scalars['String']>;
};

export type AzureDnsZoneRecordSet = AzureResource & {
  aRecords?: Maybe<Array<Maybe<Scalars['String']>>>;
  aaaaRecords?: Maybe<Array<Maybe<Scalars['String']>>>;
  caaRecords?: Maybe<Array<Maybe<AzureDnsZoneRecordSetCaaRecord>>>;
  cnameRecord?: Maybe<Scalars['String']>;
  fqdn?: Maybe<Scalars['String']>;
  mxRecords?: Maybe<Array<Maybe<AzureDnsZoneRecordSetMxRecord>>>;
  nsRecords?: Maybe<Array<Maybe<Scalars['String']>>>;
  provisioningState?: Maybe<Scalars['String']>;
  ptrRecords?: Maybe<Array<Maybe<Scalars['String']>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  soaRecord?: Maybe<AzureDnsZoneRecordSetSoaRecord>;
  srvRecords?: Maybe<Array<Maybe<AzureDnsZoneRecordSetSrvRecord>>>;
  targetResourceId?: Maybe<Scalars['String']>;
  ttl?: Maybe<Scalars['Int']>;
  txtRecords?: Maybe<Array<Maybe<AzureDnsZoneRecordSetTxtRecord>>>;
};

export type AzureDnsZoneRecordSetCaaRecord = {
  flags?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  tag?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureDnsZoneRecordSetMxRecord = {
  exchange?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  preference?: Maybe<Scalars['Int']>;
};

export type AzureDnsZoneRecordSetSoaRecord = {
  email?: Maybe<Scalars['String']>;
  expireTime?: Maybe<Scalars['Int']>;
  host?: Maybe<Scalars['String']>;
  minimumTtl?: Maybe<Scalars['Int']>;
  refreshTime?: Maybe<Scalars['Int']>;
  retryTime?: Maybe<Scalars['Int']>;
  serialNumber?: Maybe<Scalars['Int']>;
};

export type AzureDnsZoneRecordSetSrvRecord = {
  id: Scalars['String'];
  port?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['Int']>;
  target?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type AzureDnsZoneRecordSetTxtRecord = {
  id: Scalars['String'];
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureEventGrid = AzureBaseResource & {
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  domainName?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureEventHub = AzureBaseResource & {
  actionGroups?: Maybe<Array<Maybe<AzureActionGroup>>>;
  captureDescription?: Maybe<AzureEventHubCaptureDescription>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  messageRetentionInDays?: Maybe<Scalars['Int']>;
  partitionCount?: Maybe<Scalars['Int']>;
  partitionIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  storageAccount?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  subscriptionId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type AzureEventHubCaptureDescription = {
  destination?: Maybe<AzureEventHubCaptureDestination>;
  enabled?: Maybe<Scalars['Boolean']>;
  encoding?: Maybe<Scalars['String']>;
  intervalInSeconds?: Maybe<Scalars['Int']>;
  sizeLimitInBytes?: Maybe<Scalars['Int64']>;
  skipEmptyArchives?: Maybe<Scalars['Boolean']>;
};

export type AzureEventHubCaptureDestination = {
  archiveNameFormat?: Maybe<Scalars['String']>;
  blobContainer?: Maybe<Scalars['String']>;
  dataLakeAccountName?: Maybe<Scalars['String']>;
  dataLakeFolderPath?: Maybe<Scalars['String']>;
  dataLakeSubscriptionId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  storageAccountResourceId?: Maybe<Scalars['String']>;
};

export type AzureExpressRouteGateway = AzureResource & {
  autoScaleConfiguration?: Maybe<AzureExpressRouteGatewayPropertiesAutoScaleConfiguration>;
  etag?: Maybe<Scalars['String']>;
  expressRouteConnections?: Maybe<Array<Maybe<AzureExpressRouteGatewayConnection>>>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  virtualHub?: Maybe<AzureExpressRouteGatewayVirtualHubId>;
};

export type AzureExpressRouteGatewayCircuitPeeringId = {
  id: Scalars['String'];
};

export type AzureExpressRouteGatewayConnection = {
  authorizationKey?: Maybe<Scalars['String']>;
  connectionId: Scalars['String'];
  enableInternetSecurity?: Maybe<Scalars['Boolean']>;
  expressRouteCircuitPeering?: Maybe<AzureExpressRouteGatewayCircuitPeeringId>;
  expressRouteGatewayBypass?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  routingConfiguration?: Maybe<AzureExpressRouteGatewayRoutingConfiguration>;
  routingWeight?: Maybe<Scalars['Int']>;
};

export type AzureExpressRouteGatewayPropagatedRouteTable = {
  ids?: Maybe<Array<Maybe<AzureSubResource>>>;
  labels?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureExpressRouteGatewayPropertiesAutoScaleConfiguration = {
  bounds?: Maybe<AzureExpressRouteGatewayPropertiesAutoScaleConfigurationBounds>;
};

export type AzureExpressRouteGatewayPropertiesAutoScaleConfigurationBounds = {
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
};

export type AzureExpressRouteGatewayRoutingConfiguration = {
  associatedRouteTable?: Maybe<AzureSubResource>;
  propagatedRouteTables?: Maybe<AzureExpressRouteGatewayPropagatedRouteTable>;
  vnetRoutes?: Maybe<AzureExpressRouteGatewayVnetRoute>;
};

export type AzureExpressRouteGatewayStaticRoute = {
  addressPrefixes?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nextHopIpAddress?: Maybe<Scalars['String']>;
};

export type AzureExpressRouteGatewayVirtualHubId = {
  id: Scalars['String'];
};

export type AzureExpressRouteGatewayVnetRoute = {
  bgpConnections?: Maybe<Array<Maybe<AzureSubResource>>>;
  staticRoutes?: Maybe<Array<Maybe<AzureExpressRouteGatewayStaticRoute>>>;
};

export type AzureExtendedLocation = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureFileShare = AzureBaseResource & {
  accessTier?: Maybe<Scalars['String']>;
  accessTierChangeTime?: Maybe<Scalars['DateTime']>;
  accessTierStatus?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  deletedTime?: Maybe<Scalars['DateTime']>;
  enabledProtocols?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['DateTime']>;
  leaseDuration?: Maybe<Scalars['String']>;
  leaseState?: Maybe<Scalars['String']>;
  leaseStatus?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  remainingRetentionDays?: Maybe<Scalars['Int']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  rootSquash?: Maybe<Scalars['String']>;
  shareQuota?: Maybe<Scalars['Int']>;
  shareUsageBytes?: Maybe<Scalars['Int']>;
  snapshotTime?: Maybe<Scalars['DateTime']>;
  storageAccount?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  storageAccountName?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type AzureFilesIdentityBasedAuthenticationAdProperties = {
  azureStorageSid?: Maybe<Scalars['String']>;
  domainGuid?: Maybe<Scalars['String']>;
  domainName?: Maybe<Scalars['String']>;
  domainSid?: Maybe<Scalars['String']>;
  forestName?: Maybe<Scalars['String']>;
  netBiosDomainName?: Maybe<Scalars['String']>;
};

export type AzureFirewall = AzureResource & {
  additionalProperties?: Maybe<Array<Maybe<AzureFirewallAdditionalProperty>>>;
  applicationRuleCollections?: Maybe<Array<Maybe<AzureFirewallApplicationRuleCollection>>>;
  firewallPolicy?: Maybe<Scalars['String']>;
  hubIPAddresses?: Maybe<AzureFirewallHubIpAddresses>;
  ipConfigurations?: Maybe<Array<Maybe<AzureFirewallIpConfiguration>>>;
  ipGroups?: Maybe<Array<Maybe<AzureFirewallIpGroup>>>;
  managementIpConfiguration?: Maybe<AzureFirewallManagementIpConfiguration>;
  natRuleCollections?: Maybe<Array<Maybe<AzureFirewallNatRuleCollection>>>;
  networkRuleCollections?: Maybe<Array<Maybe<AzureFirewallNetworkRuleCollection>>>;
  provisioningState?: Maybe<Scalars['String']>;
  publicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  threatIntelMode?: Maybe<Scalars['String']>;
  virtualHub?: Maybe<Scalars['String']>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
  zones?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureFirewallAdditionalProperty = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureFirewallApplicationRule = {
  description?: Maybe<Scalars['String']>;
  fqdnTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  protocols?: Maybe<Array<Maybe<AzureFirewallApplicationRuleProtocol>>>;
  sourceAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceIpGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
  targetFqdns?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureFirewallApplicationRuleCollection = {
  action?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  provisioningState?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<Maybe<AzureFirewallApplicationRule>>>;
};

export type AzureFirewallApplicationRuleProtocol = {
  id: Scalars['String'];
  port?: Maybe<Scalars['Int']>;
  protocolType?: Maybe<Scalars['String']>;
};

export type AzureFirewallHubIpAddresses = {
  privateIPAddress?: Maybe<Scalars['String']>;
  publicIPs?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureFirewallIpConfiguration = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  privateIPAddress?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  publicIPAddress?: Maybe<Scalars['String']>;
  subnet?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureFirewallIpGroup = {
  changeNumber?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type AzureFirewallManagementIpConfiguration = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  privateIPAddress?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  publicIPAddress?: Maybe<Scalars['String']>;
  subnet?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureFirewallNatRule = {
  description?: Maybe<Scalars['String']>;
  destinationAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationPorts?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  protocols?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceIpGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
  translatedAddress?: Maybe<Scalars['String']>;
  translatedFqdn?: Maybe<Scalars['String']>;
  translatedPort?: Maybe<Scalars['String']>;
};

export type AzureFirewallNatRuleCollection = {
  action?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  provisioningState?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<Maybe<AzureFirewallNatRule>>>;
};

export type AzureFirewallNetworkRule = {
  description?: Maybe<Scalars['String']>;
  destinationAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationFqdns?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationIpGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationPorts?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  protocols?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceIpGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureFirewallNetworkRuleCollection = {
  action?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  provisioningState?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<Maybe<AzureFirewallNetworkRule>>>;
};

export type AzureFunctionApp = AzureResource & {
  actionGroups?: Maybe<Array<Maybe<AzureActionGroup>>>;
  availabilityState?: Maybe<Scalars['String']>;
  clientAffinityEnabled?: Maybe<Scalars['Boolean']>;
  clientCertEnabled?: Maybe<Scalars['Boolean']>;
  clientCertExclusionPaths?: Maybe<Scalars['String']>;
  clientCertMode?: Maybe<Scalars['String']>;
  configuration?: Maybe<AzureFunctionAppConfiguration>;
  containerSize?: Maybe<Scalars['Int']>;
  customDomainVerificationId?: Maybe<Scalars['String']>;
  dailyMemoryTimeQuota?: Maybe<Scalars['Int']>;
  defaultHostName?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  enabledHostNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  extendedLocation?: Maybe<AzureExtendedLocation>;
  functions?: Maybe<Array<Maybe<AzureWebSiteFunction>>>;
  hostNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  hostNamesDisabled?: Maybe<Scalars['Boolean']>;
  hostingEnvironmentProfile?: Maybe<AzureHostingEnvironmentProfile>;
  httpsOnly?: Maybe<Scalars['Boolean']>;
  hyperV?: Maybe<Scalars['Boolean']>;
  inProgressOperationId?: Maybe<Scalars['String']>;
  isDefaultContainer?: Maybe<Scalars['Boolean']>;
  isXenon?: Maybe<Scalars['Boolean']>;
  keyVaultReferenceIdentity?: Maybe<Scalars['String']>;
  lastModifiedTimeUtc?: Maybe<Scalars['String']>;
  maxNumberOfWorkers?: Maybe<Scalars['Int']>;
  outboundIpAddresses?: Maybe<Scalars['String']>;
  possibleOutboundIpAddresses?: Maybe<Scalars['String']>;
  redundancyMode?: Maybe<Scalars['String']>;
  repositorySiteName?: Maybe<Scalars['String']>;
  reserved?: Maybe<Scalars['Boolean']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  scmSiteAlsoStopped?: Maybe<Scalars['Boolean']>;
  serverFarmId?: Maybe<Scalars['String']>;
  siteConfig?: Maybe<AzureAppServiceWebAppSiteConfig>;
  state?: Maybe<Scalars['String']>;
  storageAccountRequired?: Maybe<Scalars['Boolean']>;
  suspendedTill?: Maybe<Scalars['String']>;
  targetSwapSlot?: Maybe<Scalars['String']>;
  trafficManagerHostNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  usageState?: Maybe<Scalars['String']>;
  virtualNetworkSubnetId?: Maybe<Scalars['String']>;
};

export type AzureFunctionAppConfiguration = {
  ftpsState?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureHostingEnvironmentProfile = {
  id?: Maybe<Scalars['String']>;
};

export type AzureIntegrationRuntime = AzureBaseResource & {
  computeProperties?: Maybe<AzureIntegrationRuntimeComputeProperties>;
  customerVirtualNetworkSubnetId?: Maybe<Scalars['String']>;
  dataFactory?: Maybe<Array<Maybe<AzureDataFactory>>>;
  description?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  integrationRuntimeType?: Maybe<Scalars['String']>;
  linkedInfo?: Maybe<AzureLinkedIntegrationRuntimeTypeUnion>;
  managedVirtualNetwork?: Maybe<AzureManagedVirtualNetworkReference>;
  referenceName?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  ssisProperties?: Maybe<AzureIntegrationRuntimeSsisProperties>;
  state?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureIntegrationRuntimeComputeProperties = {
  dataFlowProperties?: Maybe<AzureIntegrationRuntimeDataFlowProperties>;
  location?: Maybe<Scalars['String']>;
  maxParallelExecutionsPerNode?: Maybe<Scalars['Int']>;
  nodeSize?: Maybe<Scalars['String']>;
  numberOfNodes?: Maybe<Scalars['Int']>;
  vNetProperties?: Maybe<AzureIntegrationRuntimeVNetProperties>;
};

export type AzureIntegrationRuntimeCustomSetupScriptProperties = {
  blobContainerUri?: Maybe<Scalars['String']>;
  sasTokenType?: Maybe<Scalars['String']>;
  sasTokenValue?: Maybe<Scalars['String']>;
};

export type AzureIntegrationRuntimeDataFlowProperties = {
  cleanup?: Maybe<Scalars['Boolean']>;
  computeType?: Maybe<Scalars['String']>;
  coreCount?: Maybe<Scalars['Int']>;
  timeToLive?: Maybe<Scalars['Int']>;
};

export type AzureIntegrationRuntimeDataProxyProperties = {
  connectViaReferenceName?: Maybe<Scalars['String']>;
  connectViaType?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  stagingLinkedServiceReferenceName?: Maybe<Scalars['String']>;
  stagingLinkedServiceType?: Maybe<Scalars['String']>;
};

export type AzureIntegrationRuntimeKeyValue = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureIntegrationRuntimeProperties = {
  computeProperties?: Maybe<AzureIntegrationRuntimeComputeProperties>;
  customerVirtualNetworkSubnetId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  integrationRuntimeType?: Maybe<Scalars['String']>;
  linkedInfo?: Maybe<AzureLinkedIntegrationRuntimeTypeUnion>;
  managedVirtualNetwork?: Maybe<AzureManagedVirtualNetworkReference>;
  referenceName?: Maybe<Scalars['String']>;
  ssisProperties?: Maybe<AzureIntegrationRuntimeSsisProperties>;
  state?: Maybe<Scalars['String']>;
};

export type AzureIntegrationRuntimeSsisCatalogInfo = {
  catalogAdminPasswordType?: Maybe<Scalars['String']>;
  catalogAdminPasswordValue?: Maybe<Scalars['String']>;
  catalogAdminUserName?: Maybe<Scalars['String']>;
  catalogPricingTier?: Maybe<Scalars['String']>;
  catalogServerEndpoint?: Maybe<Scalars['String']>;
  dualStandbyPairName?: Maybe<Scalars['String']>;
};

export type AzureIntegrationRuntimeSsisProperties = {
  catalogInfo?: Maybe<AzureIntegrationRuntimeSsisCatalogInfo>;
  credentialReferenceName?: Maybe<Scalars['String']>;
  credentialType?: Maybe<Scalars['String']>;
  customSetupScriptProperties?: Maybe<AzureIntegrationRuntimeCustomSetupScriptProperties>;
  dataProxyProperties?: Maybe<AzureIntegrationRuntimeDataProxyProperties>;
  edition?: Maybe<Scalars['String']>;
  expressCustomSetupProperties?: Maybe<Array<Maybe<AzureCustomSetupBaseUnion>>>;
  licenseType?: Maybe<Scalars['String']>;
  packageStores?: Maybe<Array<Maybe<AzurePackageStore>>>;
};

export type AzureIntegrationRuntimeVNetProperties = {
  publicIPs?: Maybe<Array<Maybe<Scalars['String']>>>;
  subnet?: Maybe<Scalars['String']>;
  subnetId?: Maybe<Scalars['String']>;
  vNetId?: Maybe<Scalars['String']>;
};

export type AzureKeyValueProperty = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureKeyVault = AzureResource & {
  accessPolicies?: Maybe<Array<Maybe<AzureKeyVaultAccessPolicy>>>;
  containerRegistries?: Maybe<Array<Maybe<AzureContainerRegistry>>>;
  createMode?: Maybe<Scalars['String']>;
  diagnosticSettings?: Maybe<Array<Maybe<AzureKeyVaultDiagnosticSetting>>>;
  enablePurgeProtection?: Maybe<Scalars['Boolean']>;
  enableRbacAuthorization?: Maybe<Scalars['Boolean']>;
  enableSoftDelete?: Maybe<Scalars['Boolean']>;
  enabledForDeployment?: Maybe<Scalars['Boolean']>;
  enabledForDiskEncryption?: Maybe<Scalars['Boolean']>;
  enabledForTemplateDeployment?: Maybe<Scalars['Boolean']>;
  keys?: Maybe<Array<Maybe<AzureKeyVaultKey>>>;
  networkAclBypass?: Maybe<Scalars['String']>;
  networkAclDefaultAction?: Maybe<Scalars['String']>;
  networkAclIpRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  networkAclVirtualNetworkRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  secrets?: Maybe<Array<Maybe<AzureKeyVaultSecret>>>;
  softDeleteRetentionInDays?: Maybe<Scalars['Int']>;
  tenantId?: Maybe<Scalars['String']>;
  vaultUri?: Maybe<Scalars['String']>;
};

export type AzureKeyVaultAccessPolicy = {
  applicationId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  objectId?: Maybe<Scalars['String']>;
  permissionCertificates?: Maybe<Array<Maybe<Scalars['String']>>>;
  permissionKeys?: Maybe<Array<Maybe<Scalars['String']>>>;
  permissionSecrets?: Maybe<Array<Maybe<Scalars['String']>>>;
  permissionStorage?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureKeyVaultDiagnosticSetting = {
  eventHubAuthorizationRuleId?: Maybe<Scalars['String']>;
  eventHubName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  logAnalyticsDestinationType?: Maybe<Scalars['String']>;
  logs?: Maybe<Array<Maybe<AzureDiagnosticSettingLogs>>>;
  metrics?: Maybe<Array<Maybe<AzureDiagnosticSettingMetricSettings>>>;
  name?: Maybe<Scalars['String']>;
  serviceBusRuleId?: Maybe<Scalars['String']>;
  storageAccountId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type AzureKeyVaultKey = {
  attributes?: Maybe<AzureKeyVaultKeyAttributes>;
  id: Scalars['String'];
  keyUri?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  type?: Maybe<Scalars['String']>;
};

export type AzureKeyVaultKeyAttributes = {
  created?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  expires?: Maybe<Scalars['String']>;
  exportable?: Maybe<Scalars['Boolean']>;
  notBefore?: Maybe<Scalars['String']>;
  recoveryLevel?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
};

export type AzureKeyVaultSecret = {
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<AzureKeyVaultSecretProperties>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  type?: Maybe<Scalars['String']>;
};

export type AzureKeyVaultSecretAttributes = {
  created?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  expires?: Maybe<Scalars['String']>;
  notBefore?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
};

export type AzureKeyVaultSecretProperties = {
  attributes?: Maybe<AzureKeyVaultSecretAttributes>;
  contentType?: Maybe<Scalars['String']>;
  secretUri?: Maybe<Scalars['String']>;
  secretUriWithVersion?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureLbBackendAddressPool = AzureBaseResource & {
  etag?: Maybe<Scalars['String']>;
  inboundNatRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  loadBalancingRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  location?: Maybe<Scalars['String']>;
  outboundRule?: Maybe<Scalars['String']>;
  outboundRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureLbFrontendIpConfiguration = AzureBaseResource & {
  etag?: Maybe<Scalars['String']>;
  inboundNatPools?: Maybe<Array<Maybe<Scalars['String']>>>;
  inboundNatRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  loadBalancingRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  outboundRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  privateIPAddress?: Maybe<Scalars['String']>;
  privateIPAddressVersion?: Maybe<Scalars['String']>;
  privateIPAllocationMethod?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  zones?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureLbInboundNatPool = AzureBaseResource & {
  backendPort?: Maybe<Scalars['Int']>;
  enableFloatingIP?: Maybe<Scalars['Boolean']>;
  enableTcpReset?: Maybe<Scalars['Boolean']>;
  etag?: Maybe<Scalars['String']>;
  frontendPortRangeEnd?: Maybe<Scalars['Int']>;
  frontendPortRangeStart?: Maybe<Scalars['Int']>;
  idleTimeoutInMinutes?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureLbInboundNatRule = AzureBaseResource & {
  backendPort?: Maybe<Scalars['Int']>;
  enableFloatingIP?: Maybe<Scalars['Boolean']>;
  enableTcpReset?: Maybe<Scalars['Boolean']>;
  etag?: Maybe<Scalars['String']>;
  frontendPort?: Maybe<Scalars['Int']>;
  frontendPortRangeEnd?: Maybe<Scalars['Int']>;
  frontendPortRangeStart?: Maybe<Scalars['Int']>;
  idleTimeoutInMinutes?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureLbLoadBalancingRule = AzureBaseResource & {
  backendPort?: Maybe<Scalars['Int']>;
  disableOutboundSnat?: Maybe<Scalars['Boolean']>;
  enableFloatingIP?: Maybe<Scalars['Boolean']>;
  enableTcpReset?: Maybe<Scalars['Boolean']>;
  etag?: Maybe<Scalars['String']>;
  frontendPort?: Maybe<Scalars['Int']>;
  idleTimeoutInMinutes?: Maybe<Scalars['Int']>;
  loadDistribution?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureLbOutboundRule = AzureBaseResource & {
  allocatedOutboundPorts?: Maybe<Scalars['Int']>;
  enableTcpReset?: Maybe<Scalars['Boolean']>;
  etag?: Maybe<Scalars['String']>;
  idleTimeoutInMinutes?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureLbProbe = AzureBaseResource & {
  etag?: Maybe<Scalars['String']>;
  intervalInSeconds?: Maybe<Scalars['Int']>;
  numberOfProbes?: Maybe<Scalars['Int']>;
  port?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  requestPath?: Maybe<Scalars['String']>;
};

export type AzureLinkedIntegrationRuntimeTypeUnion = {
  authorizationType?: Maybe<Scalars['String']>;
  credentialReferenceName?: Maybe<Scalars['String']>;
  credentialType?: Maybe<Scalars['String']>;
  keyType?: Maybe<Scalars['String']>;
  keyValue?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
};

export type AzureLinkedServiceReference = {
  parameters?: Maybe<Array<Maybe<AzureLinkedServiceReferencePatameters>>>;
  referenceName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureLinkedServiceReferencePatameters = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<AzureLinkedServiceReferencePatametersValue>>>;
};

export type AzureLinkedServiceReferencePatametersValue = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureLoadBalancer = AzureResource & {
  backendAddressPools?: Maybe<Array<Maybe<AzureLbBackendAddressPool>>>;
  backendPublicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  etag?: Maybe<Scalars['String']>;
  frontendIPConfigurations?: Maybe<Array<Maybe<AzureLbFrontendIpConfiguration>>>;
  frontendPublicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  gatewayLoadBalancerOf?: Maybe<Array<Maybe<AzureLoadBalancer>>>;
  gatewayLoadBalancers?: Maybe<Array<Maybe<AzureLoadBalancer>>>;
  inboundNatPools?: Maybe<Array<Maybe<AzureLbInboundNatPool>>>;
  inboundNatRules?: Maybe<Array<Maybe<AzureLbInboundNatRule>>>;
  loadBalancerBackendVirtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
  loadBalancingRules?: Maybe<Array<Maybe<AzureLbLoadBalancingRule>>>;
  outboundRules?: Maybe<Array<Maybe<AzureLbOutboundRule>>>;
  probes?: Maybe<Array<Maybe<AzureLbProbe>>>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  skuName?: Maybe<Scalars['String']>;
  skuTier?: Maybe<Scalars['String']>;
};

export type AzureLogAnalyticsSolution = AzureBaseResource & {
  logAnalyticsWorkspace?: Maybe<Array<Maybe<AzureLogAnalyticsWorkspace>>>;
  plan?: Maybe<AzureLogAnalyticsSolutionPlan>;
  properties?: Maybe<AzureLogAnalyticsSolutionProperties>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
};

export type AzureLogAnalyticsSolutionPlan = {
  name?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['String']>;
  promotionCode?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type AzureLogAnalyticsSolutionProperties = {
  containedResources?: Maybe<Array<Maybe<Scalars['String']>>>;
  creationTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  referencedResources?: Maybe<Array<Maybe<Scalars['String']>>>;
  workspaceResourceId?: Maybe<Scalars['String']>;
};

export type AzureLogAnalyticsWorkspace = AzureBaseResource & {
  createdDate?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  dataCollectionRules?: Maybe<Array<Maybe<AzureDataCollectionRule>>>;
  features?: Maybe<AzureLogAnalyticsWorkspaceFeature>;
  logAnalyticsSolutions?: Maybe<Array<Maybe<AzureLogAnalyticsSolution>>>;
  modifiedDate?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccessForIngestion?: Maybe<Scalars['String']>;
  publicNetworkAccessForQuery?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  retentionInDays?: Maybe<Scalars['Int']>;
  sku?: Maybe<AzureLogAnalyticsWorkspaceSku>;
  subscriptionId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  workspaceCapping?: Maybe<AzureLogAnalyticsWorkspaceCapping>;
};

export type AzureLogAnalyticsWorkspaceCapping = {
  dailyQuotaGb?: Maybe<Scalars['Int']>;
  dataIngestionStatus?: Maybe<Scalars['String']>;
  quotaNextResetTime?: Maybe<Scalars['String']>;
};

export type AzureLogAnalyticsWorkspaceFeature = {
  enableLogAccessUsingOnlyResourcePermissions?: Maybe<Scalars['Boolean']>;
  legacy?: Maybe<Scalars['Int']>;
  searchVersion?: Maybe<Scalars['Int']>;
};

export type AzureLogAnalyticsWorkspaceSku = {
  lastSkuUpdate?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type AzureLogProfile = AzureBaseResource & {
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  locations?: Maybe<Array<Maybe<Scalars['String']>>>;
  region?: Maybe<Scalars['String']>;
  retentionPolicy?: Maybe<AzureLogProfileRetentionPolicy>;
  serviceBusRuleId?: Maybe<Scalars['String']>;
  storageAccount?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  storageAccountId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
};

export type AzureLogProfileRetentionPolicy = {
  days?: Maybe<Scalars['Int']>;
  enabled?: Maybe<Scalars['Boolean']>;
};

export type AzureMachineLearningWorkspace = AzureResource & {
  allowPublicAccessWhenBehindVnet?: Maybe<Scalars['Boolean']>;
  applicationInsights?: Maybe<Scalars['String']>;
  containerRegistry?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discoveryUrl?: Maybe<Scalars['String']>;
  encryption?: Maybe<AzureMachineLearningWorkspaceEncryptionProperty>;
  friendlyName?: Maybe<Scalars['String']>;
  hbiWorkspace?: Maybe<Scalars['Boolean']>;
  imageBuildCompute?: Maybe<Scalars['String']>;
  keyVault?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  mlFlowTrackingUri?: Maybe<Scalars['String']>;
  notebookInfo?: Maybe<AzureMachineLearningWorkspaceNotebookResourceInfo>;
  primaryUserAssignedIdentity?: Maybe<Scalars['String']>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureMachineLearningWorkspacePrivateEndpointConnection>>>;
  privateLinkCount?: Maybe<Scalars['Int']>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  serviceManagedResourcesSettings?: Maybe<AzureMachineLearningWorkspaceServiceManagedResourcesSettings>;
  serviceProvisionedResourceGroup?: Maybe<Scalars['String']>;
  sharedPrivateLinkResources?: Maybe<Array<Maybe<AzureMachineLearningWorkspaceSharedPrivateLinkResource>>>;
  sku?: Maybe<AzureMachineLearningWorkspaceSku>;
  storageAccount?: Maybe<Scalars['String']>;
  storageHnsEnabled?: Maybe<Scalars['Boolean']>;
  tenantId?: Maybe<Scalars['String']>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type AzureMachineLearningWorkspaceCosmosDbSettings = {
  collectionsThroughput?: Maybe<Scalars['Int']>;
};

export type AzureMachineLearningWorkspaceEncryptionProperty = {
  identity?: Maybe<AzureMachineLearningWorkspaceIdentityForCmk>;
  keyVaultProperties?: Maybe<AzureMachineLearningWorkspaceKeyVaultProperties>;
  status?: Maybe<Scalars['String']>;
};

export type AzureMachineLearningWorkspaceIdentityForCmk = {
  userAssignedIdentity?: Maybe<Scalars['String']>;
};

export type AzureMachineLearningWorkspaceKeyVaultProperties = {
  identityClientId?: Maybe<Scalars['String']>;
  keyIdentifier?: Maybe<Scalars['String']>;
  keyVaultArmId?: Maybe<Scalars['String']>;
};

export type AzureMachineLearningWorkspaceNotebookPreparationError = {
  errorMessage?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['Int']>;
};

export type AzureMachineLearningWorkspaceNotebookResourceInfo = {
  fqdn?: Maybe<Scalars['String']>;
  notebookPreparationError?: Maybe<AzureMachineLearningWorkspaceNotebookPreparationError>;
  resourceId?: Maybe<Scalars['String']>;
};

export type AzureMachineLearningWorkspacePrivateEndpoint = {
  id?: Maybe<Scalars['String']>;
  subnetArmId?: Maybe<Scalars['String']>;
};

export type AzureMachineLearningWorkspacePrivateEndpointConnection = {
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  privateEndpoint?: Maybe<AzureMachineLearningWorkspacePrivateEndpoint>;
  privateLinkServiceConnectionState?: Maybe<AzureMachineLearningWorkspacePrivateLinkServiceConnectionState>;
  provisioningState?: Maybe<Scalars['String']>;
  sku?: Maybe<AzureMachineLearningWorkspaceSku>;
  type?: Maybe<Scalars['String']>;
};

export type AzureMachineLearningWorkspacePrivateLinkServiceConnectionState = {
  actionsRequired?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureMachineLearningWorkspaceServiceManagedResourcesSettings = {
  cosmosDb?: Maybe<AzureMachineLearningWorkspaceCosmosDbSettings>;
};

export type AzureMachineLearningWorkspaceSharedPrivateLinkResource = {
  groupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  privateLinkResourceId?: Maybe<Scalars['String']>;
  requestMessage?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureMachineLearningWorkspaceSku = {
  name?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureManagedVirtualNetworkReference = {
  id?: Maybe<Scalars['String']>;
  referenceName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureMetricAlert = AzureResource & {
  actions?: Maybe<Array<Maybe<AzureMetricAlertAction>>>;
  autoMitigate?: Maybe<Scalars['Boolean']>;
  criteria?: Maybe<AzureMetricAlertCriteria>;
  description?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  evaluationFrequency?: Maybe<Scalars['String']>;
  isMigrated?: Maybe<Scalars['Boolean']>;
  lastUpdatedTime?: Maybe<Scalars['DateTime']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  scopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  severity?: Maybe<Scalars['Int']>;
  targetResourceRegion?: Maybe<Scalars['String']>;
  targetResourceType?: Maybe<Scalars['String']>;
  windowSize?: Maybe<Scalars['String']>;
};

export type AzureMetricAlertAction = {
  actionGroupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type AzureMetricAlertCriteria = {
  allOf?: Maybe<Array<Maybe<AzureMetricAlertMultiMetricCriteria>>>;
  componentId?: Maybe<Scalars['String']>;
  failedLocationCount?: Maybe<Scalars['Int']>;
  odataType?: Maybe<Scalars['String']>;
  webTestId?: Maybe<Scalars['String']>;
};

export type AzureMetricAlertDynamicThresholdFailingPeriods = {
  minFailingPeriodsToAlert?: Maybe<Scalars['Int']>;
  numberOfEvaluationPeriods?: Maybe<Scalars['Int']>;
};

export type AzureMetricAlertMetricDimension = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureMetricAlertMultiMetricCriteria = {
  alertSensitivity?: Maybe<Scalars['String']>;
  criterionType?: Maybe<Scalars['String']>;
  dimensions?: Maybe<Array<Maybe<AzureMetricAlertMetricDimension>>>;
  failingPeriods?: Maybe<AzureMetricAlertDynamicThresholdFailingPeriods>;
  id: Scalars['String'];
  ignoreDataBefore?: Maybe<Scalars['DateTime']>;
  metricName?: Maybe<Scalars['String']>;
  metricNamespace?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  operator?: Maybe<Scalars['String']>;
  skipMetricValidation?: Maybe<Scalars['Boolean']>;
  threshold?: Maybe<Scalars['Int']>;
  timeAggregation?: Maybe<Scalars['String']>;
};

export type AzureMySqlServer = AzureResource & {
  administratorLogin?: Maybe<Scalars['String']>;
  byokEnforcement?: Maybe<Scalars['String']>;
  databaseMySql?: Maybe<Array<Maybe<AzureDatabaseMySql>>>;
  earliestRestoreDate?: Maybe<Scalars['String']>;
  fullyQualifiedDomainName?: Maybe<Scalars['String']>;
  identity?: Maybe<AzureMySqlServerResourceIdentity>;
  infrastructureEncryption?: Maybe<Scalars['String']>;
  masterServerId?: Maybe<Scalars['String']>;
  minimalTlsVersion?: Maybe<Scalars['String']>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureMySqlServerServerPrivateEndpointConnection>>>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  replicaCapacity?: Maybe<Scalars['Int']>;
  replicationRole?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  sslEnforcement?: Maybe<Scalars['String']>;
  storageProfile?: Maybe<AzureMySqlServerStorageProfile>;
  userVisibleState?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type AzureMySqlServerPrivateEndpointProperty = {
  id?: Maybe<Scalars['String']>;
};

export type AzureMySqlServerResourceIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureMySqlServerServerPrivateEndpointConnection = {
  id: Scalars['String'];
  properties?: Maybe<AzureMySqlServerServerPrivateEndpointConnectionProperties>;
};

export type AzureMySqlServerServerPrivateEndpointConnectionProperties = {
  privateEndpoint?: Maybe<AzureMySqlServerPrivateEndpointProperty>;
  privateLinkServiceConnectionState?: Maybe<AzureMySqlServerServerPrivateLinkServiceConnectionStateProperty>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureMySqlServerServerPrivateLinkServiceConnectionStateProperty = {
  actionsRequired?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureMySqlServerStorageProfile = {
  backupRetentionDays?: Maybe<Scalars['Int']>;
  geoRedundantBackup?: Maybe<Scalars['String']>;
  storageAutogrow?: Maybe<Scalars['String']>;
  storageMB?: Maybe<Scalars['Int']>;
};

export type AzureNameValueProperty = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureNetworkInterface = AzureResource & {
  appliedDnsServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  dnsServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  enableAcceleratedNetworking?: Maybe<Scalars['Boolean']>;
  enableIpForwarding?: Maybe<Scalars['Boolean']>;
  internalDnsNameLabel?: Maybe<Scalars['String']>;
  internalDomainNameSuffix?: Maybe<Scalars['String']>;
  ipConfiguration?: Maybe<AzureNetworkInterfaceIpConfiguration>;
  macAddress?: Maybe<Scalars['String']>;
  privateIpAddress?: Maybe<Scalars['String']>;
  publicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  securityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroup>>>;
  virtualMachineId?: Maybe<Scalars['String']>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
};

export type AzureNetworkInterfaceIpConfiguration = {
  etag?: Maybe<Scalars['String']>;
  gatewayLoadBalancer?: Maybe<AzureSubResource>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  privateIPAddress?: Maybe<Scalars['String']>;
  privateIPAddressVersion?: Maybe<Scalars['String']>;
  privateIPAllocationMethod?: Maybe<Scalars['String']>;
  privateLinkConnectionProperties?: Maybe<AzureNetworkInterfaceIpConfigurationPrivateLinkConnectionProperties>;
  provisioningState?: Maybe<Scalars['String']>;
  subnetId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureNetworkInterfaceIpConfigurationPrivateLinkConnectionProperties = {
  fqdns?: Maybe<Array<Maybe<Scalars['String']>>>;
  groupId?: Maybe<Scalars['String']>;
  requiredMemberName?: Maybe<Scalars['String']>;
};

export type AzureNetworkSecurityGroup = AzureResource & {
  defaultSecurityRules?: Maybe<Array<Maybe<AzureNetworkSecurityGroupRule>>>;
  etag?: Maybe<Scalars['String']>;
  flowLogs?: Maybe<Array<Maybe<AzureNetworkSecurityGroupFlowLog>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGuid?: Maybe<Scalars['String']>;
  securityRules?: Maybe<Array<Maybe<AzureNetworkSecurityGroupRule>>>;
};

export type AzureNetworkSecurityGroupApplication = AzureBaseResource & {
  etag?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureNetworkSecurityGroupFlowLog = AzureResource & {
  enabled?: Maybe<Scalars['Boolean']>;
  etag?: Maybe<Scalars['String']>;
  formatType?: Maybe<Scalars['String']>;
  formatVersion?: Maybe<Scalars['Int']>;
  networkWatcherFlowAnalyticsConfiguration?: Maybe<AzureNetworkWatcherFlowAnalyticsConfiguration>;
  provisioningState?: Maybe<Scalars['String']>;
  retentionPolicyDays?: Maybe<Scalars['Int']>;
  retentionPolicyEnabled?: Maybe<Scalars['Boolean']>;
  storageId?: Maybe<Scalars['String']>;
  targetResourceGuid?: Maybe<Scalars['String']>;
  targetResourceId?: Maybe<Scalars['String']>;
};

export type AzureNetworkSecurityGroupRule = AzureBaseResource & {
  access?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  destinationAddressPrefix?: Maybe<Scalars['String']>;
  destinationAddressPrefixes?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationApplicationSecurityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroupApplication>>>;
  destinationPortRange?: Maybe<Scalars['String']>;
  destinationPortRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  direction?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  protocol?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  sourceAddressPrefix?: Maybe<Scalars['String']>;
  sourceAddressPrefixes?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceApplicationSecurityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroupApplication>>>;
  sourcePortRange?: Maybe<Scalars['String']>;
  sourcePortRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
};

export type AzureNetworkWatcherFlowAnalyticsConfiguration = {
  enabled?: Maybe<Scalars['Boolean']>;
  trafficAnalyticsInterval?: Maybe<Scalars['Int']>;
  workspaceId?: Maybe<Scalars['String']>;
  workspaceRegion?: Maybe<Scalars['String']>;
  workspaceResourceId?: Maybe<Scalars['String']>;
};

export type AzureOptionalResource = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzurePackageStore = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  packageStoreLinkedServiceReferenceName?: Maybe<Scalars['String']>;
  packageStoreLinkedServiceType?: Maybe<Scalars['String']>;
};

export type AzurePolicyAssignment = AzureBaseResource & {
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  enforcementMode?: Maybe<Scalars['String']>;
  identity?: Maybe<AzurePolicyAssignmentIdentity>;
  nonComplianceMessages?: Maybe<Array<Maybe<AzurePolicyAssignmentNonComplianceMessages>>>;
  notScopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  parameters?: Maybe<Array<Maybe<AzurePolicyAssignmentParameters>>>;
  policyDefinitionId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroupId?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzurePolicyAssignmentIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzurePolicyAssignmentNonComplianceMessages = {
  id: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  policyDefinitionReferenceId?: Maybe<Scalars['String']>;
};

export type AzurePolicyAssignmentParameterValue = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzurePolicyAssignmentParameters = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<AzurePolicyAssignmentParameterValue>>>;
};

export type AzurePostgreSqlServer = AzureResource & {
  administratorLogin?: Maybe<Scalars['String']>;
  byokEnforcement?: Maybe<Scalars['String']>;
  configurations?: Maybe<Array<Maybe<AzurePostgreSqlServerConfiguration>>>;
  databasePostgreSql?: Maybe<Array<Maybe<AzureDatabasePostgreSql>>>;
  earliestRestoreDate?: Maybe<Scalars['String']>;
  firewallRules?: Maybe<Array<Maybe<AzurePostgreSqlServerFirewallRule>>>;
  fullyQualifiedDomainName?: Maybe<Scalars['String']>;
  identity?: Maybe<AzurePostgreSqlServerResourceIdentity>;
  infrastructureEncryption?: Maybe<Scalars['String']>;
  masterServerId?: Maybe<Scalars['String']>;
  minimalTlsVersion?: Maybe<Scalars['String']>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzurePostgreSqlServerPrivateEndpointConnection>>>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  replicaCapacity?: Maybe<Scalars['Int']>;
  replicationRole?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  sslEnforcement?: Maybe<Scalars['String']>;
  storageProfile?: Maybe<AzurePostgreSqlServerStorageProfile>;
  userVisibleState?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type AzurePostgreSqlServerConfiguration = {
  allowedValues?: Maybe<Scalars['String']>;
  dataType?: Maybe<Scalars['String']>;
  defaultValue?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzurePostgreSqlServerFirewallRule = {
  endIpAddress?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  startIpAddress?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzurePostgreSqlServerPrivateEndpointConnection = {
  id: Scalars['String'];
  properties?: Maybe<AzurePostgreSqlServerServerPrivateEndpointConnectionProperties>;
};

export type AzurePostgreSqlServerPrivateEndpointProperty = {
  id?: Maybe<Scalars['String']>;
};

export type AzurePostgreSqlServerPrivateLinkServiceConnectionStateProperty = {
  actionsRequired?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzurePostgreSqlServerResourceIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzurePostgreSqlServerServerPrivateEndpointConnectionProperties = {
  privateEndpoint?: Maybe<AzurePostgreSqlServerPrivateEndpointProperty>;
  privateLinkServiceConnectionState?: Maybe<AzurePostgreSqlServerPrivateLinkServiceConnectionStateProperty>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzurePostgreSqlServerStorageProfile = {
  backupRetentionDays?: Maybe<Scalars['Int']>;
  geoRedundantBackup?: Maybe<Scalars['String']>;
  storageAutogrow?: Maybe<Scalars['String']>;
  storageMB?: Maybe<Scalars['Int']>;
};

export type AzurePrivateDnsZone = AzureResource & {
  etag?: Maybe<Scalars['String']>;
  internalId?: Maybe<Scalars['String']>;
  maxNumberOfRecordSets?: Maybe<Scalars['Int']>;
  maxNumberOfVirtualNetworkLinks?: Maybe<Scalars['Int']>;
  maxNumberOfVirtualNetworkLinksWithRegistration?: Maybe<Scalars['Int']>;
  numberOfRecordSets?: Maybe<Scalars['Int']>;
  numberOfVirtualNetworkLinks?: Maybe<Scalars['Int']>;
  numberOfVirtualNetworkLinksWithRegistration?: Maybe<Scalars['Int']>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzurePublicIp = AzureResource & {
  allocationMethod?: Maybe<Scalars['String']>;
  dnsSettings?: Maybe<AzurePublicIpDnsSettings>;
  firewalls?: Maybe<Array<Maybe<AzureFirewall>>>;
  idleTimeoutInMinutes?: Maybe<Scalars['Int']>;
  ipAddress?: Maybe<Scalars['String']>;
  ipTags?: Maybe<Array<Maybe<AzurePublicIpTags>>>;
  ipVersion?: Maybe<Scalars['String']>;
  lbBackendOf?: Maybe<Array<Maybe<AzureLoadBalancer>>>;
  lbFrontendOf?: Maybe<Array<Maybe<AzureLoadBalancer>>>;
  networkInterface?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGuid?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
  zones?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzurePublicIpDnsSettings = {
  domainNameLabel?: Maybe<Scalars['String']>;
  fqdn?: Maybe<Scalars['String']>;
  reverseFqdn?: Maybe<Scalars['String']>;
};

export type AzurePublicIpTags = {
  ipTagType?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
};

export type AzureRawTag = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureRecoveryInstance = AzureBaseResource & {
  eTag?: Maybe<Scalars['String']>;
  properties?: Maybe<AzureRecoveryInstanceProperties>;
  recoveryVault?: Maybe<Array<Maybe<AzureRecoveryVault>>>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureRecoveryInstanceDiskExclusionProperties = {
  diskLunList?: Maybe<Array<Maybe<Scalars['Int']>>>;
  isInclusionList?: Maybe<Scalars['Boolean']>;
};

export type AzureRecoveryInstanceErrorDetail = {
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  recommendations?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureRecoveryInstanceExtendedProperties = {
  diskExclusionProperties?: Maybe<AzureRecoveryInstanceDiskExclusionProperties>;
  linuxVmApplicationName?: Maybe<Scalars['String']>;
};

export type AzureRecoveryInstanceItemExtendedInfo = {
  lastRefreshedAt?: Maybe<Scalars['DateTime']>;
  oldestRecoveryPoint?: Maybe<Scalars['DateTime']>;
  policyInconsistent?: Maybe<Scalars['Boolean']>;
  policyState?: Maybe<Scalars['String']>;
  recoveryPointCount?: Maybe<Scalars['Int']>;
  resourceState?: Maybe<Scalars['String']>;
  resourceStateSyncTime?: Maybe<Scalars['DateTime']>;
};

export type AzureRecoveryInstanceKpiResourceHealthDetails = {
  resourceHealthDetails?: Maybe<Array<Maybe<AzureRecoveryInstanceResourceHealthDetails>>>;
  resourceHealthStatus?: Maybe<Scalars['String']>;
};

export type AzureRecoveryInstanceKeyValue = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureRecoveryInstanceKpisHealths = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<AzureRecoveryInstanceKpiResourceHealthDetails>;
};

export type AzureRecoveryInstanceProperties = {
  backupEngineName?: Maybe<Scalars['String']>;
  backupManagementType?: Maybe<Scalars['String']>;
  backupSetName?: Maybe<Scalars['String']>;
  computerName?: Maybe<Scalars['String']>;
  containerName?: Maybe<Scalars['String']>;
  createMode?: Maybe<Scalars['String']>;
  deferredDeleteSyncTimeInUTC?: Maybe<Scalars['Int']>;
  deferredDeleteTimeInUTC?: Maybe<Scalars['DateTime']>;
  deferredDeleteTimeRemaining?: Maybe<Scalars['String']>;
  extendedInfo?: Maybe<AzureRecoveryInstanceItemExtendedInfo>;
  extendedProperties?: Maybe<AzureRecoveryInstanceExtendedProperties>;
  fabricName?: Maybe<Scalars['String']>;
  friendlyName?: Maybe<Scalars['String']>;
  healthDetails?: Maybe<Array<Maybe<AzureRecoveryInstanceResourceHealthDetails>>>;
  healthStatus?: Maybe<Scalars['String']>;
  isArchiveEnabled?: Maybe<Scalars['Boolean']>;
  isDeferredDeleteScheduleUpcoming?: Maybe<Scalars['Boolean']>;
  isRehydrate?: Maybe<Scalars['Boolean']>;
  isScheduledForDeferredDelete?: Maybe<Scalars['Boolean']>;
  kpisHealths?: Maybe<Array<Maybe<AzureRecoveryInstanceKpisHealths>>>;
  lastBackupErrorDetail?: Maybe<AzureRecoveryInstanceErrorDetail>;
  lastBackupStatus?: Maybe<Scalars['String']>;
  lastBackupTime?: Maybe<Scalars['DateTime']>;
  lastRecoveryPoint?: Maybe<Scalars['DateTime']>;
  parentName?: Maybe<Scalars['String']>;
  parentType?: Maybe<Scalars['String']>;
  policyId?: Maybe<Scalars['String']>;
  policyName?: Maybe<Scalars['String']>;
  policyState?: Maybe<Scalars['String']>;
  protectedItemDataId?: Maybe<Scalars['String']>;
  protectedItemDataSourceId?: Maybe<Scalars['String']>;
  protectedItemHealthStatus?: Maybe<Scalars['String']>;
  protectedItemId?: Maybe<Scalars['Int']>;
  protectedItemType?: Maybe<Scalars['String']>;
  protectionState?: Maybe<Scalars['String']>;
  protectionStatus?: Maybe<Scalars['String']>;
  resourceGuardOperationRequests?: Maybe<Array<Maybe<Scalars['String']>>>;
  serverName?: Maybe<Scalars['String']>;
  sourceAssociations?: Maybe<Array<Maybe<AzureRecoveryInstanceKeyValue>>>;
  sourceResourceId?: Maybe<Scalars['String']>;
  virtualMachineId?: Maybe<Scalars['String']>;
  workloadType?: Maybe<Scalars['String']>;
};

export type AzureRecoveryInstanceResourceHealthDetails = {
  code?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  recommendations?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type AzureRecoveryPolicy = AzureBaseResource & {
  eTag?: Maybe<Scalars['String']>;
  properties?: Maybe<AzureRecoveryPolicyProperties>;
  recoveryVault?: Maybe<Array<Maybe<AzureRecoveryVault>>>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGroupId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureRecoveryPolicyDailyRetentionFormat = {
  date?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  isLast?: Maybe<Scalars['Boolean']>;
};

export type AzureRecoveryPolicyDailyRetentionSchedule = {
  retentionDurationCount?: Maybe<Scalars['Int']>;
  retentionDurationType?: Maybe<Scalars['String']>;
  retentionTimes?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
};

export type AzureRecoveryPolicyHourlySchedule = {
  interval?: Maybe<Scalars['Int']>;
  scheduleWindowDuration?: Maybe<Scalars['Int']>;
  scheduleWindowStartTime?: Maybe<Scalars['DateTime']>;
};

export type AzureRecoveryPolicyInstantRpAdditionalDetails = {
  azureBackupRGNamePrefix?: Maybe<Scalars['String']>;
  azureBackupRGNameSuffix?: Maybe<Scalars['String']>;
};

export type AzureRecoveryPolicyMonthlyRetentionSchedule = {
  retentionDurationCount?: Maybe<Scalars['Int']>;
  retentionDurationType?: Maybe<Scalars['String']>;
  retentionScheduleDaily?: Maybe<Array<Maybe<AzureRecoveryPolicyDailyRetentionFormat>>>;
  retentionScheduleFormatType?: Maybe<Scalars['String']>;
  retentionScheduleWeekly?: Maybe<AzureRecoveryPolicyWeeklyRetentionFormat>;
  retentionTimes?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
};

export type AzureRecoveryPolicyProperties = {
  backupManagementType?: Maybe<Scalars['String']>;
  fabricName?: Maybe<Scalars['String']>;
  instantRPDetails?: Maybe<AzureRecoveryPolicyInstantRpAdditionalDetails>;
  instantRpRetentionRangeInDays?: Maybe<Scalars['Int']>;
  makePolicyConsistent?: Maybe<Scalars['Boolean']>;
  policyType?: Maybe<Scalars['String']>;
  protectedItemsCount?: Maybe<Scalars['Int']>;
  resourceGuardOperationRequests?: Maybe<Array<Maybe<Scalars['String']>>>;
  retentionPolicy?: Maybe<AzureRecoveryPolicyRetentionPolicyUnion>;
  schedulePolicy?: Maybe<AzureRecoveryPolicySchedulePolicyUnion>;
  settings?: Maybe<AzureRecoveryPolicySettings>;
  subProtectionPolicy?: Maybe<Array<Maybe<AzureRecoveryPolicySubProtectionPolicy>>>;
  timeZone?: Maybe<Scalars['String']>;
  workLoadType?: Maybe<Scalars['String']>;
};

export type AzureRecoveryPolicyRetentionDuration = {
  count?: Maybe<Scalars['Int']>;
  durationType?: Maybe<Scalars['String']>;
};

export type AzureRecoveryPolicyRetentionPolicyUnion = {
  dailySchedule?: Maybe<AzureRecoveryPolicyDailyRetentionSchedule>;
  monthlySchedule?: Maybe<AzureRecoveryPolicyMonthlyRetentionSchedule>;
  retentionDurationCount?: Maybe<Scalars['Int']>;
  retentionDurationType?: Maybe<Scalars['String']>;
  retentionPolicyType?: Maybe<Scalars['String']>;
  weeklySchedule?: Maybe<AzureRecoveryPolicyWeeklyRetentionSchedule>;
  yearlySchedule?: Maybe<AzureRecoveryPolicyYearlyRetentionSchedule>;
};

export type AzureRecoveryPolicySchedulePolicyUnion = {
  dailySchedule?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  hourlySchedule?: Maybe<AzureRecoveryPolicyHourlySchedule>;
  scheduleFrequencyInMins?: Maybe<Scalars['Int']>;
  schedulePolicyType?: Maybe<Scalars['String']>;
  scheduleRunDays?: Maybe<Array<Maybe<Scalars['String']>>>;
  scheduleRunFrequency?: Maybe<Scalars['String']>;
  scheduleRunTimes?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  scheduleWeeklyFrequency?: Maybe<Scalars['Int']>;
  weeklySchedule?: Maybe<AzureRecoveryPolicyWeeklySchedule>;
};

export type AzureRecoveryPolicySettings = {
  isCompression?: Maybe<Scalars['Boolean']>;
  issqlcompression?: Maybe<Scalars['Boolean']>;
  timeZone?: Maybe<Scalars['String']>;
};

export type AzureRecoveryPolicySubProtectionPolicy = {
  id: Scalars['String'];
  policyType?: Maybe<Scalars['String']>;
  retentionPolicy?: Maybe<AzureRecoveryPolicyRetentionPolicyUnion>;
  schedulePolicy?: Maybe<AzureRecoveryPolicySchedulePolicyUnion>;
};

export type AzureRecoveryPolicyWeeklyRetentionFormat = {
  daysOfTheWeek?: Maybe<Array<Maybe<Scalars['String']>>>;
  weeksOfTheMonth?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureRecoveryPolicyWeeklyRetentionSchedule = {
  daysOfTheWeek?: Maybe<Array<Maybe<Scalars['String']>>>;
  retentionDurationCount?: Maybe<Scalars['Int']>;
  retentionDurationType?: Maybe<Scalars['String']>;
  retentionTimes?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
};

export type AzureRecoveryPolicyWeeklySchedule = {
  scheduleRunDays?: Maybe<Array<Maybe<Scalars['String']>>>;
  scheduleRunTimes?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
};

export type AzureRecoveryPolicyYearlyRetentionSchedule = {
  monthsOfYear?: Maybe<Array<Maybe<Scalars['String']>>>;
  retentionDurationCount?: Maybe<Scalars['Int']>;
  retentionDurationType?: Maybe<Scalars['String']>;
  retentionScheduleDaily?: Maybe<Array<Maybe<AzureRecoveryPolicyDailyRetentionFormat>>>;
  retentionScheduleFormatType?: Maybe<Scalars['String']>;
  retentionScheduleWeekly?: Maybe<AzureRecoveryPolicyWeeklyRetentionFormat>;
  retentionTimes?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
};

export type AzureRecoveryVault = AzureResource & {
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  identity?: Maybe<AzureRecoveryVaultIdentity>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  properties?: Maybe<AzureRecoveryVaultProperties>;
  recoveryInstances?: Maybe<Array<Maybe<AzureRecoveryInstance>>>;
  recoveryPolicies?: Maybe<Array<Maybe<AzureRecoveryPolicy>>>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  sku?: Maybe<AzureRecoveryVaultSku>;
};

export type AzureRecoveryVaultCmkKekIdentity = {
  useSystemAssignedIdentity?: Maybe<Scalars['Boolean']>;
  userAssignedIdentity?: Maybe<Scalars['String']>;
};

export type AzureRecoveryVaultIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userAssignedIdentities?: Maybe<Array<Maybe<AzureRecoveryVaultUserAssignedIdentity>>>;
};

export type AzureRecoveryVaultPrivateEndpointConnection = {
  privateEndpointId?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionState?: Maybe<AzureRecoveryVaultPrivateLinkServiceConnectionState>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureRecoveryVaultPrivateEndpointConnectionVaultProperties = {
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<AzureRecoveryVaultPrivateEndpointConnection>;
  type?: Maybe<Scalars['String']>;
};

export type AzureRecoveryVaultPrivateLinkServiceConnectionState = {
  actionsRequired?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureRecoveryVaultProperties = {
  encryption?: Maybe<AzureRecoveryVaultPropertiesEncryption>;
  moveDetails?: Maybe<AzureRecoveryVaultPropertiesMoveDetails>;
  moveState?: Maybe<Scalars['String']>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureRecoveryVaultPrivateEndpointConnectionVaultProperties>>>;
  privateEndpointStateForBackup?: Maybe<Scalars['String']>;
  privateEndpointStateForSiteRecovery?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  upgradeDetails?: Maybe<AzureRecoveryVaultUpgradeDetails>;
};

export type AzureRecoveryVaultPropertiesEncryption = {
  infrastructureEncryption?: Maybe<Scalars['String']>;
  kekIdentity?: Maybe<AzureRecoveryVaultCmkKekIdentity>;
  keyUri?: Maybe<Scalars['String']>;
};

export type AzureRecoveryVaultPropertiesMoveDetails = {
  completionTimeUtc?: Maybe<Scalars['DateTime']>;
  operationId?: Maybe<Scalars['String']>;
  sourceResourceId?: Maybe<Scalars['String']>;
  startTimeUtc?: Maybe<Scalars['DateTime']>;
  targetResourceId?: Maybe<Scalars['String']>;
};

export type AzureRecoveryVaultSku = {
  capacity?: Maybe<Scalars['String']>;
  family?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureRecoveryVaultUpgradeDetails = {
  endTimeUtc?: Maybe<Scalars['DateTime']>;
  lastUpdatedTimeUtc?: Maybe<Scalars['DateTime']>;
  message?: Maybe<Scalars['String']>;
  operationId?: Maybe<Scalars['String']>;
  previousResourceId?: Maybe<Scalars['String']>;
  startTimeUtc?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['String']>;
  triggerType?: Maybe<Scalars['String']>;
  upgradedResourceId?: Maybe<Scalars['String']>;
};

export type AzureRecoveryVaultUserAssignedIdentity = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<AzureRecoveryVaultUserIdentity>;
};

export type AzureRecoveryVaultUserIdentity = {
  clientId?: Maybe<Scalars['String']>;
  principalId?: Maybe<Scalars['String']>;
};

export type AzureRedisCache = AzureResource & {
  accessKeys?: Maybe<AzureRedisCacheAccessKeys>;
  enableNonSslPort?: Maybe<Scalars['Boolean']>;
  hostName?: Maybe<Scalars['String']>;
  identity?: Maybe<AzureRedisCacheManagedServiceIdentity>;
  instances?: Maybe<Array<Maybe<AzureRedisCacheInstanceDetails>>>;
  linkedServers?: Maybe<Array<Maybe<AzureRedisCacheLinkedServer>>>;
  minimumTlsVersion?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureRedisCachePrivateEndpointConnection>>>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  redisConfiguration?: Maybe<AzureRedisCacheCommonPropertiesRedisConfiguration>;
  redisVersion?: Maybe<Scalars['String']>;
  replicasPerMaster?: Maybe<Scalars['Int']>;
  replicasPerPrimary?: Maybe<Scalars['Int']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  shardCount?: Maybe<Scalars['Int']>;
  sku?: Maybe<AzureRedisCacheSku>;
  sslPort?: Maybe<Scalars['Int']>;
  staticIP?: Maybe<Scalars['String']>;
  subnetId?: Maybe<Scalars['String']>;
  tenantSettings?: Maybe<Array<Maybe<AzureRedisCacheTenantSettings>>>;
  zones?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureRedisCacheAccessKeys = {
  primaryKey?: Maybe<Scalars['String']>;
  secondaryKey?: Maybe<Scalars['String']>;
};

export type AzureRedisCacheCommonPropertiesRedisConfiguration = {
  aofStorageConnectionString0?: Maybe<Scalars['String']>;
  aofStorageConnectionString1?: Maybe<Scalars['String']>;
  maxclients?: Maybe<Scalars['String']>;
  maxfragmentationmemoryReserved?: Maybe<Scalars['String']>;
  maxmemoryDelta?: Maybe<Scalars['String']>;
  maxmemoryPolicy?: Maybe<Scalars['String']>;
  maxmemoryReserved?: Maybe<Scalars['String']>;
  preferredDataArchiveAuthMethod?: Maybe<Scalars['String']>;
  preferredDataPersistenceAuthMethod?: Maybe<Scalars['String']>;
  rdbBackupEnabled?: Maybe<Scalars['String']>;
  rdbBackupFrequency?: Maybe<Scalars['String']>;
  rdbBackupMaxSnapshotCount?: Maybe<Scalars['String']>;
  rdbStorageConnectionString?: Maybe<Scalars['String']>;
  zonalConfiguration?: Maybe<Scalars['String']>;
};

export type AzureRedisCacheInstanceDetails = {
  id: Scalars['String'];
  isMaster?: Maybe<Scalars['Boolean']>;
  isPrimary?: Maybe<Scalars['Boolean']>;
  nonSslPort?: Maybe<Scalars['Int']>;
  shardId?: Maybe<Scalars['Int']>;
  sslPort?: Maybe<Scalars['Int']>;
  zone?: Maybe<Scalars['String']>;
};

export type AzureRedisCacheLinkedServer = {
  id: Scalars['String'];
};

export type AzureRedisCacheManagedServiceIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userAssignedIdentities?: Maybe<Array<Maybe<AzureRedisCacheUserAssignedIdentities>>>;
};

export type AzureRedisCachePrivateEndpoint = {
  id?: Maybe<Scalars['String']>;
};

export type AzureRedisCachePrivateEndpointConnection = {
  id: Scalars['String'];
  privateEndpoint?: Maybe<AzureRedisCachePrivateEndpoint>;
  privateLinkServiceConnectionState?: Maybe<AzureRedisCachePrivateLinkServiceConnectionState>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureRedisCachePrivateLinkServiceConnectionState = {
  actionsRequired?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureRedisCacheSku = {
  capacity?: Maybe<Scalars['Int']>;
  family?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AzureRedisCacheTenantSettings = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureRedisCacheUserAssignedIdentities = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<AzureRedisCacheUserAssignedIdentity>;
};

export type AzureRedisCacheUserAssignedIdentity = {
  clientId?: Maybe<Scalars['String']>;
  principalId?: Maybe<Scalars['String']>;
};

export type AzureReplicationAppliance = AzureResource & {
  properties?: Maybe<AzureReplicationApplianceProperties>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureReplicationApplianceProperties = {
  providerSpecificDetails?: Maybe<AzureReplicationApplianceSpecificDetailsUnion>;
};

export type AzureReplicationApplianceSpecificDetailsUnion = {
  instanceType?: Maybe<Scalars['String']>;
};

export type AzureReplicationCenter = AzureResource & {
  properties?: Maybe<AzureReplicationCenterProperties>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureReplicationCenterHealthError = {
  creationTimeUtc?: Maybe<Scalars['String']>;
  customerResolvability?: Maybe<Scalars['String']>;
  entityId?: Maybe<Scalars['String']>;
  errorCategory?: Maybe<Scalars['String']>;
  errorCode?: Maybe<Scalars['String']>;
  errorId?: Maybe<Scalars['String']>;
  errorLevel?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  errorSource?: Maybe<Scalars['String']>;
  errorType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  innerHealthErrors?: Maybe<Array<Maybe<AzureReplicationCenterInnerHealthError>>>;
  possibleCauses?: Maybe<Scalars['String']>;
  recommendedAction?: Maybe<Scalars['String']>;
  recoveryProviderErrorMessage?: Maybe<Scalars['String']>;
  summaryMessage?: Maybe<Scalars['String']>;
};

export type AzureReplicationCenterInnerHealthError = {
  creationTimeUtc?: Maybe<Scalars['String']>;
  customerResolvability?: Maybe<Scalars['String']>;
  entityId?: Maybe<Scalars['String']>;
  errorCategory?: Maybe<Scalars['String']>;
  errorCode?: Maybe<Scalars['String']>;
  errorId?: Maybe<Scalars['String']>;
  errorLevel?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  errorSource?: Maybe<Scalars['String']>;
  errorType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  possibleCauses?: Maybe<Scalars['String']>;
  recommendedAction?: Maybe<Scalars['String']>;
  recoveryProviderErrorMessage?: Maybe<Scalars['String']>;
  summaryMessage?: Maybe<Scalars['String']>;
};

export type AzureReplicationCenterProperties = {
  discoveryStatus?: Maybe<Scalars['String']>;
  fabricArmResourceName?: Maybe<Scalars['String']>;
  friendlyName?: Maybe<Scalars['String']>;
  healthErrors?: Maybe<Array<Maybe<AzureReplicationCenterHealthError>>>;
  infrastructureId?: Maybe<Scalars['String']>;
  internalId?: Maybe<Scalars['String']>;
  ipAddress?: Maybe<Scalars['String']>;
  lastHeartbeat?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['String']>;
  processServerId?: Maybe<Scalars['String']>;
  runAsAccountId?: Maybe<Scalars['String']>;
};

export type AzureReplicationNetwork = AzureResource & {
  properties?: Maybe<AzureReplicationNetworkProperties>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureReplicationNetworkProperties = {
  fabricType?: Maybe<Scalars['String']>;
  friendlyName?: Maybe<Scalars['String']>;
  networkType?: Maybe<Scalars['String']>;
  subnets?: Maybe<Array<Maybe<AzureReplicationNetworkSubnet>>>;
};

export type AzureReplicationNetworkSubnet = {
  addressList?: Maybe<Array<Maybe<Scalars['String']>>>;
  friendlyName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type AzureReplicationPolicy = AzureResource & {
  properties?: Maybe<AzureReplicationPolicyProperties>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureReplicationPolicyProperties = {
  friendlyName?: Maybe<Scalars['String']>;
  providerSpecificDetails?: Maybe<AzureReplicationPolicyProviderSpecificDetailsUnion>;
};

export type AzureReplicationPolicyProviderSpecificDetailsUnion = {
  appConsistentFrequencyInMinutes?: Maybe<Scalars['Int']>;
  crashConsistentFrequencyInMinutes?: Maybe<Scalars['Int']>;
  instanceType?: Maybe<Scalars['String']>;
  multiVmSyncStatus?: Maybe<Scalars['String']>;
  recoveryPointHistory?: Maybe<Scalars['Int']>;
  recoveryPointThresholdInMinutes?: Maybe<Scalars['Int']>;
};

export type AzureResource = {
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroupId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  type?: Maybe<Scalars['String']>;
};

export type AzureResourceGroup = AzureResource & {
  actionGroups?: Maybe<Array<Maybe<AzureActionGroup>>>;
  activityLogAlerts?: Maybe<Array<Maybe<AzureActivityLogAlert>>>;
  aksManagedClusters?: Maybe<Array<Maybe<AzureAksManagedCluster>>>;
  appInsights?: Maybe<Array<Maybe<AzureAppInsights>>>;
  appServiceEnvironments?: Maybe<Array<Maybe<AzureAppServiceEnvironment>>>;
  appServicePlans?: Maybe<Array<Maybe<AzureAppServicePlan>>>;
  appServiceWebApps?: Maybe<Array<Maybe<AzureAppServiceWebApp>>>;
  arcConnectedClusters?: Maybe<Array<Maybe<AzureArcConnectedCluster>>>;
  backupInstances?: Maybe<Array<Maybe<AzureBackupInstance>>>;
  backupPolicies?: Maybe<Array<Maybe<AzureBackupPolicy>>>;
  backupVaults?: Maybe<Array<Maybe<AzureBackupVault>>>;
  cdnCustomDomains?: Maybe<Array<Maybe<AzureCdnCustomDomain>>>;
  cdnEndpoints?: Maybe<Array<Maybe<AzureCdnEndpoint>>>;
  cdnOriginGroups?: Maybe<Array<Maybe<AzureCdnOriginGroup>>>;
  cdnOrigins?: Maybe<Array<Maybe<AzureCdnOrigin>>>;
  cdnProfiles?: Maybe<Array<Maybe<AzureCdnProfile>>>;
  cognitiveServicesAccounts?: Maybe<Array<Maybe<AzureCognitiveServicesAccount>>>;
  containerRegistries?: Maybe<Array<Maybe<AzureContainerRegistry>>>;
  cosmosDb?: Maybe<Array<Maybe<AzureCosmosDb>>>;
  dataCollectionRules?: Maybe<Array<Maybe<AzureDataCollectionRule>>>;
  dataFactories?: Maybe<Array<Maybe<AzureDataFactory>>>;
  dataLakeStorageAccount?: Maybe<Array<Maybe<AzureDataLakeStorageAccount>>>;
  databaseManagedSqlInstances?: Maybe<Array<Maybe<AzureDatabaseManagedSqlInstance>>>;
  databaseMySql?: Maybe<Array<Maybe<AzureDatabaseMySql>>>;
  databasePostgreSql?: Maybe<Array<Maybe<AzureDatabasePostgreSql>>>;
  databaseSql?: Maybe<Array<Maybe<AzureDatabaseSql>>>;
  databaseSqlVm?: Maybe<Array<Maybe<AzureDatabaseSqlVm>>>;
  diagnosticSettings?: Maybe<Array<Maybe<AzureDiagnosticSetting>>>;
  disks?: Maybe<Array<Maybe<AzureDisk>>>;
  dns?: Maybe<Array<Maybe<AzureDnsZone>>>;
  eventGrids?: Maybe<Array<Maybe<AzureEventGrid>>>;
  eventHubs?: Maybe<Array<Maybe<AzureEventHub>>>;
  expressRouteGateways?: Maybe<Array<Maybe<AzureExpressRouteGateway>>>;
  fileShares?: Maybe<Array<Maybe<AzureFileShare>>>;
  firewalls?: Maybe<Array<Maybe<AzureFirewall>>>;
  functionApps?: Maybe<Array<Maybe<AzureFunctionApp>>>;
  integrationRuntimes?: Maybe<Array<Maybe<AzureIntegrationRuntime>>>;
  keyVaults?: Maybe<Array<Maybe<AzureKeyVault>>>;
  loadBalancers?: Maybe<Array<Maybe<AzureLoadBalancer>>>;
  logAnalyticsSolutions?: Maybe<Array<Maybe<AzureLogAnalyticsSolution>>>;
  logAnalyticsWorkspaces?: Maybe<Array<Maybe<AzureLogAnalyticsWorkspace>>>;
  machineLearningWorkspace?: Maybe<Array<Maybe<AzureMachineLearningWorkspace>>>;
  managedBy?: Maybe<Scalars['String']>;
  metricAlerts?: Maybe<Array<Maybe<AzureMetricAlert>>>;
  mySqlServer?: Maybe<Array<Maybe<AzureMySqlServer>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  postgreSqlServer?: Maybe<Array<Maybe<AzurePostgreSqlServer>>>;
  privateDns?: Maybe<Array<Maybe<AzurePrivateDnsZone>>>;
  publicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  recoveryInstances?: Maybe<Array<Maybe<AzureRecoveryInstance>>>;
  recoveryPolicies?: Maybe<Array<Maybe<AzureRecoveryPolicy>>>;
  recoveryVaults?: Maybe<Array<Maybe<AzureRecoveryVault>>>;
  redisCaches?: Maybe<Array<Maybe<AzureRedisCache>>>;
  replicationAppliances?: Maybe<Array<Maybe<AzureReplicationAppliance>>>;
  replicationCenters?: Maybe<Array<Maybe<AzureReplicationCenter>>>;
  replicationNetworks?: Maybe<Array<Maybe<AzureReplicationNetwork>>>;
  replicationPolicies?: Maybe<Array<Maybe<AzureReplicationPolicy>>>;
  securityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroup>>>;
  serviceBus?: Maybe<Array<Maybe<AzureServiceBus>>>;
  sqlServers?: Maybe<Array<Maybe<AzureSqlServer>>>;
  storageAccounts?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  storageBlobs?: Maybe<Array<Maybe<AzureStorageBlob>>>;
  storageContainers?: Maybe<Array<Maybe<AzureStorageContainer>>>;
  synapseBigDataPools?: Maybe<Array<Maybe<AzureSynapseBigDataPool>>>;
  synapseSqlPools?: Maybe<Array<Maybe<AzureSynapseSqlPool>>>;
  synapseWorkspaces?: Maybe<Array<Maybe<AzureSynapseWorkspace>>>;
  trafficManagerProfiles?: Maybe<Array<Maybe<AzureTrafficManagerProfile>>>;
  virtualMachineScaleSets?: Maybe<Array<Maybe<AzureVirtualMachineScaleSet>>>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
};

export type AzureResourceSystemData = {
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
};

export type AzureSecretBaseUnion = {
  secretName?: Maybe<Scalars['String']>;
  secretVersion?: Maybe<Scalars['String']>;
  store?: Maybe<AzureLinkedServiceReference>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureSecurityAssesment = AzureBaseResource & {
  additionalData?: Maybe<Array<Maybe<AzureSecurityAssesmentAdditionalData>>>;
  displayName?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  metadata?: Maybe<AzureSecurityAssesmentMetadata>;
  partnerName?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceDetails?: Maybe<AzureSecurityAssesmentResourceDetails>;
  resourceGroupId?: Maybe<Scalars['String']>;
  status?: Maybe<AzureSecurityAssesmentStatus>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureSecurityAssesmentAdditionalData = {
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureSecurityAssesmentMetadata = {
  assessmentType?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  implementationEffort?: Maybe<Scalars['String']>;
  partnerName?: Maybe<Scalars['String']>;
  policyDefinitionId?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  remediationDescription?: Maybe<Scalars['String']>;
  severity?: Maybe<Scalars['String']>;
  threats?: Maybe<Array<Maybe<Scalars['String']>>>;
  userImpact?: Maybe<Scalars['String']>;
};

export type AzureSecurityAssesmentResourceDetails = {
  databaseName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  machineName?: Maybe<Scalars['String']>;
  serverName?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  sourceComputerId?: Maybe<Scalars['String']>;
  vmuuid?: Maybe<Scalars['String']>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type AzureSecurityAssesmentStatus = {
  cause?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  firstEvaluationDate?: Maybe<Scalars['String']>;
  statusChangeDate?: Maybe<Scalars['String']>;
};

export type AzureSecurityContact = AzureBaseResource & {
  alertNotifications?: Maybe<Scalars['String']>;
  alertsToAdmins?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureSecurityPricing = AzureResource & {
  freeTrialRemainingTime?: Maybe<Scalars['String']>;
  pricingTier?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureSecuritySetting = AzureBaseResource & {
  enabled?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type AzureServiceBus = AzureResource & {
  createdAt?: Maybe<Scalars['DateTime']>;
  disableLocalAuth?: Maybe<Scalars['Boolean']>;
  encryption?: Maybe<AzureServiceBusEncryption>;
  identity?: Maybe<AzureServiceBusIdentity>;
  metricId?: Maybe<Scalars['String']>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureServiceBusPrivateEndpointConnection>>>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  serviceBusEndpoint?: Maybe<Scalars['String']>;
  sku?: Maybe<AzureServiceBusSku>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  zoneRedundant?: Maybe<Scalars['Boolean']>;
};

export type AzureServiceBusConnectionState = {
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureServiceBusEncryption = {
  keySource?: Maybe<Scalars['String']>;
  keyVaultProperties?: Maybe<Array<Maybe<AzureServiceBusKeyVaultProperties>>>;
  requireInfrastructureEncryption?: Maybe<Scalars['Boolean']>;
};

export type AzureServiceBusIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userAssignedIdentities?: Maybe<Array<Maybe<AzureServiceBusUserAssignedIdentity>>>;
};

export type AzureServiceBusKeyVaultProperties = {
  id: Scalars['String'];
  keyName?: Maybe<Scalars['String']>;
  keyVaultUri?: Maybe<Scalars['String']>;
  keyVersion?: Maybe<Scalars['String']>;
  userAssignedIdentity?: Maybe<Scalars['String']>;
};

export type AzureServiceBusPrivateEndpointConnection = {
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastModifiedAt?: Maybe<Scalars['String']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedByType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  privateEndpointId?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionState?: Maybe<AzureServiceBusConnectionState>;
  provisioningState?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureServiceBusSku = {
  name?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureServiceBusUserAssignedIdentity = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<AzureSqlServerUserIdentity>;
};

export type AzureSqlServer = AzureResource & {
  adAdministrators?: Maybe<Array<Maybe<AzureSqlServerAdAdministrator>>>;
  administratorLogin?: Maybe<Scalars['String']>;
  administratorLoginPassword?: Maybe<Scalars['String']>;
  administrators?: Maybe<AzureSqlServerExternalAdministrator>;
  databaseSql?: Maybe<Array<Maybe<AzureDatabaseSql>>>;
  encryptionProtectors?: Maybe<Array<Maybe<AzureSqlServerEncryptionProtector>>>;
  federatedClientId?: Maybe<Scalars['String']>;
  firewallRules?: Maybe<Array<Maybe<AzureSqlServerFirewallRule>>>;
  fullyQualifiedDomainName?: Maybe<Scalars['String']>;
  identity?: Maybe<AzureSqlServerIdentity>;
  keyId?: Maybe<Scalars['String']>;
  minimalTlsVersion?: Maybe<Scalars['String']>;
  primaryUserAssignedIdentityId?: Maybe<Scalars['String']>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureSqlServerPrivateEndpointConnection>>>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  restrictOutboundNetworkAccess?: Maybe<Scalars['String']>;
  serverBlobAuditingPolicies?: Maybe<Array<Maybe<AzureSqlServerBlobAuditingPolicy>>>;
  serverSecurityAlertPolicies?: Maybe<Array<Maybe<AzureSqlServerSecurityAlertPolicy>>>;
  state?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  vulnerabilityAssessments?: Maybe<Array<Maybe<AzureSqlServerVulnerabilityAssessment>>>;
  workspaceFeature?: Maybe<Scalars['String']>;
};

export type AzureSqlServerAdAdministrator = {
  administratorType?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  login?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  sid?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureSqlServerBlobAuditingPolicy = {
  auditActionsAndGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  isAzureMonitorTargetEnabled?: Maybe<Scalars['Boolean']>;
  isDevopsAuditEnabled?: Maybe<Scalars['Boolean']>;
  isStorageSecondaryKeyInUse?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  queueDelayMs?: Maybe<Scalars['Int']>;
  retentionDays?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  storageAccountAccessKey?: Maybe<Scalars['String']>;
  storageAccountSubscriptionId?: Maybe<Scalars['String']>;
  storageEndpoint?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureSqlServerEncryptionProtector = {
  autoRotationEnabled?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  serverKeyName?: Maybe<Scalars['String']>;
  serverKeyType?: Maybe<Scalars['String']>;
  subregion?: Maybe<Scalars['String']>;
  thumbprint?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type AzureSqlServerExternalAdministrator = {
  administratorType?: Maybe<Scalars['String']>;
  azureADOnlyAuthentication?: Maybe<Scalars['Boolean']>;
  login?: Maybe<Scalars['String']>;
  principalType?: Maybe<Scalars['String']>;
  sid?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
};

export type AzureSqlServerFirewallRule = {
  endIpAddress?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  startIpAddress?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureSqlServerIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userAssignedIdentities?: Maybe<Array<Maybe<AzureSqlServerUserAssignedIdentity>>>;
};

export type AzureSqlServerPrivateEndpointConnection = {
  id: Scalars['String'];
  properties?: Maybe<AzureSqlServerPrivateEndpointConnectionProperties>;
};

export type AzureSqlServerPrivateEndpointConnectionProperties = {
  privateEndpointId?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionState?: Maybe<AzureSqlServerPrivateLinkServiceConnectionStateProperty>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureSqlServerPrivateLinkServiceConnectionStateProperty = {
  actionsRequired?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureSqlServerSecurityAlertPolicy = {
  creationTime?: Maybe<Scalars['String']>;
  disabledAlerts?: Maybe<Array<Maybe<Scalars['String']>>>;
  emailAccountAdmins?: Maybe<Scalars['Boolean']>;
  emailAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  retentionDays?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  storageAccountAccessKey?: Maybe<Scalars['String']>;
  storageEndpoint?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureSqlServerUserAssignedIdentity = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<AzureSqlServerUserIdentity>;
};

export type AzureSqlServerUserIdentity = {
  clientId?: Maybe<Scalars['String']>;
  principalId?: Maybe<Scalars['String']>;
};

export type AzureSqlServerVulnerabilityAssessment = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  recurringScans?: Maybe<AzureSqlServerVulnerabilityAssessmentRecurringScansProperties>;
  storageAccountAccessKey?: Maybe<Scalars['String']>;
  storageContainerPath?: Maybe<Scalars['String']>;
  storageContainerSasKey?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureSqlServerVulnerabilityAssessmentRecurringScansProperties = {
  emailSubscriptionAdmins?: Maybe<Scalars['Boolean']>;
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  isEnabled?: Maybe<Scalars['Boolean']>;
};

export type AzureSshConfiguration = {
  publicKeys?: Maybe<Array<Maybe<AzureSshPublicKey>>>;
};

export type AzureSshPublicKey = {
  id: Scalars['String'];
  keyData?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type AzureStorageAccount = AzureResource & {
  accessTier?: Maybe<Scalars['String']>;
  allowBlobPublicAccess?: Maybe<Scalars['String']>;
  allowSharedKeyAccess?: Maybe<Scalars['String']>;
  appServiceWebApp?: Maybe<Array<Maybe<AzureAppServiceWebApp>>>;
  azureFilesIdentityBasedAuthenticationADProperties?: Maybe<AzureFilesIdentityBasedAuthenticationAdProperties>;
  azureFilesIdentityBasedAuthenticationDirectoryServiceOptions?: Maybe<Scalars['String']>;
  blobServiceProperties?: Maybe<AzureStorageAccountServiceProperties>;
  customDomainName?: Maybe<Scalars['String']>;
  customDomainUseSubDomainName?: Maybe<Scalars['String']>;
  diagnosticSettings?: Maybe<Array<Maybe<AzureDiagnosticSetting>>>;
  enableHttpsTrafficOnly?: Maybe<Scalars['String']>;
  enableNfsV3?: Maybe<Scalars['String']>;
  encryptionKeySource?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyCurrentVersionedKeyIdentifier?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyKeyName?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyKeyVaultUri?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyKeyVersion?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyLastKeyRotationTimestamp?: Maybe<Scalars['String']>;
  encryptionRequireInfrastructureEncryption?: Maybe<Scalars['String']>;
  encryptionServiceBlob?: Maybe<AzureStorageAccountEncryptionService>;
  encryptionServiceFile?: Maybe<AzureStorageAccountEncryptionService>;
  encryptionServiceQueue?: Maybe<AzureStorageAccountEncryptionService>;
  encryptionServiceTable?: Maybe<AzureStorageAccountEncryptionService>;
  encryptionUserAssignedIdentity?: Maybe<Scalars['String']>;
  eventHubs?: Maybe<Array<Maybe<AzureEventHub>>>;
  extendedLocationName?: Maybe<Scalars['String']>;
  extendedLocationType?: Maybe<Scalars['String']>;
  failoverInProgress?: Maybe<Scalars['String']>;
  fileShares?: Maybe<Array<Maybe<AzureFileShare>>>;
  geoReplicationStatsCanFailover?: Maybe<Scalars['String']>;
  geoReplicationStatsLastSyncTime?: Maybe<Scalars['String']>;
  geoReplicationStatsStatus?: Maybe<Scalars['String']>;
  isHnsEnabled?: Maybe<Scalars['String']>;
  keyCreationTimeKey1?: Maybe<Scalars['String']>;
  keyCreationTimeKey2?: Maybe<Scalars['String']>;
  keyPolicyExpirationPeriodInDays?: Maybe<Scalars['Int']>;
  largeFileSharesState?: Maybe<Scalars['String']>;
  lastGeoFailoverTime?: Maybe<Scalars['String']>;
  logProfiles?: Maybe<Array<Maybe<AzureLogProfile>>>;
  minimumTlsVersion?: Maybe<Scalars['String']>;
  networkRuleIpRules?: Maybe<Array<Maybe<AzureStorageAccountIpRule>>>;
  networkRuleResourceAccessRules?: Maybe<Array<Maybe<AzureStorageAccountResourceAccessRule>>>;
  networkRuleSetByPass?: Maybe<Scalars['String']>;
  networkRuleSetDefaultAction?: Maybe<Scalars['String']>;
  networkRuleVirtualNetworkRules?: Maybe<Array<Maybe<AzureStorageAccountVirtualNetworkRule>>>;
  primaryEndpoints?: Maybe<AzureStorageAccountPrimaryEndpoints>;
  primaryInternetEndpoints?: Maybe<AzureStorageAccountPrimaryInternetEndpoints>;
  primaryLocation?: Maybe<Scalars['String']>;
  primaryMicrosoftEndpoints?: Maybe<AzureStorageAccountPrimaryMicrosoftEndpoints>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureStorageAccountPrivateEndpointConnection>>>;
  provisioningState?: Maybe<Scalars['String']>;
  queueServiceProperties?: Maybe<AzureStorageAccountQueueServiceProperties>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  routingPreferenceChoice?: Maybe<Scalars['String']>;
  routingPreferencePublishInternetEndpoints?: Maybe<Scalars['String']>;
  routingPreferencePublishMicrosoftEndpoints?: Maybe<Scalars['String']>;
  sasPolicyExpirationPeriod?: Maybe<Scalars['String']>;
  secondaryLocation?: Maybe<Scalars['String']>;
  statusOfPrimary?: Maybe<Scalars['String']>;
  statusOfSecondary?: Maybe<Scalars['String']>;
  storageContainers?: Maybe<Array<Maybe<AzureStorageContainer>>>;
};

export type AzureStorageAccountEncryptionService = {
  enabled?: Maybe<Scalars['String']>;
  keyType?: Maybe<Scalars['String']>;
  lastEnabledTime?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountIpRule = {
  action?: Maybe<Scalars['String']>;
  iPAddressOrRange?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type AzureStorageAccountPrimaryEndpoints = {
  blob?: Maybe<Scalars['String']>;
  dfs?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  queue?: Maybe<Scalars['String']>;
  table?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountPrimaryInternetEndpoints = {
  blob?: Maybe<Scalars['String']>;
  dfs?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountPrimaryMicrosoftEndpoints = {
  blob?: Maybe<Scalars['String']>;
  dfs?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  queue?: Maybe<Scalars['String']>;
  table?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountPrivateEndpointConnection = {
  id: Scalars['String'];
  privateEndpointId?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionStateActionRequired?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionStateDescription?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionStateStatus?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountQueueServiceProperties = {
  logging?: Maybe<AzureStorageAccountQueueServicePropertiesLogging>;
};

export type AzureStorageAccountQueueServicePropertiesLogging = {
  delete?: Maybe<Scalars['Boolean']>;
  read?: Maybe<Scalars['Boolean']>;
  retentionPolicyDays?: Maybe<Scalars['Int']>;
  retentionPolicyEnabled?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['String']>;
  write?: Maybe<Scalars['Boolean']>;
};

export type AzureStorageAccountResourceAccessRule = {
  id: Scalars['String'];
  resourceId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountServiceProperties = {
  corsRules?: Maybe<Array<Maybe<AzureStorageAccountServicePropertiesCorsRules>>>;
  deleteRetentionPolicyDays?: Maybe<Scalars['Int']>;
  deleteRetentionPolicyEnabled?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  skuName?: Maybe<Scalars['String']>;
  skuTier?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountServicePropertiesCorsRules = {
  allowedHeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  allowedMethods?: Maybe<Array<Maybe<Scalars['String']>>>;
  allowedOrigins?: Maybe<Array<Maybe<Scalars['String']>>>;
  exposedHeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  maxAgeInSeconds?: Maybe<Scalars['Int']>;
};

export type AzureStorageAccountVirtualNetworkRule = {
  action?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  virtualNetworkResourceId?: Maybe<Scalars['String']>;
};

export type AzureStorageBlob = AzureResource & {
  deleted?: Maybe<Scalars['String']>;
  hasVersionsOnly?: Maybe<Scalars['Boolean']>;
  isCurrentVersion?: Maybe<Scalars['Boolean']>;
  objectReplicationSourceProperties?: Maybe<Array<Maybe<AzureStorageBlobReplicationPolicy>>>;
  properties?: Maybe<AzureStorageBlobProperties>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  snapshot?: Maybe<Scalars['String']>;
  storageContainer?: Maybe<Array<Maybe<AzureStorageContainer>>>;
  versionId?: Maybe<Scalars['String']>;
};

export type AzureStorageBlobProperties = {
  accessTier?: Maybe<Scalars['String']>;
  accessTierChangedOn?: Maybe<Scalars['String']>;
  accessTierInferred?: Maybe<Scalars['Boolean']>;
  archiveStatus?: Maybe<Scalars['String']>;
  blobSequenceNumber?: Maybe<Scalars['Int']>;
  blobType?: Maybe<Scalars['String']>;
  cacheControl?: Maybe<Scalars['String']>;
  contentCRC64?: Maybe<Scalars['String']>;
  contentDisposition?: Maybe<Scalars['String']>;
  contentEncoding?: Maybe<Scalars['String']>;
  contentLanguage?: Maybe<Scalars['String']>;
  contentLength?: Maybe<Scalars['Int']>;
  contentType?: Maybe<Scalars['String']>;
  copyCompletedOn?: Maybe<Scalars['String']>;
  copyId?: Maybe<Scalars['String']>;
  copyProgress?: Maybe<Scalars['String']>;
  copySource?: Maybe<Scalars['String']>;
  copyStatus?: Maybe<Scalars['String']>;
  copyStatusDescription?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['String']>;
  customerProvidedKeySha256?: Maybe<Scalars['String']>;
  deletedOn?: Maybe<Scalars['String']>;
  destinationSnapshot?: Maybe<Scalars['String']>;
  encryptionScope?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  expiresOn?: Maybe<Scalars['String']>;
  immutabilityPolicyExpiresOn?: Maybe<Scalars['String']>;
  immutabilityPolicyMode?: Maybe<Scalars['String']>;
  incrementalCopy?: Maybe<Scalars['Boolean']>;
  isSealed?: Maybe<Scalars['Boolean']>;
  lastAccessedOn?: Maybe<Scalars['String']>;
  lastModified?: Maybe<Scalars['String']>;
  leaseDuration?: Maybe<Scalars['String']>;
  leaseState?: Maybe<Scalars['String']>;
  leaseStatus?: Maybe<Scalars['String']>;
  legalHold?: Maybe<Scalars['Boolean']>;
  rehydratePriority?: Maybe<Scalars['String']>;
  remainingRetentionDays?: Maybe<Scalars['Int']>;
  serverEncrypted?: Maybe<Scalars['Boolean']>;
  tagCount?: Maybe<Scalars['Int']>;
};

export type AzureStorageBlobReplicationPolicy = {
  id: Scalars['String'];
  policyId?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<Maybe<AzureStorageBlobReplicationRule>>>;
};

export type AzureStorageBlobReplicationRule = {
  replicationStatus?: Maybe<Scalars['String']>;
  ruleId: Scalars['String'];
};

export type AzureStorageContainer = AzureResource & {
  deleted?: Maybe<Scalars['String']>;
  deletedTime?: Maybe<Scalars['String']>;
  denyEncryptionScopeOverride?: Maybe<Scalars['String']>;
  hasImmutabilityPolicy?: Maybe<Scalars['String']>;
  hasLegalHold?: Maybe<Scalars['String']>;
  immutabilityPolicyAllowProtectedAppendWrites?: Maybe<Scalars['String']>;
  immutabilityPolicyPeriodSinceCreationInDays?: Maybe<Scalars['Int']>;
  immutabilityPolicyState?: Maybe<Scalars['String']>;
  immutabilityPolicyUpdateHistory?: Maybe<Array<Maybe<AzureStorageContainerImmutabilityPolicyUpdateHistory>>>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  leaseDuration?: Maybe<Scalars['String']>;
  leaseStatus?: Maybe<Scalars['String']>;
  legalHoldTags?: Maybe<Array<Maybe<AzureStorageContainerLegalHoldTag>>>;
  publicAccess?: Maybe<Scalars['String']>;
  remainingRetentionDays?: Maybe<Scalars['Int']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  storageAccount?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  storageBlobs?: Maybe<Array<Maybe<AzureStorageBlob>>>;
  version?: Maybe<Scalars['String']>;
};

export type AzureStorageContainerImmutabilityPolicyUpdateHistory = {
  id: Scalars['String'];
  immutabilityPeriodSinceCreationInDays?: Maybe<Scalars['Int']>;
  objectIdentifier?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
  update?: Maybe<Scalars['String']>;
  upn?: Maybe<Scalars['String']>;
};

export type AzureStorageContainerLegalHoldTag = {
  id: Scalars['String'];
  objectIdentifier?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
  upn?: Maybe<Scalars['String']>;
};

export type AzureSubResource = {
  id: Scalars['String'];
};

export type AzureSubscription = AzureBaseResource & {
  actionGroups?: Maybe<Array<Maybe<AzureActionGroup>>>;
  activityLogAlerts?: Maybe<Array<Maybe<AzureActivityLogAlert>>>;
  aksManagedClusters?: Maybe<Array<Maybe<AzureAksManagedCluster>>>;
  appInsights?: Maybe<Array<Maybe<AzureAppInsights>>>;
  appServiceEnvironments?: Maybe<Array<Maybe<AzureAppServiceEnvironment>>>;
  appServicePlans?: Maybe<Array<Maybe<AzureAppServicePlan>>>;
  appServiceWebApps?: Maybe<Array<Maybe<AzureAppServiceWebApp>>>;
  arcConnectedClusters?: Maybe<Array<Maybe<AzureArcConnectedCluster>>>;
  authRoleAssignments?: Maybe<Array<Maybe<AzureAuthRoleAssignment>>>;
  authRoleDefinitions?: Maybe<Array<Maybe<AzureAuthRoleDefinition>>>;
  autoProvisioningSettings?: Maybe<Array<Maybe<AzureAutoProvisioningSetting>>>;
  backupInstances?: Maybe<Array<Maybe<AzureBackupInstance>>>;
  backupPolicies?: Maybe<Array<Maybe<AzureBackupPolicy>>>;
  backupVaults?: Maybe<Array<Maybe<AzureBackupVault>>>;
  billing?: Maybe<Array<Maybe<AzureBilling>>>;
  cdnCustomDomains?: Maybe<Array<Maybe<AzureCdnCustomDomain>>>;
  cdnEndpoints?: Maybe<Array<Maybe<AzureCdnEndpoint>>>;
  cdnOriginGroups?: Maybe<Array<Maybe<AzureCdnOriginGroup>>>;
  cdnOrigins?: Maybe<Array<Maybe<AzureCdnOrigin>>>;
  cdnProfiles?: Maybe<Array<Maybe<AzureCdnProfile>>>;
  cognitiveServicesAccounts?: Maybe<Array<Maybe<AzureCognitiveServicesAccount>>>;
  containerRegistries?: Maybe<Array<Maybe<AzureContainerRegistry>>>;
  cosmosDbs?: Maybe<Array<Maybe<AzureCosmosDb>>>;
  dataCollectionRules?: Maybe<Array<Maybe<AzureDataCollectionRule>>>;
  dataFactories?: Maybe<Array<Maybe<AzureDataFactory>>>;
  dataLakeStorageAccounts?: Maybe<Array<Maybe<AzureDataLakeStorageAccount>>>;
  databaseManagedSqlInstances?: Maybe<Array<Maybe<AzureDatabaseManagedSqlInstance>>>;
  databaseMySql?: Maybe<Array<Maybe<AzureDatabaseMySql>>>;
  databasePostgreSql?: Maybe<Array<Maybe<AzureDatabasePostgreSql>>>;
  databaseSql?: Maybe<Array<Maybe<AzureDatabaseSql>>>;
  databaseSqlVm?: Maybe<Array<Maybe<AzureDatabaseSqlVm>>>;
  diagnosticSettings?: Maybe<Array<Maybe<AzureDiagnosticSetting>>>;
  disks?: Maybe<Array<Maybe<AzureDisk>>>;
  dnsZoneRecordSets?: Maybe<Array<Maybe<AzureDnsZoneRecordSet>>>;
  dnsZones?: Maybe<Array<Maybe<AzureDnsZone>>>;
  eventGrids?: Maybe<Array<Maybe<AzureEventGrid>>>;
  eventHubs?: Maybe<Array<Maybe<AzureEventHub>>>;
  expressRouteGateways?: Maybe<Array<Maybe<AzureExpressRouteGateway>>>;
  fileShares?: Maybe<Array<Maybe<AzureFileShare>>>;
  firewalls?: Maybe<Array<Maybe<AzureFirewall>>>;
  functionApps?: Maybe<Array<Maybe<AzureFunctionApp>>>;
  integrationRuntimes?: Maybe<Array<Maybe<AzureIntegrationRuntime>>>;
  keyVaults?: Maybe<Array<Maybe<AzureKeyVault>>>;
  loadBalancers?: Maybe<Array<Maybe<AzureLoadBalancer>>>;
  logAnalyticsSolutions?: Maybe<Array<Maybe<AzureLogAnalyticsSolution>>>;
  logAnalyticsWorkspaces?: Maybe<Array<Maybe<AzureLogAnalyticsWorkspace>>>;
  logProfiles?: Maybe<Array<Maybe<AzureLogProfile>>>;
  machineLearningWorkspaces?: Maybe<Array<Maybe<AzureMachineLearningWorkspace>>>;
  metricAlerts?: Maybe<Array<Maybe<AzureMetricAlert>>>;
  mySqlServers?: Maybe<Array<Maybe<AzureMySqlServer>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  networkSecurityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroup>>>;
  policyAssignments?: Maybe<Array<Maybe<AzurePolicyAssignment>>>;
  postgreSqlServers?: Maybe<Array<Maybe<AzurePostgreSqlServer>>>;
  privateDnsZones?: Maybe<Array<Maybe<AzurePrivateDnsZone>>>;
  publicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  recoveryInstances?: Maybe<Array<Maybe<AzureRecoveryInstance>>>;
  recoveryPolicies?: Maybe<Array<Maybe<AzureRecoveryPolicy>>>;
  recoveryVaults?: Maybe<Array<Maybe<AzureRecoveryVault>>>;
  redisCaches?: Maybe<Array<Maybe<AzureRedisCache>>>;
  regions?: Maybe<Array<Maybe<Scalars['String']>>>;
  replicationAppliances?: Maybe<Array<Maybe<AzureReplicationAppliance>>>;
  replicationCenters?: Maybe<Array<Maybe<AzureReplicationCenter>>>;
  replicationNetworks?: Maybe<Array<Maybe<AzureReplicationNetwork>>>;
  replicationPolicies?: Maybe<Array<Maybe<AzureReplicationPolicy>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  securityAssesments?: Maybe<Array<Maybe<AzureSecurityAssesment>>>;
  securityContacts?: Maybe<Array<Maybe<AzureSecurityContact>>>;
  securityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroup>>>;
  securityPricings?: Maybe<Array<Maybe<AzureSecurityPricing>>>;
  securitySettings?: Maybe<Array<Maybe<AzureSecuritySetting>>>;
  serviceBuses?: Maybe<Array<Maybe<AzureServiceBus>>>;
  sqlServers?: Maybe<Array<Maybe<AzureSqlServer>>>;
  storageAccounts?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  storageBlobs?: Maybe<Array<Maybe<AzureStorageBlob>>>;
  storageContainers?: Maybe<Array<Maybe<AzureStorageContainer>>>;
  synapseBigDataPools?: Maybe<Array<Maybe<AzureSynapseBigDataPool>>>;
  synapseSqlPools?: Maybe<Array<Maybe<AzureSynapseSqlPool>>>;
  synapseWorkspaces?: Maybe<Array<Maybe<AzureSynapseWorkspace>>>;
  trafficManagerProfiles?: Maybe<Array<Maybe<AzureTrafficManagerProfile>>>;
  virtualMachineScaleSets?: Maybe<Array<Maybe<AzureVirtualMachineScaleSet>>>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
};

export type AzureSynapseBigDataPool = AzureResource & {
  autoPause?: Maybe<AzureSynapseBigDataPoolAutoPauseProperties>;
  autoScale?: Maybe<AzureSynapseBigDataPoolAutoScaleProperties>;
  cacheSize?: Maybe<Scalars['Int']>;
  creationDate?: Maybe<Scalars['String']>;
  customLibraries?: Maybe<Array<Maybe<AzureSynapseBigDataPoolLibraryInfo>>>;
  defaultSparkLogFolder?: Maybe<Scalars['String']>;
  dynamicExecutorAllocation?: Maybe<AzureSynapseBigDataPoolDynamicExecutorAllocation>;
  isComputeIsolationEnabled?: Maybe<Scalars['Boolean']>;
  lastSucceededTimestamp?: Maybe<Scalars['String']>;
  libraryRequirements?: Maybe<AzureSynapseBigDataPoolLibraryRequirements>;
  nodeCount?: Maybe<Scalars['Int']>;
  nodeSize?: Maybe<Scalars['String']>;
  nodeSizeFamily?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  sessionLevelPackagesEnabled?: Maybe<Scalars['Boolean']>;
  sparkConfigProperties?: Maybe<AzureSynapseBigDataPoolSparkConfigProperties>;
  sparkEventsFolder?: Maybe<Scalars['String']>;
  sparkVersion?: Maybe<Scalars['String']>;
  synapseWorkspace?: Maybe<Array<Maybe<AzureSynapseWorkspace>>>;
};

export type AzureSynapseBigDataPoolAutoPauseProperties = {
  delayInMinutes?: Maybe<Scalars['Int']>;
  enabled?: Maybe<Scalars['Boolean']>;
};

export type AzureSynapseBigDataPoolAutoScaleProperties = {
  enabled?: Maybe<Scalars['Boolean']>;
  maxNodeCount?: Maybe<Scalars['Int']>;
  minNodeCount?: Maybe<Scalars['Int']>;
};

export type AzureSynapseBigDataPoolDynamicExecutorAllocation = {
  enabled?: Maybe<Scalars['Boolean']>;
  maxExecutors?: Maybe<Scalars['Int']>;
  minExecutors?: Maybe<Scalars['Int']>;
};

export type AzureSynapseBigDataPoolLibraryInfo = {
  containerName?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  provisioningStatus?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uploadedTimestamp?: Maybe<Scalars['String']>;
};

export type AzureSynapseBigDataPoolLibraryRequirements = {
  content?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

export type AzureSynapseBigDataPoolSparkConfigProperties = {
  configurationType?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

export type AzureSynapseSqlPool = AzureResource & {
  collation?: Maybe<Scalars['String']>;
  createMode?: Maybe<Scalars['String']>;
  creationDate?: Maybe<Scalars['String']>;
  maxSizeBytes?: Maybe<Scalars['Float']>;
  provisioningState?: Maybe<Scalars['String']>;
  recoverableDatabaseId?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  restorePointInTime?: Maybe<Scalars['String']>;
  sku?: Maybe<AzureSynapseSqlPoolSku>;
  sourceDatabaseDeletionDate?: Maybe<Scalars['String']>;
  sourceDatabaseId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  storageAccountType?: Maybe<Scalars['String']>;
  synapseWorkspace?: Maybe<Array<Maybe<AzureSynapseWorkspace>>>;
};

export type AzureSynapseSqlPoolSku = {
  capacity?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspace = AzureResource & {
  adlaResourceId?: Maybe<Scalars['String']>;
  azureADOnlyAuthentication?: Maybe<Scalars['Boolean']>;
  cspWorkspaceAdminProperties?: Maybe<AzureSynapseWorkspaceCspWorkspaceAdminProperties>;
  defaultDataLakeStorage?: Maybe<AzureSynapseWorkspaceDataLakeStorageAccountDetails>;
  encryption?: Maybe<AzureSynapseWorkspaceEncryptionDetails>;
  identity?: Maybe<AzureSynapseWorkspaceManagedIdentity>;
  managedResourceGroupName?: Maybe<Scalars['String']>;
  managedVirtualNetwork?: Maybe<Scalars['String']>;
  managedVirtualNetworkSettings?: Maybe<AzureSynapseWorkspaceManagedVirtualNetworkSettings>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureSynapseWorkspacePrivateEndpointConnection>>>;
  provisioningState?: Maybe<Scalars['String']>;
  publicNetworkAccess?: Maybe<Scalars['String']>;
  purviewConfiguration?: Maybe<AzureSynapseWorkspacePurviewConfiguration>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  sqlAdministratorLogin?: Maybe<Scalars['String']>;
  sqlAdministratorLoginPassword?: Maybe<Scalars['String']>;
  synapseBigDataPools?: Maybe<Array<Maybe<AzureSynapseBigDataPool>>>;
  synapseSqlPools?: Maybe<Array<Maybe<AzureSynapseSqlPool>>>;
  trustedServiceBypassEnabled?: Maybe<Scalars['Boolean']>;
  virtualNetworkProfile?: Maybe<AzureSynapseWorkspaceVirtualNetworkProfile>;
  workspaceRepositoryConfiguration?: Maybe<AzureSynapseWorkspaceWorkspaceRepositoryConfiguration>;
  workspaceUID?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspaceCspWorkspaceAdminProperties = {
  initialWorkspaceAdminObjectId?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspaceCustomerManagedKeyDetails = {
  kekIdentity?: Maybe<AzureSynapseWorkspaceKekIdentityProperties>;
  key?: Maybe<AzureSynapseWorkspaceWorkspaceKeyDetails>;
  status?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspaceDataLakeStorageAccountDetails = {
  accountUrl?: Maybe<Scalars['String']>;
  createManagedPrivateEndpoint?: Maybe<Scalars['Boolean']>;
  filesystem?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspaceEncryptionDetails = {
  cmk?: Maybe<AzureSynapseWorkspaceCustomerManagedKeyDetails>;
  doubleEncryptionEnabled?: Maybe<Scalars['Boolean']>;
};

export type AzureSynapseWorkspaceKekIdentityProperties = {
  useSystemAssignedIdentity?: Maybe<Scalars['Boolean']>;
  userAssignedIdentity?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspaceManagedIdentity = {
  principalId?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userAssignedIdentities?: Maybe<Array<Maybe<AzureSynapseWorkspaceUserAssignedIdentities>>>;
};

export type AzureSynapseWorkspaceManagedVirtualNetworkSettings = {
  allowedAadTenantIdsForLinking?: Maybe<Array<Maybe<Scalars['String']>>>;
  linkedAccessCheckOnTargetResource?: Maybe<Scalars['Boolean']>;
  preventDataExfiltration?: Maybe<Scalars['Boolean']>;
};

export type AzureSynapseWorkspacePrivateEndpoint = {
  id?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspacePrivateEndpointConnection = {
  id: Scalars['String'];
  privateEndpoint?: Maybe<AzureSynapseWorkspacePrivateEndpoint>;
  privateLinkServiceConnectionState?: Maybe<AzureSynapseWorkspacePrivateLinkServiceConnectionState>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspacePrivateLinkServiceConnectionState = {
  actionsRequired?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspacePurviewConfiguration = {
  purviewResourceId?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspaceUserAssignedIdentities = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<AzureSynapseWorkspaceUserAssignedManagedIdentity>;
};

export type AzureSynapseWorkspaceUserAssignedManagedIdentity = {
  clientId?: Maybe<Scalars['String']>;
  principalId?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspaceVirtualNetworkProfile = {
  computeSubnetId?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspaceWorkspaceKeyDetails = {
  keyVaultUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AzureSynapseWorkspaceWorkspaceRepositoryConfiguration = {
  accountName?: Maybe<Scalars['String']>;
  collaborationBranch?: Maybe<Scalars['String']>;
  hostName?: Maybe<Scalars['String']>;
  lastCommitId?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  repositoryName?: Maybe<Scalars['String']>;
  rootFolder?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureTag = {
  actionGroups?: Maybe<Array<Maybe<AzureActionGroup>>>;
  activityLogAlerts?: Maybe<Array<Maybe<AzureActivityLogAlert>>>;
  adApplications?: Maybe<Array<Maybe<AzureAdApplication>>>;
  adServicePrincipals?: Maybe<Array<Maybe<AzureAdServicePrincipal>>>;
  aksManagedClusters?: Maybe<Array<Maybe<AzureAksManagedCluster>>>;
  appInsights?: Maybe<Array<Maybe<AzureAppInsights>>>;
  appServiceEnvironments?: Maybe<Array<Maybe<AzureAppServiceEnvironment>>>;
  appServicePlans?: Maybe<Array<Maybe<AzureAppServicePlan>>>;
  appServiceWebApps?: Maybe<Array<Maybe<AzureAppServiceWebApp>>>;
  arcConnectedClusters?: Maybe<Array<Maybe<AzureArcConnectedCluster>>>;
  backupVauls?: Maybe<Array<Maybe<AzureBackupVault>>>;
  cdnEndpoints?: Maybe<Array<Maybe<AzureCdnEndpoint>>>;
  cdnProfiles?: Maybe<Array<Maybe<AzureCdnProfile>>>;
  cognitiveServicesAccounts?: Maybe<Array<Maybe<AzureCognitiveServicesAccount>>>;
  containerRegistries?: Maybe<Array<Maybe<AzureContainerRegistry>>>;
  cosmosDb?: Maybe<Array<Maybe<AzureCosmosDb>>>;
  dataCollectionRules?: Maybe<Array<Maybe<AzureDataCollectionRule>>>;
  dataFactories?: Maybe<Array<Maybe<AzureDataFactory>>>;
  databaseManagedSqlInstances?: Maybe<Array<Maybe<AzureDatabaseManagedSqlInstance>>>;
  disks?: Maybe<Array<Maybe<AzureDisk>>>;
  dns?: Maybe<Array<Maybe<AzureDnsZone>>>;
  expressRouteGateways?: Maybe<Array<Maybe<AzureExpressRouteGateway>>>;
  firewalls?: Maybe<Array<Maybe<AzureFirewall>>>;
  functionApps?: Maybe<Array<Maybe<AzureFunctionApp>>>;
  id: Scalars['String'];
  key: Scalars['String'];
  keyVaults?: Maybe<Array<Maybe<AzureKeyVault>>>;
  loadBalancers?: Maybe<Array<Maybe<AzureLoadBalancer>>>;
  logAnalyticsSolutions?: Maybe<Array<Maybe<AzureLogAnalyticsSolution>>>;
  logAnalyticsWorkspaces?: Maybe<Array<Maybe<AzureLogAnalyticsWorkspace>>>;
  logProfiles?: Maybe<Array<Maybe<AzureLogProfile>>>;
  machineLearningWorkspaces?: Maybe<Array<Maybe<AzureMachineLearningWorkspace>>>;
  metricAlerts?: Maybe<Array<Maybe<AzureMetricAlert>>>;
  mySqlServers?: Maybe<Array<Maybe<AzureMySqlServer>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  postgreSqlServers?: Maybe<Array<Maybe<AzurePostgreSqlServer>>>;
  privateDns?: Maybe<Array<Maybe<AzurePrivateDnsZone>>>;
  publicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  recoveryVaults?: Maybe<Array<Maybe<AzureRecoveryVault>>>;
  redisCaches?: Maybe<Array<Maybe<AzureRedisCache>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  securityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroup>>>;
  serviceBus?: Maybe<Array<Maybe<AzureServiceBus>>>;
  sqlServers?: Maybe<Array<Maybe<AzureSqlServer>>>;
  storageAccounts?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  synapseBigDataPools?: Maybe<Array<Maybe<AzureSynapseBigDataPool>>>;
  synapseSqlPools?: Maybe<Array<Maybe<AzureSynapseSqlPool>>>;
  synapseWorkspaces?: Maybe<Array<Maybe<AzureSynapseWorkspace>>>;
  trafficManagerProfiles?: Maybe<Array<Maybe<AzureTrafficManagerProfile>>>;
  value: Scalars['String'];
  virtualMachineScaleSets?: Maybe<Array<Maybe<AzureVirtualMachineScaleSet>>>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
};

export type AzureTrafficManagerProfile = AzureResource & {
  allowedEndpointRecordTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  dnsConfig?: Maybe<AzureTrafficManagerProfileDnsConfig>;
  endpoints?: Maybe<Array<Maybe<AzureTrafficManagerProfileEndpoint>>>;
  maxReturn?: Maybe<Scalars['Int']>;
  monitorConfig?: Maybe<AzureTrafficManagerProfileMonitorConfig>;
  profileStatus?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  trafficRoutingMethod?: Maybe<Scalars['String']>;
  trafficViewEnrollmentStatus?: Maybe<Scalars['String']>;
};

export type AzureTrafficManagerProfileCustomHeadersItem = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureTrafficManagerProfileDnsConfig = {
  fqdn?: Maybe<Scalars['String']>;
  relativeName?: Maybe<Scalars['String']>;
  ttl?: Maybe<Scalars['Int']>;
};

export type AzureTrafficManagerProfileEndpoint = {
  customHeaders?: Maybe<Array<Maybe<AzureTrafficManagerProfileCustomHeadersItem>>>;
  endpointLocation?: Maybe<Scalars['String']>;
  endpointMonitorStatus?: Maybe<Scalars['String']>;
  endpointStatus?: Maybe<Scalars['String']>;
  geoMapping?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  minChildEndpoints?: Maybe<Scalars['Int']>;
  minChildEndpointsIPv4?: Maybe<Scalars['Int']>;
  minChildEndpointsIPv6?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['Int']>;
  subnets?: Maybe<Array<Maybe<AzureTrafficManagerProfileEndpointPropertiesSubnetsItem>>>;
  target?: Maybe<Scalars['String']>;
  targetResourceId?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type AzureTrafficManagerProfileEndpointPropertiesSubnetsItem = {
  first?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  last?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['Int']>;
};

export type AzureTrafficManagerProfileMonitorConfig = {
  customHeaders?: Maybe<Array<Maybe<AzureTrafficManagerProfileCustomHeadersItem>>>;
  expectedStatusCodeRanges?: Maybe<Array<Maybe<AzureTrafficManagerProfileMonitorConfigExpectedStatusCodeRangesItem>>>;
  intervalInSeconds?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
  profileMonitorStatus?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['String']>;
  timeoutInSeconds?: Maybe<Scalars['Int']>;
  toleratedNumberOfFailures?: Maybe<Scalars['Int']>;
};

export type AzureTrafficManagerProfileMonitorConfigExpectedStatusCodeRangesItem = {
  id: Scalars['String'];
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
};

export type AzureVaultCertificate = {
  certificateStore?: Maybe<Scalars['String']>;
  certificateUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type AzureVaultSecretGroup = {
  id: Scalars['String'];
  sourceVault?: Maybe<AzureSubResource>;
  vaultCertificates?: Maybe<Array<Maybe<AzureVaultCertificate>>>;
};

export type AzureVirtualMachine = AzureResource & {
  bootDiagnostics?: Maybe<Scalars['Boolean']>;
  disks?: Maybe<Array<Maybe<AzureDisk>>>;
  licenseType?: Maybe<Scalars['String']>;
  managedBy?: Maybe<Scalars['String']>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  osProfile?: Maybe<AzureVirtualMachineOsProfile>;
  osType?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  storageImageReference?: Maybe<AzureVirtualMachineStorageImageReference>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
  vmSize?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineOsProfile = {
  allowExtensionOperations?: Maybe<Scalars['Boolean']>;
  computerName?: Maybe<Scalars['String']>;
  linuxConfiguration?: Maybe<AzureVirtualMachineOsProfileLinuxConfiguration>;
  requireGuestProvisionSignal?: Maybe<Scalars['Boolean']>;
  windowsConfiguration?: Maybe<AzureVirtualMachineOsProfileWindowsConfiguration>;
};

export type AzureVirtualMachineOsProfileLinuxConfiguration = {
  disablePasswordAuthentication?: Maybe<Scalars['Boolean']>;
  provisionVMAgent?: Maybe<Scalars['Boolean']>;
};

export type AzureVirtualMachineOsProfileWindowsConfiguration = {
  enableAutomaticUpdates?: Maybe<Scalars['Boolean']>;
  provisionVMAgent?: Maybe<Scalars['Boolean']>;
  timeZone?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSet = AzureResource & {
  doNotRunExtensionsOnOverprovisionedVMs?: Maybe<Scalars['Boolean']>;
  overprovision?: Maybe<Scalars['Boolean']>;
  platformFaultDomainCount?: Maybe<Scalars['Int']>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  scaleInPolicy?: Maybe<AzureVirtualMachineScaleSetScaleInPolicy>;
  singlePlacementGroup?: Maybe<Scalars['Boolean']>;
  uniqueId?: Maybe<Scalars['String']>;
  virtualMachineProfile?: Maybe<AzureVirtualMachineScaleSetProfile>;
};

export type AzureVirtualMachineScaleSetDiagnosticsProfile = {
  bootDiagnostics?: Maybe<AzureVirtualMachineScaleSetDiagnosticsProfileBoot>;
};

export type AzureVirtualMachineScaleSetDiagnosticsProfileBoot = {
  enabled?: Maybe<Scalars['Boolean']>;
};

export type AzureVirtualMachineScaleSetExtension = {
  autoUpgradeMinorVersion?: Maybe<Scalars['Boolean']>;
  enableAutomaticUpgrade?: Maybe<Scalars['Boolean']>;
  forceUpdateTag?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  provisionAfterExtensions?: Maybe<Array<Maybe<Scalars['String']>>>;
  provisioningState?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  typeHandlerVersion?: Maybe<Scalars['String']>;
  typePropertiesType?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetExtensionProfile = {
  extensions?: Maybe<Array<Maybe<AzureVirtualMachineScaleSetExtension>>>;
};

export type AzureVirtualMachineScaleSetIpTag = {
  ipTagType?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetNetworkIpConfiguration = {
  applicationGatewayBackendAddressPools?: Maybe<Array<Maybe<AzureSubResource>>>;
  applicationSecurityGroups?: Maybe<Array<Maybe<AzureSubResource>>>;
  id: Scalars['String'];
  loadBalancerBackendAddressPools?: Maybe<Array<Maybe<AzureSubResource>>>;
  loadBalancerInboundNatPools?: Maybe<Array<Maybe<AzureSubResource>>>;
  name?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  privateIPAddressVersion?: Maybe<Scalars['String']>;
  subnetId?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetNetworkProfile = {
  networkInterfaceConfigurations?: Maybe<Array<Maybe<AzureVirtualMachineScaleSetNetworkProfileConfiguration>>>;
};

export type AzureVirtualMachineScaleSetNetworkProfileConfiguration = {
  deleteOption?: Maybe<Scalars['String']>;
  dnsSettings?: Maybe<AzureVirtualMachineScaleSetNetworkProfileConfigurationDnsSettings>;
  enableAcceleratedNetworking?: Maybe<Scalars['Boolean']>;
  enableFpga?: Maybe<Scalars['Boolean']>;
  enableIPForwarding?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  ipConfigurations?: Maybe<Array<Maybe<AzureVirtualMachineScaleSetNetworkIpConfiguration>>>;
  name?: Maybe<Scalars['String']>;
  networkSecurityGroup?: Maybe<AzureSubResource>;
  primary?: Maybe<Scalars['Boolean']>;
};

export type AzureVirtualMachineScaleSetNetworkProfileConfigurationDnsSettings = {
  dnsServers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureVirtualMachineScaleSetNetworkPublicIpAddresssConfiguration = {
  deleteOption?: Maybe<Scalars['String']>;
  dnsSettings?: Maybe<AzureVirtualMachineScaleSetPublicIpAddressConfigurationDnsSettings>;
  idleTimeoutInMinutes?: Maybe<Scalars['Int']>;
  ipTags?: Maybe<Array<Maybe<AzureVirtualMachineScaleSetIpTag>>>;
  name?: Maybe<Scalars['String']>;
  publicIPAddressVersion?: Maybe<Scalars['String']>;
  publicIPPrefix?: Maybe<AzureSubResource>;
};

export type AzureVirtualMachineScaleSetOsProfile = {
  adminUsername?: Maybe<Scalars['String']>;
  allowExtensionOperations?: Maybe<Scalars['Boolean']>;
  computerNamePrefix?: Maybe<Scalars['String']>;
  linuxConfiguration?: Maybe<AzureVirtualMachineScaleSetOsProfileLinuxConfiguration>;
  secrets?: Maybe<Array<Maybe<AzureVaultSecretGroup>>>;
  windowsConfiguration?: Maybe<AzureVirtualMachineScaleSetOsProfileWindowsConfiguration>;
};

export type AzureVirtualMachineScaleSetOsProfileLinuxConfiguration = {
  disablePasswordAuthentication?: Maybe<Scalars['Boolean']>;
  provisionVMAgent?: Maybe<Scalars['Boolean']>;
  ssh?: Maybe<AzureSshConfiguration>;
};

export type AzureVirtualMachineScaleSetOsProfileWindowsConfiguration = {
  enableAutomaticUpdates?: Maybe<Scalars['Boolean']>;
  provisionVMAgent?: Maybe<Scalars['Boolean']>;
  ssh?: Maybe<AzureSshConfiguration>;
  timeZone?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetProfile = {
  diagnosticsProfile?: Maybe<AzureVirtualMachineScaleSetDiagnosticsProfile>;
  extensionProfile?: Maybe<AzureVirtualMachineScaleSetExtensionProfile>;
  networkProfile?: Maybe<AzureVirtualMachineScaleSetNetworkProfile>;
  osProfile?: Maybe<AzureVirtualMachineScaleSetOsProfile>;
  storageProfile?: Maybe<AzureVirtualMachineScaleSetStorageProfile>;
};

export type AzureVirtualMachineScaleSetPublicIpAddressConfigurationDnsSettings = {
  domainNameLabel?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetScaleInPolicy = {
  rules?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureVirtualMachineScaleSetStorageProfile = {
  imageReference?: Maybe<AzureVirtualMachineScaleSetStorageProfileImageReference>;
  osDisk?: Maybe<AzureVirtualMachineScaleSetStorageProfileOsDisk>;
};

export type AzureVirtualMachineScaleSetStorageProfileImageReference = {
  id?: Maybe<Scalars['String']>;
  offer?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetStorageProfileManagedDisk = {
  storageAccountType?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetStorageProfileOsDisk = {
  caching?: Maybe<Scalars['String']>;
  createOption?: Maybe<Scalars['String']>;
  diskSizeGB?: Maybe<Scalars['Int']>;
  managedDisk?: Maybe<AzureVirtualMachineScaleSetStorageProfileManagedDisk>;
  osType?: Maybe<Scalars['String']>;
  writeAcceleratorEnabled?: Maybe<Scalars['Boolean']>;
};

export type AzureVirtualMachineScaleSetSubResource = {
  id: Scalars['String'];
};

export type AzureVirtualMachineStorageImageReference = {
  exactVersion?: Maybe<Scalars['String']>;
  offer?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  sharedGalleryImageId?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type AzureVirtualNetwork = AzureResource & {
  addressSpacePrefixes?: Maybe<Array<Maybe<Scalars['String']>>>;
  appServiceEnvironments?: Maybe<Array<Maybe<AzureAppServiceEnvironment>>>;
  ddosProtectionPlans?: Maybe<Array<Maybe<AzureVirtualNetworkDdosProtectionPlan>>>;
  dnsServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  enableDdosProtection?: Maybe<Scalars['Boolean']>;
  enableVmProtection?: Maybe<Scalars['Boolean']>;
  firewalls?: Maybe<Array<Maybe<AzureFirewall>>>;
  flowTimeoutInMinutes?: Maybe<Scalars['Int']>;
  lbVirtualNetworkOf?: Maybe<Array<Maybe<AzureLoadBalancer>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  resourceGuid?: Maybe<Scalars['String']>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
};

export type AzureVirtualNetworkDdosProtectionPlan = AzureBaseResource & {
  etag?: Maybe<Scalars['String']>;
  resourceGuid?: Maybe<Scalars['String']>;
};

export type AzureWebSiteFunction = AzureBaseResource & {
  configHref?: Maybe<Scalars['String']>;
  functionAppId?: Maybe<Scalars['String']>;
  functionAppName?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  invokeUrlTemplate?: Maybe<Scalars['String']>;
  isDisabled?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  resourceGroupId?: Maybe<Scalars['String']>;
  scriptHref?: Maybe<Scalars['String']>;
  scriptRootPathHref?: Maybe<Scalars['String']>;
  secretsFileHref?: Maybe<Scalars['String']>;
  testData?: Maybe<Scalars['String']>;
  testDataHref?: Maybe<Scalars['String']>;
};
