export default {
  /* App Service */
  foundAppServicePlans: (num: number): string => `Found ${num} app service plans`,
  foundWebApps: (num: number): string => `Found ${num} web apps`,
  /* Auth logs */
  authenticatingWithServicePrincipalSecret:
    'Authenticating with the Azure node SDK using Service Principal and Secret',
  authenticatingViaOauth:
    'Authenticating Via Ouath to get token for use with REST API...',
  /* Service logs */
  // Auth Role Assignments
  foundAuthRoleAssignments: (num: number): string =>
    `Found ${num} authorization role Assignments`,
  // Auth Role Definitions
  foundAuthRoleDefinitions: (num: number): string =>
    `Found ${num} authorization role definitions`,
  // Disk
  foundDisks: (num: number): string => `Found ${num} disks`,
  // DNS Zone
  foundDnsZone: (num: number): string => `Found ${num} DNS Zones`,
  // DNS Zone List
  foundDnsZoneRecordSet: (num: number): string =>
    `Found ${num} DNS Zone Record Sets`,
  // Event Grid
  foundEventGridDomains: (num: number): string => `Found ${num} event grid domains`,
  foundEventGridsTopic: (num: number): string => `Found ${num} event grids topics`,
  // Event hubs
  foundEventHubNamespaces: (num: number): string =>
    `Found ${num} event hub namespaces`,
  foundEventHubs: (num: number): string =>
    `Found ${num} event hubs`,
  // Firewall
  foundFirewalls: (num: number): string => `Found ${num} firewalls`,
  // Azure Functions
  foundFunctionApps: (num: number): string => `Found ${num} function apps`,
  foundFunctions: (num: number): string => `Found ${num} functions`,
  // Key Vault
  foundKeyVault: (num: number): string => `Found ${num} Key Vault`,
  // Monitor Alert Rules
  foundMonitorAlertRules: (num: number): string => `Found ${num} monitor rules`,
  // Network Interface
  foundNetworkInterfaces: (num: number): string =>
    `Found ${num} network interfaces`,
  // Policies
  foundPolicyAssignments: (num: number): string =>
    `Found ${num} policy assignments`,
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
