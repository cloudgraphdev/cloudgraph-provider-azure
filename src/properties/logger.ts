/* eslint-disable max-len */
export default {
  /* Active Directory */
  foundAdApplications: (num: number): string => `Found ${num} AD applications`,
  foundAdGroups: (num: number): string => `Found ${num} AD groups`,
  foundAdIdentitySecurityDefaultsEnforcementPolicy: (num: number): string =>
    `Found ${num} AD Identity Security Defaults Enforcement Policy`,
  foundAdServicePrincipals: (num: number): string =>
    `Found ${num} AD service principals`,
  foundAdUsers: (num: number): string => `Found ${num} AD users`,
  /* App Service */
  foundAppServicePlans: (num: number): string =>
    `Found ${num} app service plans`,
  foundWebApps: (num: number): string => `Found ${num} web apps`,
  /* Auth logs */
  authenticatingWithServicePrincipalSecret:
    'Authenticating with the Azure node SDK using Service Principal and Secret',
  authenticatingViaOauth:
    'Authenticating Via Ouath to get token for use with REST API...',
  /* Service logs */
  // Auth Role Assignments
  foundAuthRoleAssignments: (num: number): string =>
    `Found ${num} authorization role assignments`,
  // Auth Role Definitions
  foundAuthRoleDefinitions: (num: number): string =>
    `Found ${num} authorization role definitions`,
  /* CDN Profiles */
  foundCdnProfiles: (num: number): string => `Found ${num} CDN profiles`,
  /* CDN Endpoints */
  foundCdnEndpoints: (num: number): string => `Found ${num} CDN endpoints`,
  /* CDN Custom Domains */
  foundCdnCustomDomains: (num: number): string =>
    `Found ${num} CDN custom domains`,
  /* CDN Origins */
  foundCdnOrigins: (num: number): string => `Found ${num} CDN origins`,
  /* CDN Origin Groups */
  foundCdnOriginGroups: (num: number): string =>
    `Found ${num} CDN origin groups`,
  foundContainerRegistries: (num: number): string =>
    `Found ${num} container registries`,
  /* Database */
  foundDatabaseMySql: (num: number): string => `Found ${num} MySQL databases`,
  foundDatabasePostgreSql: (num: number): string =>
    `Found ${num} PostgreSQL databases`,
  foundDatabaseSql: (num: number): string => `Found ${num} SQL databases`,
  foundDatabaseSqlVm: (num: number): string =>
    `Found ${num} SQL virtual machines`,
  // Disk
  foundDisks: (num: number): string => `Found ${num} disks`,
  // DNS Zone
  foundDnsZone: (num: number): string => `Found ${num} DNS Zones`,
  // DNS Zone List
  foundDnsZoneRecordSet: (num: number): string =>
    `Found ${num} DNS Zone Record Sets`,
  // Event Grid
  foundEventGridDomains: (num: number): string =>
    `Found ${num} event grid domains`,
  foundEventGridsTopic: (num: number): string =>
    `Found ${num} event grids topics`,
  // Event hubs
  foundEventHubNamespaces: (num: number): string =>
    `Found ${num} event hub namespaces`,
  foundEventHubs: (num: number): string => `Found ${num} event hubs`,
  // Firewall
  foundFirewalls: (num: number): string => `Found ${num} firewalls`,
  // Azure Functions
  foundFunctionApps: (num: number): string => `Found ${num} function apps`,
  foundFunctions: (num: number): string => `Found ${num} functions`,
  // Key Vault
  foundKeyVault: (num: number): string => `Found ${num} Key Vault`,
  foundKeyVaultKeys: (num: number): string => `Found ${num} Key Vault keys`,
  foundKeyVaultSecrets: (num: number): string => `Found ${num} Key Vault secrets`,
  // Load balancer
  foundLoadBalancers: (num: number): string => `Found ${num} load balancers`,
  // Monitor Alert Rules
  foundMonitorAlertRules: (num: number): string => `Found ${num} monitor rules`,
  // Network Interface
  foundNetworkInterfaces: (num: number): string =>
    `Found ${num} network interfaces`,
  // Policies
  foundPolicyAssignments: (num: number): string =>
    `Found ${num} policy assignments`,
  /* Private Dns zones */
  foundPrivateDnsZones: (num: number): string =>
    `Found ${num} private dns zones`,
  // Public Ips
  foundPublicIps: (num: number): string => `Found ${num} public ips`,
  // Resource Groups
  foundResourceGroups: (num: number): string => `Found ${num} resource groups`,
  // Security Assesments
  foundSecurityAssesments: (num: number): string =>
    `Found ${num} security assesments`,
  // Security Groups
  foundSecurityGroups: (num: number): string => `Found ${num} security groups`,
  // Security Pricings
  foundSecurityPricings: (num: number): string =>
    `Found ${num} security pricings`,
  // Security Settings
  foundSecuritySettings: (num: number): string =>
    `Found ${num} security settings`,
  // Storage Account
  foundStorageAccounts: (num: number): string =>
    `Found ${num} storage accounts`,
  // Storage Containers
  foundStorageContainers: (num: number): string =>
    `Found ${num} storage containers`,
  // Storage Blobs
  foundStorageBlobs: (num: number): string => `Found ${num} storage blobs`,
  // Virtual Machines
  foundvirtualMachines: (num: number): string =>
    `Found ${num} virtual machines`,
  // Virtual Machines Scale Sets
  foundvirtualMachinesScaleSets: (num: number): string =>
    `Found ${num} virtual machines scale sets`,
  // Virtual Networks
  foundvirtualNetworks: (num: number): string =>
    `Found ${num} virtual networks`,
  // Generic Rest API
  fetchedDataFromRestApi: (url: string): string =>
    `Fetched data from Azure REST API: ${url}`,
  /* Other */
  fetchingMoreRestApiData: 'Found more REST API data, fetching more data...',
}
