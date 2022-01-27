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

export type AzureAuthRoleAssignment = AzureBaseResource & {
  region?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  roleDefinitionId?: Maybe<Scalars['String']>;
  principalId?: Maybe<Scalars['String']>;
  principalType?: Maybe<Scalars['String']>;
  canDelegate?: Maybe<Scalars['Boolean']>;
};

export type AzureAuthRoleDefinition = AzureBaseResource & {
  region?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  roleName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  roleType?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<AzureAuthRoleDefinitionPermission>>>;
  assignableScopes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureAuthRoleDefinitionPermission = {
  id: Scalars['String'];
  actions?: Maybe<Array<Maybe<Scalars['String']>>>;
  notActions?: Maybe<Array<Maybe<Scalars['String']>>>;
  dataActions?: Maybe<Array<Maybe<Scalars['String']>>>;
  notDataActions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureBaseResource = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureDisk = AzureResource & {
  managedBy?: Maybe<Scalars['String']>;
  zones?: Maybe<Array<Maybe<Scalars['String']>>>;
  timeCreated?: Maybe<Scalars['String']>;
  osType?: Maybe<Scalars['String']>;
  hyperVGeneration?: Maybe<Scalars['String']>;
  createOption?: Maybe<Scalars['String']>;
  imageReferenceId?: Maybe<Scalars['String']>;
  diskSizeGb?: Maybe<Scalars['Int']>;
  diskSizeBytes?: Maybe<Scalars['Float']>;
  uniqueId?: Maybe<Scalars['String']>;
  diskIopsReadWrite?: Maybe<Scalars['Int']>;
  diskMbpsReadWrite?: Maybe<Scalars['Int']>;
  diskState?: Maybe<Scalars['String']>;
  networkAccessPolicy?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
  encryptionSettings?: Maybe<Scalars['String']>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
};

export type AzureDnsZone = AzureResource & {
  maxNumberOfRecordSets?: Maybe<Scalars['Int']>;
  numberOfRecordSets?: Maybe<Scalars['Int']>;
  nameServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  zoneType?: Maybe<Scalars['String']>;
  recordSets?: Maybe<Array<Maybe<AzureDnsZoneRecordSet>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureDnsZoneRecordSet = AzureResource & {
  tTL?: Maybe<Scalars['Int']>;
  fqdn?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  targetResourceId?: Maybe<Scalars['String']>;
  aRecords?: Maybe<Array<Maybe<Scalars['String']>>>;
  aaaaRecords?: Maybe<Array<Maybe<Scalars['String']>>>;
  mxRecords?: Maybe<Array<Maybe<AzureDnsZoneRecordSetMxRecord>>>;
  nsRecords?: Maybe<Array<Maybe<Scalars['String']>>>;
  ptrRecords?: Maybe<Array<Maybe<Scalars['String']>>>;
  srvRecords?: Maybe<Array<Maybe<AzureDnsZoneRecordSetSrvRecord>>>;
  txtRecords?: Maybe<Array<Maybe<AzureDnsZoneRecordSetTxtRecord>>>;
  cnameRecord?: Maybe<Scalars['String']>;
  soaRecord?: Maybe<AzureDnsZoneRecordSetSoaRecord>;
  caaRecords?: Maybe<Array<Maybe<AzureDnsZoneRecordSetCaaRecord>>>;
  resourceGroup?: Maybe<Scalars['String']>;
};

export type AzureDnsZoneRecordSetCaaRecord = {
  id: Scalars['String'];
  flags?: Maybe<Scalars['Int']>;
  tag?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureDnsZoneRecordSetMxRecord = {
  id: Scalars['String'];
  exchange?: Maybe<Scalars['String']>;
  preference?: Maybe<Scalars['Int']>;
};

export type AzureDnsZoneRecordSetSoaRecord = {
  host?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  serialNumber?: Maybe<Scalars['Int']>;
  refreshTime?: Maybe<Scalars['Int']>;
  retryTime?: Maybe<Scalars['Int']>;
  expireTime?: Maybe<Scalars['Int']>;
  minimumTtl?: Maybe<Scalars['Int']>;
};

export type AzureDnsZoneRecordSetSrvRecord = {
  id: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  port?: Maybe<Scalars['Int']>;
  target?: Maybe<Scalars['String']>;
};

export type AzureDnsZoneRecordSetTxtRecord = {
  id: Scalars['String'];
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureExtendedLocation = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureFilesIdentityBasedAuthenticationActiveDirectoryProperties = {
  domainName?: Maybe<Scalars['String']>;
  netBiosDomainName?: Maybe<Scalars['String']>;
  forestName?: Maybe<Scalars['String']>;
  domainGuid?: Maybe<Scalars['String']>;
  domainSid?: Maybe<Scalars['String']>;
  azureStorageSid?: Maybe<Scalars['String']>;
};

export type AzureFirewall = AzureResource & {
  applicationRuleCollections?: Maybe<Array<Maybe<AzureFirewallApplicationRuleCollection>>>;
  natRuleCollections?: Maybe<Array<Maybe<AzureFirewallNatRuleCollection>>>;
  networkRuleCollections?: Maybe<Array<Maybe<AzureFirewallNetworkRuleCollection>>>;
  ipConfigurations?: Maybe<Array<Maybe<AzureFirewallIpConfiguration>>>;
  managementIpConfiguration?: Maybe<AzureFirewallManagementIpConfiguration>;
  provisioningState?: Maybe<Scalars['String']>;
  threatIntelMode?: Maybe<Scalars['String']>;
  virtualHub?: Maybe<Scalars['String']>;
  firewallPolicy?: Maybe<Scalars['String']>;
  hubIPAddresses?: Maybe<AzureFirewallHubIpAddresses>;
  ipGroups?: Maybe<Array<Maybe<AzureFirewallIpGroup>>>;
  additionalProperties?: Maybe<Array<Maybe<AzureFirewallAdditionalProperty>>>;
  zones?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
  publicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureFirewallAdditionalProperty = {
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureFirewallApplicationRule = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  sourceAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  protocols?: Maybe<Array<Maybe<AzureFirewallApplicationRuleProtocol>>>;
  targetFqdns?: Maybe<Array<Maybe<Scalars['String']>>>;
  fqdnTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceIpGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureFirewallApplicationRuleCollection = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  action?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<Maybe<AzureFirewallApplicationRule>>>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureFirewallApplicationRuleProtocol = {
  id: Scalars['String'];
  protocolType?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
};

export type AzureFirewallHubIpAddresses = {
  publicIPs?: Maybe<Array<Maybe<Scalars['String']>>>;
  privateIPAddress?: Maybe<Scalars['String']>;
};

export type AzureFirewallIpConfiguration = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  privateIPAddress?: Maybe<Scalars['String']>;
  subnet?: Maybe<Scalars['String']>;
  publicIPAddress?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureFirewallIpGroup = {
  id: Scalars['String'];
  changeNumber?: Maybe<Scalars['String']>;
};

export type AzureFirewallManagementIpConfiguration = {
  id: Scalars['String'];
  privateIPAddress?: Maybe<Scalars['String']>;
  subnet?: Maybe<Scalars['String']>;
  publicIPAddress?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureFirewallNatRule = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  sourceAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationPorts?: Maybe<Array<Maybe<Scalars['String']>>>;
  protocols?: Maybe<Array<Maybe<Scalars['String']>>>;
  translatedAddress?: Maybe<Scalars['String']>;
  translatedPort?: Maybe<Scalars['String']>;
  translatedFqdn?: Maybe<Scalars['String']>;
  sourceIpGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureFirewallNatRuleCollection = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  action?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<Maybe<AzureFirewallNatRule>>>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureFirewallNetworkRule = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  protocols?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationAddresses?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationPorts?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationFqdns?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceIpGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationIpGroups?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureFirewallNetworkRuleCollection = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  action?: Maybe<Scalars['String']>;
  rules?: Maybe<Array<Maybe<AzureFirewallNetworkRule>>>;
  provisioningState?: Maybe<Scalars['String']>;
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
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureHostingEnvironmentProfile = {
  id?: Maybe<Scalars['String']>;
};

export type AzureKeyVault = AzureResource & {
  tenantId?: Maybe<Scalars['String']>;
  accessPolicies?: Maybe<Array<Maybe<AzureKeyVaultAccessPolicy>>>;
  vaultUri?: Maybe<Scalars['String']>;
  enabledForDeployment?: Maybe<Scalars['String']>;
  enabledForDiskEncryption?: Maybe<Scalars['String']>;
  enabledForTemplateDeployment?: Maybe<Scalars['String']>;
  enableSoftDelete?: Maybe<Scalars['String']>;
  createMode?: Maybe<Scalars['String']>;
  enablePurgeProtection?: Maybe<Scalars['String']>;
  networkAclBypass?: Maybe<Scalars['String']>;
  networkAclDefaultAction?: Maybe<Scalars['String']>;
  networkAclIpRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  networkAclVirtualNetworkRules?: Maybe<Array<Maybe<Scalars['String']>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureKeyVaultAccessPolicy = {
  id: Scalars['String'];
  objectId?: Maybe<Scalars['String']>;
  applicationId?: Maybe<Scalars['String']>;
  permissionKeys?: Maybe<Array<Maybe<Scalars['String']>>>;
  permissionSecrets?: Maybe<Array<Maybe<Scalars['String']>>>;
  permissionCertificates?: Maybe<Array<Maybe<Scalars['String']>>>;
  permissionStorage?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureNetworkInterface = AzureResource & {
  macAddress?: Maybe<Scalars['String']>;
  privateIpAddress?: Maybe<Scalars['String']>;
  internalDnsNameLabel?: Maybe<Scalars['String']>;
  enableIpForwarding?: Maybe<Scalars['Boolean']>;
  virtualMachineId?: Maybe<Scalars['String']>;
  enableAcceleratedNetworking?: Maybe<Scalars['Boolean']>;
  internalDomainNameSuffix?: Maybe<Scalars['String']>;
  ipConfiguration?: Maybe<AzureNetworkInterfaceIpConfiguration>;
  appliedDnsServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  dnsServers?: Maybe<Array<Maybe<Scalars['String']>>>;
  publicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  securityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroup>>>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
};

export type AzureNetworkInterfaceIpConfiguration = {
  gatewayLoadBalancer?: Maybe<AzureSubResource>;
  privateIPAddress?: Maybe<Scalars['String']>;
  privateIPAllocationMethod?: Maybe<Scalars['String']>;
  privateIPAddressVersion?: Maybe<Scalars['String']>;
  subnetId?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  provisioningState?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzureNetworkSecurityGroup = AzureResource & {
  resourceGuid?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  securityRules?: Maybe<Array<Maybe<AzureNetworkSecurityGroupRule>>>;
  defaultSecurityRules?: Maybe<Array<Maybe<AzureNetworkSecurityGroupRule>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureNetworkSecurityGroupApplication = AzureBaseResource & {
  provisioningState?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
};

export type AzureNetworkSecurityGroupRule = AzureBaseResource & {
  description?: Maybe<Scalars['String']>;
  protocol?: Maybe<Scalars['String']>;
  sourcePortRange?: Maybe<Scalars['String']>;
  destinationPortRange?: Maybe<Scalars['String']>;
  sourceAddressPrefix?: Maybe<Scalars['String']>;
  sourceAddressPrefixes?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceApplicationSecurityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroupApplication>>>;
  destinationAddressPrefix?: Maybe<Scalars['String']>;
  destinationAddressPrefixes?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationApplicationSecurityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroupApplication>>>;
  sourcePortRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  destinationPortRanges?: Maybe<Array<Maybe<Scalars['String']>>>;
  access?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  direction?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AzurePolicyAssignment = AzureBaseResource & {
  subscriptionId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  enforcementMode?: Maybe<Scalars['String']>;
  identity?: Maybe<AzurePolicyAssignmentIdentity>;
  nonComplianceMessages?: Maybe<Array<Maybe<AzurePolicyAssignmentNonComplianceMessages>>>;
  notScopes?: Maybe<Array<Maybe<Scalars['String']>>>;
  parameters?: Maybe<Array<Maybe<AzurePolicyAssignmentParameters>>>;
  policyDefinitionId?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  createdByType?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
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
  firewalls?: Maybe<Array<Maybe<AzureFirewall>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
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
  resourceGroup?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<AzureRawTag>>>;
};

export type AzureResourceGroup = AzureResource & {
  managedBy?: Maybe<Scalars['String']>;
  disks?: Maybe<Array<Maybe<AzureDisk>>>;
  dns?: Maybe<Array<Maybe<AzureDnsZone>>>;
  firewalls?: Maybe<Array<Maybe<AzureFirewall>>>;
  functionApps?: Maybe<Array<Maybe<AzureFunctionApp>>>;
  keyVaults?: Maybe<Array<Maybe<AzureKeyVault>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  publicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  securityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroup>>>;
  storageAccounts?: Maybe<Array<Maybe<AzureStorageAccount>>>;
  storageContainers?: Maybe<Array<Maybe<AzureStorageContainer>>>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
  virtualMachineScaleSets?: Maybe<Array<Maybe<AzureVirtualMachineScaleSet>>>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
};

export type AzureSecurityAssesment = AzureBaseResource & {
  subscriptionId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Scalars['String']>;
  resourceDetails?: Maybe<AzureSecurityAssesmentResourceDetails>;
  displayName?: Maybe<Scalars['String']>;
  additionalData?: Maybe<Array<Maybe<AzureSecurityAssesmentAdditionalData>>>;
  link?: Maybe<Scalars['String']>;
  status?: Maybe<AzureSecurityAssesmentStatus>;
  partnerName?: Maybe<Scalars['String']>;
  metadata?: Maybe<AzureSecurityAssesmentMetadata>;
};

export type AzureSecurityAssesmentAdditionalData = {
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type AzureSecurityAssesmentMetadata = {
  partnerName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  policyDefinitionId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  remediationDescription?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  severity?: Maybe<Scalars['String']>;
  userImpact?: Maybe<Scalars['String']>;
  implementationEffort?: Maybe<Scalars['String']>;
  threats?: Maybe<Array<Maybe<Scalars['String']>>>;
  preview?: Maybe<Scalars['Boolean']>;
  assessmentType?: Maybe<Scalars['String']>;
};

export type AzureSecurityAssesmentResourceDetails = {
  id?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  serverName?: Maybe<Scalars['String']>;
  databaseName?: Maybe<Scalars['String']>;
  workspaceId?: Maybe<Scalars['String']>;
  vmuuid?: Maybe<Scalars['String']>;
  sourceComputerId?: Maybe<Scalars['String']>;
  machineName?: Maybe<Scalars['String']>;
};

export type AzureSecurityAssesmentStatus = {
  code?: Maybe<Scalars['String']>;
  cause?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  firstEvaluationDate?: Maybe<Scalars['String']>;
  statusChangeDate?: Maybe<Scalars['String']>;
};

export type AzureSecurityPricing = AzureResource & {
  pricingTier?: Maybe<Scalars['String']>;
  freeTrialRemainingTime?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type AzureSecuritySetting = AzureBaseResource & {
  kind?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  subscriptionId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type AzureSshConfiguration = {
  publicKeys?: Maybe<Array<Maybe<AzureSshPublicKey>>>;
};

export type AzureSshPublicKey = {
  path?: Maybe<Scalars['String']>;
  keyData?: Maybe<Scalars['String']>;
};

export type AzureStorageAccount = AzureResource & {
  extendedLocationName?: Maybe<Scalars['String']>;
  extendedLocationType?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  primaryEndpoints?: Maybe<AzureStorageAccountPrimaryEndpoints>;
  primaryMicrosoftEndpoints?: Maybe<AzureStorageAccountPrimaryMicrosoftEndpoints>;
  primaryInternetEndpoints?: Maybe<AzureStorageAccountPrimaryInternetEndpoints>;
  primaryLocation?: Maybe<Scalars['String']>;
  statusOfPrimary?: Maybe<Scalars['String']>;
  lastGeoFailoverTime?: Maybe<Scalars['String']>;
  secondaryLocation?: Maybe<Scalars['String']>;
  statusOfSecondary?: Maybe<Scalars['String']>;
  customDomainName?: Maybe<Scalars['String']>;
  customDomainUseSubDomainName?: Maybe<Scalars['String']>;
  sasPolicyExpirationPeriod?: Maybe<Scalars['String']>;
  keyPolicyExpirationPeriodInDays?: Maybe<Scalars['Int']>;
  keyCreationTimeKey1?: Maybe<Scalars['String']>;
  keyCreationTimeKey2?: Maybe<Scalars['String']>;
  encryptionServiceBlob?: Maybe<AzureStorageAccountEncryptionService>;
  encryptionServiceFile?: Maybe<AzureStorageAccountEncryptionService>;
  encryptionServiceTable?: Maybe<AzureStorageAccountEncryptionService>;
  encryptionServiceQueue?: Maybe<AzureStorageAccountEncryptionService>;
  encryptionKeySource?: Maybe<Scalars['String']>;
  encryptionRequireInfrastructureEncryption?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyKeyName?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyKeyVersion?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyKeyVaultUri?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyCurrentVersionedKeyIdentifier?: Maybe<Scalars['String']>;
  encryptionKeyVaultPropertyLastKeyRotationTimestamp?: Maybe<Scalars['String']>;
  encryptionUserAssignedIdentity?: Maybe<Scalars['String']>;
  accessTier?: Maybe<Scalars['String']>;
  azureFilesIdentityBasedAuthenticationDirectoryServiceOptions?: Maybe<Scalars['String']>;
  azureFilesIdentityBasedAuthenticationActiveDirectoryProperties?: Maybe<AzureFilesIdentityBasedAuthenticationActiveDirectoryProperties>;
  enableHttpsTrafficOnly?: Maybe<Scalars['String']>;
  networkRuleSetByPass?: Maybe<Scalars['String']>;
  networkRuleResourceAccessRules?: Maybe<Array<Maybe<AzureStorageAccountResourceAccessRule>>>;
  networkRuleVirtualNetworkRules?: Maybe<Array<Maybe<AzureStorageAccountVirtualNetworkRule>>>;
  networkRuleIpRules?: Maybe<Array<Maybe<AzureStorageAccountIpRule>>>;
  networkRuleSetDefaultAction?: Maybe<Scalars['String']>;
  isHnsEnabled?: Maybe<Scalars['String']>;
  geoReplicationStatsStatus?: Maybe<Scalars['String']>;
  geoReplicationStatsLastSyncTime?: Maybe<Scalars['String']>;
  geoReplicationStatsCanFailover?: Maybe<Scalars['String']>;
  failoverInProgress?: Maybe<Scalars['String']>;
  largeFileSharesState?: Maybe<Scalars['String']>;
  privateEndpointConnections?: Maybe<Array<Maybe<AzureStorageAccountPrivateEndpointConnection>>>;
  routingPreferenceChoice?: Maybe<Scalars['String']>;
  routingPreferencePublishMicrosoftEndpoints?: Maybe<Scalars['String']>;
  routingPreferencePublishInternetEndpoints?: Maybe<Scalars['String']>;
  allowBlobPublicAccess?: Maybe<Scalars['String']>;
  minimumTlsVersion?: Maybe<Scalars['String']>;
  allowSharedKeyAccess?: Maybe<Scalars['String']>;
  enableNfsV3?: Maybe<Scalars['String']>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  storageContainers?: Maybe<Array<Maybe<AzureStorageContainer>>>;
};

export type AzureStorageAccountEncryptionService = {
  enabled?: Maybe<Scalars['String']>;
  lastEnabledTime?: Maybe<Scalars['String']>;
  keyType?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountIpRule = {
  id: Scalars['String'];
  iPAddressOrRange?: Maybe<Scalars['String']>;
  action?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountPrimaryEndpoints = {
  blob?: Maybe<Scalars['String']>;
  queue?: Maybe<Scalars['String']>;
  table?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
  dfs?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountPrimaryInternetEndpoints = {
  blob?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
  dfs?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountPrimaryMicrosoftEndpoints = {
  blob?: Maybe<Scalars['String']>;
  queue?: Maybe<Scalars['String']>;
  table?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
  dfs?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountPrivateEndpointConnection = {
  id: Scalars['String'];
  privateEndpointId?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionStateStatus?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionStateDescription?: Maybe<Scalars['String']>;
  privateLinkServiceConnectionStateActionRequired?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountResourceAccessRule = {
  id: Scalars['String'];
  tenantId?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
};

export type AzureStorageAccountVirtualNetworkRule = {
  id: Scalars['String'];
  virtualNetworkResourceId?: Maybe<Scalars['String']>;
  action?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type AzureStorageContainer = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  resourceGroup?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['String']>;
  deletedTime?: Maybe<Scalars['String']>;
  remainingRetentionDays?: Maybe<Scalars['Int']>;
  denyEncryptionScopeOverride?: Maybe<Scalars['String']>;
  publicAccess?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  leaseStatus?: Maybe<Scalars['String']>;
  leaseDuration?: Maybe<Scalars['String']>;
  immutabilityPolicyPeriodSinceCreationInDays?: Maybe<Scalars['Int']>;
  immutabilityPolicyState?: Maybe<Scalars['String']>;
  immutabilityPolicyAllowProtectedAppendWrites?: Maybe<Scalars['String']>;
  immutabilityPolicyUpdateHistory?: Maybe<Array<Maybe<AzureStorageContainerImmutabilityPolicyUpdateHistory>>>;
  legalHoldTags?: Maybe<Array<Maybe<AzureStorageContainerLegalHoldTag>>>;
  hasLegalHold?: Maybe<Scalars['String']>;
  hasImmutabilityPolicy?: Maybe<Scalars['String']>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  storageAccounts?: Maybe<Array<Maybe<AzureStorageAccount>>>;
};

export type AzureStorageContainerImmutabilityPolicyUpdateHistory = {
  id: Scalars['String'];
  update?: Maybe<Scalars['String']>;
  immutabilityPeriodSinceCreationInDays?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['String']>;
  objectIdentifier?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  upn?: Maybe<Scalars['String']>;
};

export type AzureStorageContainerLegalHoldTag = {
  id: Scalars['String'];
  tag?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
  objectIdentifier?: Maybe<Scalars['String']>;
  tenantId?: Maybe<Scalars['String']>;
  upn?: Maybe<Scalars['String']>;
};

export type AzureSubResource = {
  id: Scalars['String'];
};

export type AzureTag = {
  id: Scalars['String'];
  key: Scalars['String'];
  value: Scalars['String'];
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
  disks?: Maybe<Array<Maybe<AzureDisk>>>;
  firewalls?: Maybe<Array<Maybe<AzureFirewall>>>;
  functionApps?: Maybe<Array<Maybe<AzureFunctionApp>>>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
  publicIps?: Maybe<Array<Maybe<AzurePublicIp>>>;
  keyVaults?: Maybe<Array<Maybe<AzureKeyVault>>>;
  securityGroups?: Maybe<Array<Maybe<AzureNetworkSecurityGroup>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  dns?: Maybe<Array<Maybe<AzureDnsZone>>>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
  storageAccounts?: Maybe<Array<Maybe<AzureStorageAccount>>>;
};

export type AzureVaultCertificate = {
  certificateUrl?: Maybe<Scalars['String']>;
  certificateStore?: Maybe<Scalars['String']>;
};

export type AzureVaultSecretGroup = {
  sourceVault?: Maybe<AzureSubResource>;
  vaultCertificates?: Maybe<Array<Maybe<AzureVaultCertificate>>>;
};

export type AzureVirtualMachine = AzureResource & {
  managedBy?: Maybe<Scalars['String']>;
  vmSize?: Maybe<Scalars['String']>;
  osProfile?: Maybe<AzureVirtualMachineOsProfile>;
  osType?: Maybe<Scalars['String']>;
  storageImageReference?: Maybe<AzureVirtualMachineStorageImageReference>;
  bootDiagnostics?: Maybe<Scalars['Boolean']>;
  licenseType?: Maybe<Scalars['String']>;
  disks?: Maybe<Array<Maybe<AzureDisk>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  virtualNetworks?: Maybe<Array<Maybe<AzureVirtualNetwork>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureVirtualMachineOsProfile = {
  computerName?: Maybe<Scalars['String']>;
  windowsConfiguration?: Maybe<AzureVirtualMachineOsProfileWindowsConfiguration>;
  linuxConfiguration?: Maybe<AzureVirtualMachineOsProfileLinuxConfiguration>;
  allowExtensionOperations?: Maybe<Scalars['Boolean']>;
  requireGuestProvisionSignal?: Maybe<Scalars['Boolean']>;
};

export type AzureVirtualMachineOsProfileLinuxConfiguration = {
  disablePasswordAuthentication?: Maybe<Scalars['Boolean']>;
  provisionVMAgent?: Maybe<Scalars['Boolean']>;
};

export type AzureVirtualMachineOsProfileWindowsConfiguration = {
  provisionVMAgent?: Maybe<Scalars['Boolean']>;
  enableAutomaticUpdates?: Maybe<Scalars['Boolean']>;
  timeZone?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSet = AzureResource & {
  provisioningState?: Maybe<Scalars['String']>;
  overprovision?: Maybe<Scalars['Boolean']>;
  doNotRunExtensionsOnOverprovisionedVMs?: Maybe<Scalars['Boolean']>;
  singlePlacementGroup?: Maybe<Scalars['Boolean']>;
  platformFaultDomainCount?: Maybe<Scalars['Int']>;
  uniqueId?: Maybe<Scalars['String']>;
  virtualMachineProfile?: Maybe<AzureVirtualMachineScaleSetProfile>;
  scaleInPolicy?: Maybe<AzureVirtualMachineScaleSetScaleInPolicy>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureVirtualMachineScaleSetDiagnosticsProfile = {
  bootDiagnostics?: Maybe<AzureVirtualMachineScaleSetDiagnosticsProfileBoot>;
};

export type AzureVirtualMachineScaleSetDiagnosticsProfileBoot = {
  enabled?: Maybe<Scalars['Boolean']>;
};

export type AzureVirtualMachineScaleSetExtension = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  forceUpdateTag?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  type1?: Maybe<Scalars['String']>;
  typeHandlerVersion?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  provisioningState?: Maybe<Scalars['String']>;
  provisionAfterExtensions?: Maybe<Array<Maybe<Scalars['String']>>>;
  autoUpgradeMinorVersion?: Maybe<Scalars['Boolean']>;
  enableAutomaticUpgrade?: Maybe<Scalars['Boolean']>;
  settings?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetExtensionProfile = {
  extensions?: Maybe<Array<Maybe<AzureVirtualMachineScaleSetExtension>>>;
};

export type AzureVirtualMachineScaleSetIpTag = {
  ipTagType?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetNetworkIpConfiguration = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  privateIPAddressVersion?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  subnetId?: Maybe<Scalars['String']>;
  applicationGatewayBackendAddressPools?: Maybe<Array<Maybe<AzureSubResource>>>;
  applicationSecurityGroups?: Maybe<Array<Maybe<AzureSubResource>>>;
  loadBalancerBackendAddressPools?: Maybe<Array<Maybe<AzureSubResource>>>;
  loadBalancerInboundNatPools?: Maybe<Array<Maybe<AzureSubResource>>>;
};

export type AzureVirtualMachineScaleSetNetworkProfile = {
  networkInterfaceConfigurations?: Maybe<Array<Maybe<AzureVirtualMachineScaleSetNetworkProfileConfiguration>>>;
};

export type AzureVirtualMachineScaleSetNetworkProfileConfiguration = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  enableAcceleratedNetworking?: Maybe<Scalars['Boolean']>;
  enableFpga?: Maybe<Scalars['Boolean']>;
  enableIPForwarding?: Maybe<Scalars['Boolean']>;
  deleteOption?: Maybe<Scalars['String']>;
  networkSecurityGroup?: Maybe<AzureSubResource>;
  dnsSettings?: Maybe<AzureVirtualMachineScaleSetNetworkProfileConfigurationDnsSettings>;
  ipConfigurations?: Maybe<Array<Maybe<AzureVirtualMachineScaleSetNetworkIpConfiguration>>>;
};

export type AzureVirtualMachineScaleSetNetworkProfileConfigurationDnsSettings = {
  dnsServers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AzureVirtualMachineScaleSetNetworkPublicIpAddresssConfiguration = {
  name?: Maybe<Scalars['String']>;
  idleTimeoutInMinutes?: Maybe<Scalars['Int']>;
  ipTags?: Maybe<Array<Maybe<AzureVirtualMachineScaleSetIpTag>>>;
  publicIPPrefix?: Maybe<AzureSubResource>;
  publicIPAddressVersion?: Maybe<Scalars['String']>;
  deleteOption?: Maybe<Scalars['String']>;
  dnsSettings?: Maybe<AzureVirtualMachineScaleSetPublicIpAddressConfigurationDnsSettings>;
};

export type AzureVirtualMachineScaleSetOsProfile = {
  computerNamePrefix?: Maybe<Scalars['String']>;
  adminUsername?: Maybe<Scalars['String']>;
  allowExtensionOperations?: Maybe<Scalars['Boolean']>;
  requireGuestProvisionSignal?: Maybe<Scalars['Boolean']>;
  linuxConfiguration?: Maybe<AzureVirtualMachineScaleSetOsProfileLinuxConfiguration>;
  windowsConfiguration?: Maybe<AzureVirtualMachineScaleSetOsProfileWindowsConfiguration>;
  secrets?: Maybe<Array<Maybe<AzureVaultSecretGroup>>>;
};

export type AzureVirtualMachineScaleSetOsProfileLinuxConfiguration = {
  disablePasswordAuthentication?: Maybe<Scalars['Boolean']>;
  provisionVMAgent?: Maybe<Scalars['Boolean']>;
  ssh?: Maybe<AzureSshConfiguration>;
};

export type AzureVirtualMachineScaleSetOsProfileWindowsConfiguration = {
  provisionVMAgent?: Maybe<Scalars['Boolean']>;
  enableAutomaticUpdates?: Maybe<Scalars['Boolean']>;
  timeZone?: Maybe<Scalars['String']>;
  ssh?: Maybe<AzureSshConfiguration>;
};

export type AzureVirtualMachineScaleSetProfile = {
  osProfile?: Maybe<AzureVirtualMachineScaleSetOsProfile>;
  storageProfile?: Maybe<AzureVirtualMachineScaleSetStorageProfile>;
  networkProfile?: Maybe<AzureVirtualMachineScaleSetNetworkProfile>;
  diagnosticsProfile?: Maybe<AzureVirtualMachineScaleSetDiagnosticsProfile>;
  extensionProfile?: Maybe<AzureVirtualMachineScaleSetExtensionProfile>;
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
  publisher?: Maybe<Scalars['String']>;
  offer?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetStorageProfileManagedDisk = {
  storageAccountType?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineScaleSetStorageProfileOsDisk = {
  caching?: Maybe<Scalars['String']>;
  createOption?: Maybe<Scalars['String']>;
  osType?: Maybe<Scalars['String']>;
  diskSizeGB?: Maybe<Scalars['Int']>;
  writeAcceleratorEnabled?: Maybe<Scalars['Boolean']>;
  managedDisk?: Maybe<AzureVirtualMachineScaleSetStorageProfileManagedDisk>;
};

export type AzureVirtualMachineScaleSetSubResource = {
  id?: Maybe<Scalars['String']>;
};

export type AzureVirtualMachineStorageImageReference = {
  publisher?: Maybe<Scalars['String']>;
  offer?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  exactVersion?: Maybe<Scalars['String']>;
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
  firewalls?: Maybe<Array<Maybe<AzureFirewall>>>;
  networkInterfaces?: Maybe<Array<Maybe<AzureNetworkInterface>>>;
  virtualMachines?: Maybe<Array<Maybe<AzureVirtualMachine>>>;
  resourceGroups?: Maybe<Array<Maybe<AzureResourceGroup>>>;
};

export type AzureVirtualNetworkDdosProtectionPlan = AzureBaseResource & {
  resourceGuid?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
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
  resourceGroup?: Maybe<Scalars['String']>;
  scriptHref?: Maybe<Scalars['String']>;
  scriptRootPathHref?: Maybe<Scalars['String']>;
  secretsFileHref?: Maybe<Scalars['String']>;
  testData?: Maybe<Scalars['String']>;
  testDataHref?: Maybe<Scalars['String']>;
};
