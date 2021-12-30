export default {
  authenticatingWithServicePrincipalSecret:
    'Authenticating with the Azure node SDK using Service Principal and Secret',
  // Azure Functions
  foundFunctionApps: (num: number): string => `Found ${num} function apps`,
  foundFunctions: (num: number): string => `Found ${num} functions`,
  // Network Interface
  foundNetworkInterfaces: (num: number): string => `Found ${num} network interfaces`,
  // Public Ips
  foundPublicIps: (num: number): string => `Found ${num} public ips`,
  // Resource Groups
  foundResourceGroups: (num: number): string => `Found ${num} resource groups`,
  // Security Groups
  foundSecurityGroups: (num: number): string => `Found ${num} security groups`,
  // Virtual Machines
  foundvirtualMachines: (num: number): string => `Found ${num} virtual machines`,
  // Virtual Networks
  foundvirtualNetworks: (num: number): string => `Found ${num} virtual networks`,
  // Disk
  foundDisks: (num: number): string => `Found ${num} disks`,
  // Storage Account
  foundStorageAccounts: (num: number): string => `Found ${num} storage accounts`,
  // Storage Containers
  foundStorageContainers: (num: number): string => `Found ${num} storage containers`,
  // DNS Zone
  foundDnsZone: (num: number): string => `Found ${num} DNS Zones`,
  // DNS Zone List
  foundDnsZoneRecordSet: (num: number): string => `Found ${num} DNS Zone Record Sets`,
  // Firewall
  foundFirewalls: (num: number): string => `Found ${num} firewalls`,
  // Key Vault
  foundKeyVault: (num: number): string => `Found ${num} Key Vault`,
  // Generic Rest API
  fetchedDataFromRestApi: (url: string): string =>
    `Fetched data from Azure REST API: ${url}`,
  fetchingMoreRestApiData: 'Found more REST API data, fetching more data...',
  authenticatingViaOauth:
    'Authenticating Via Ouath to get token for use with REST API...',
}
