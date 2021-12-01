export type Maybe<T> = T | null;
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
};

export type AzureBaseResource = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureExtendedLocation = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureFunctionApp = AzureResource & {
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
  extendedLocation?: Maybe<AzureExtendedLocation>;
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
  resourceGroup?: Maybe<Scalars['String']>;
  scmSiteAlsoStopped?: Maybe<Scalars['Boolean']>;
  serverFarmId?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  storageAccountRequired?: Maybe<Scalars['Boolean']>;
  suspendedTill?: Maybe<Scalars['String']>;
  targetSwapSlot?: Maybe<Scalars['String']>;
  trafficManagerHostNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  usageState?: Maybe<Scalars['String']>;
  virtualNetworkSubnetId?: Maybe<Scalars['String']>;
  functions?: Maybe<Array<Maybe<AzureWebSiteFunction>>>;
};

export type AzureHostingEnvironmentProfile = {
  id?: Maybe<Scalars['String']>;
};

export type AzurePublicIp = AzureResource & {
  tier?: Maybe<Scalars['String']>;
  allocationMethod?: Maybe<Scalars['String']>;
  ipVersion?: Maybe<Scalars['String']>;
  dnsSettings?: Maybe<AzurePublicIpDnsSettings>;
  ipTags?: Maybe<Array<Maybe<AzurePublicIpTags>>>;
  ipAddress?: Maybe<Scalars['String']>;
  idleTimeoutInMinutes?: Maybe<Scalars['Int']>;
  resourceGuid?: Maybe<Scalars['String']>;
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

export type AzureResource = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
};

export type AzureResourceGroup = AzureResource & {
  managedBy?: Maybe<Scalars['String']>;
};

export type AzureSubResource = {
  id: Scalars['String'];
};

export type AzureTag = {
  id: Scalars['String'];
  key: Scalars['String'];
  value: Scalars['String'];
  resourceGroup?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  functionApp?: Maybe<Array<Maybe<AzureFunctionApp>>>;
  virtualNetwork?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
  publicIp?: Maybe<Array<Maybe<AzurePublicIp>>>;
};

export type AzureVirtualNetwork = AzureResource & {
  addressSpacePrefixes?: Maybe<Array<Maybe<Scalars['String']>>>;
  dnsServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  ddosProtectionPlans?: Maybe<Array<Maybe<AzureVirtualNetworkDdosProtectionPlan>>>;
  enableDdosProtection?: Maybe<Scalars['Boolean']>;
  enableVmProtection?: Maybe<Scalars['Boolean']>;
  flowTimeoutInMinutes?: Maybe<Scalars['Int']>;
  provisioningState?: Maybe<Scalars['String']>;
  resourceGuid?: Maybe<Scalars['String']>;
};

export type AzureVirtualNetworkDdosProtectionPlan = AzureBaseResource & {
  resourceGuid?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
};

export type AzureWebSiteFunction = AzureBaseResource & {
  configHref?: Maybe<Scalars['String']>;
  functionAppId?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  invokeUrlTemplate?: Maybe<Scalars['String']>;
  isDisabled?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  scriptHref?: Maybe<Scalars['String']>;
  scriptRootPathHref?: Maybe<Scalars['String']>;
  secretsFileHref?: Maybe<Scalars['String']>;
  testData?: Maybe<Scalars['String']>;
  testDataHref?: Maybe<Scalars['String']>;
};
