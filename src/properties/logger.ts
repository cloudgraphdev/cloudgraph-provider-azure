export default {
  platform: 'Platform: Azure',
  azureSdkCalls: 'AZURE SDK CALLS',
  foundSecurityViolation: (name, type): string =>
    `💀 Found a security violation for ${type}: ${name} 💀`,
  startGeneration: 'Generating VSD data for Azure subscription...',
  regionNotFound: (name: string): string =>
    `❌ The region [${name}] was not found in the list of supported Azure regions ❌`,
  // Auth
  authenticatingWithServicePrincipalSecret:
    'Authenticating with the Azure node SDK using Service Principal and Secret',
  // Resource Groups
  lookingForResourceGroups: 'Looking for Resource Groups to add to region...',
  addingResourceGroups: (num: number): string =>
    `Created and adding ${num} Resource Groups to this region`,
  unableToFindResourceGroup: (name: string): string =>
    `❌ WARNING: Unable to find Resource Group ${name} - not added ❌`,
  // VNet
  fetchingVNetsData: 'Fetching Virtual Networks data ...',
  doneFetchingVNetsData: (num: number): string =>
    `✅ Done fetching Virtual Networks data in ${num}s ✅`,
  lookingForVNets: 'Looking for VNets to add to Resource Group...',
  addingVNets: (num: number): string =>
    `Created and adding ${num} VNets to this Resource Group`,
  unableToFindSubnet: (name: string): string =>
    `❌ WARNING: Unable to find Subnet ${name} - not added ❌`,
  // SecurityGroup
  lookingForSecurityGroups:
    'Looking for Security Groups to add to Resource Group...',
  addingSecurityGroups: (num: number): string =>
    `Created and adding ${num} Security Groups to this Resource Group`,
  unableToFindSecurityGroup: (name: string): string =>
    `❌ WARNING: Unable to find Resource Group for Security Group ${name} - not added ❌`,
  fetchingNsgData: 'Fetching Network Security Group...',
  doneFetchingNsgData: (num: number): string =>
    `✅ Done fetching Network Security Group data in ${num}s ✅`,
  // Azure Functions
  fetchingAzureFunctionData:
    'Fetching Azure Function data for this Azure account via the Azure REST API...',
  doneFetchingAzureFunctionData: (num: number): string =>
    `✅ Done fetching Azure Function Data in ${num}s ✅`,
  gettingFunctionApps: 'Fetching all Function Apps',
  gettingFunctions: 'Fetching all Azure Functions',
  lookingForFunctionApps:
    'Looking for Azure Function Apps and Functions to add to Resource Groups...',
  addingFunctionsApps: (num: number): string =>
    `Created and adding ${num} Function Apps to this Resource Group`,
  // Resource Groups
  fetchingResourceGroupData: 'Fetching Resource Groups...',
  doneFetchingResourceGroupData: (num: number): string =>
    `✅ Done fetching Resource Group Data in ${num}s ✅`,
  fetchingResourceGroupIds:
    'Fetching Resource Group IDs for use with Azure Functions',
  fetchingMoreResourceGroups:
    'More than 1000 resource groups found, fetching more data...',
  fetchedResourceGroups: 'Fetched up to 1000 resource groups',
  // Generic Rest API
  fetchedDataFromRestApi: (url: string): string =>
    `Fetched data from Azure REST API: ${url}`,
  fetchingMoreRestApiData: 'Found more REST API data, fetching more data...',
  authenticatingViaOauth:
    'Authenticating Via Ouath to get token for use with REST API...',
  // Network Interfaces
  lookingForNetworkInterfaces:
    'Looking for Network Interfaces to add to VNets...',
  fetchingNetworkInterfaceData: 'Fetching Network interfaces...',
  doneFetchingNetworkInterfaceData: (num: number): string =>
    `✅ Done fetching Network interface data in ${num}s ✅`,
  addingNetworkInterfaces: (num: number): string =>
    `Created and adding ${num} Network Interfaces to this VNet`,
  // Network firewalls
  lookingForNetworkFirewalls:
    'Looking for Network Firewalls to add to Resource Groups...',
  fetchingNetworkFirewallData: 'Fetching Network firewalls...',
  doneFetchingNetworkFirewallData: (num: number): string =>
    `✅ Done fetching Network firewall data in ${num}s ✅`,
  addingNetworkFirewalls: (num: number): string =>
    `Created and adding ${num} Network Firewalls and its configurations to this Resource Group`,
  // Disks
  fetchingDiskData: 'Fetching Disk data ...',
  doneFetchingDiskData: (num: number): string =>
    `✅ Done fetching Disk data in ${num}s ✅`,
  lookingForDisks: 'Looking for Disks to add to Subnet',
  addingDisks: (num: number): string => `Created and adding ${num} Disks to VM`,
  unableToFindVm: (id: string, resourceGroup: string): string =>
    `⚠️  Disk ${id} is not attachd to VM, adding it to resource group ${resourceGroup} ⚠️`,
  addingDiskToVm: 'Adding Disk to VM',
  // Load Balancer
  lookingForLoadBalancer: 'Looking for all Load Balancers...',
  fetchingLoadBalancerData: 'Fetching Load Balancer data...',
  doneFetchingLoadBalancerData: (num: number): string =>
    `✅ Done fetching Load Balancer data in ${num}s ✅`,
  fetchingMoreLoadBalancingRules:
    'More than 1000 Load Balancing Rules found. Fetching more Load Balancing Rules data...',
  addingLoadBalancersToResourceGroup: (name: string): string =>
    `Created and adding Load Balancer ${name} and its configurations to this Resource Group`,
  addingLoadBalancersToVNet: (name: string): string =>
    `Created and adding Load Balancer ${name} and its configurations to VNet`,
  unknownResourceInBackendPool: (backendPoolName: string, resourceId: string): string =>
    `❌ WARNING: Unknown resource attached to the backend pool: ${backendPoolName} with id: ${resourceId} ❌`,
  // Data formatting utils
  beginHositing: '✅ Begin hoisting entities ✅',
  // Storage Accounts
  lookingForStorageAccounts:
    'Looking for Storage Accounts to add to Resource Groups...',
  addingStorageAccounts: (num: number): string =>
    `Created and adding ${num} Storage Accounts to this Resource Group`,
  fetchingStorageData:
    'Fetching Storage Account/Container data for this Azure account via the Azure SDK...',
  doneFetchingStorageData: (num: number): string =>
    `✅ Done fetching Account/Container Data in ${num}s ✅`,
  // Databases (Azure SQL, Maria DB, MySQL, Postgres)
  fetchingDatabasesData: 'Fetching Database data...',
  doneFetchingDatabasesData: (num: number): string =>
    `✅ Done fetching Database data in ${num}s ✅`,
  lookingForDatabases:
    'Looking for all managed Databases (Azure SQL, Maria DB, MySQL, Postgres)...',
  addingAzureSqlDbs: (num: number): string =>
    `Created and adding ${num} Azure SQL Servers and its DBs to this Resource Group`,
  addingMySqlSqlDbs: (num: number): string =>
    `Created and adding ${num} MySQL Servers and its DBs to this Resource Group`,
  addingAzurePostgresqlDbs: (num: number): string =>
    `Created and adding ${num} Postgresql Servers and its DBs to this Resource Group`,
  // Data Factory
  fetchingDataFactoryData:
    'Fetching Data Factory data for this Azure account via the Azure REST API...',
  doneFetchingDataFactoryData: (num: number): string =>
    `✅ Done fetching Data Factory Data in ${num}s ✅`,
  fetchingDataFactories: 'Fetching Data Factories...',
  fetchingMoreDataFactories:
    'More than 1000 Data Factories found, fetching more data...',
  fetchingLinkedServices: 'Fetching Linked Services...',
  fetchingMoreLinkedServices:
    'More than 1000 Linked Services found, fetching more data...',
  fetchingDatasets: 'Fetching Datasets...',
  fetchingMoreDatasets: 'More than 1000 Datasets found, fetching more data...',
  fetchingPipelines: 'Fetching Pipelines...',
  fetchingMorePipelines:
    'More than 1000 Pipelines found, fetching more data...',
  fetchingDataFlows: 'Fetching DataFlows...',
  fetchingMoreDataFlows:
    'More than 1000 DataFlows found, fetching more data...',
  fetchingIntegrationRuntimes: 'Fetching Integration Runtimes...',
  fetchingMoreIntegrationRuntimes:
    'More than 1000 Integration Runtimes found, fetching more data...',
  lookingForDataFactories:
    'Looking for Data Factories to add to Resource Groups...',
  addingDataFactories: (num: number): string =>
    `Created and adding ${num} Data Factories to this Resource Group`,
  // App Service
  fetchingAppServiceData:
    'Fetching App Service data for this Azure account via the Azure REST API...',
  doneFetchingAppServiceData: (num: number): string =>
    `✅ Done fetching App Service Data in ${num}s ✅`,
  fetchingWebApps: 'Fetching Web Apps...',
  fetchingServicePlans: 'Fetching Service Plans...',
  fetchingMoreServicePlans:
    'More than 1000 Service Plans found, fetching more data...',
  lookingForServicePlans:
    'Looking for App Service Plans to add to Resource Groups...',
  addingServicePlans: (num: number): string =>
    `Created and adding ${num} App Service Plans to this Resource Group`,
  // Kubernetes Services
  fetchingKubernetesServicesData: 'Fetching Kubernetes Services data...',
  doneFetchingKubernetesServicesData: (num: number): string =>
    `✅ Done fetching Kubernetes Services Data in ${num}s ✅`,
  lookingForKubernetesServices:
    'Looking for Kubernetes Service to add to Resource Groups...',
  addingKubernetesServices: (num: number): string =>
    `Created and adding ${num} Kubernetes Services to this Resource Group`,
  // Content Delivery Network (CDN)
  fetchingContentDeliveryNetworkData:
    'Fetching Content Delivery Network (CDN) data...',
  doneFetchingContentDeliveryNetworkData: (num: number): string =>
    `✅ Done fetching Content Delivery Network (CDN) data in ${num}s ✅`,
  lookingForContentDeliveryNetwork:
    'Looking for Content Delivery Network (CDN) Service to add to Resource Groups...',
  addingContentDeliveryNetwork: (num: number): string =>
    `Created and adding ${num} Content Delivery Network (CDN) to this Resource Group`,
  // Content Delivery Network (CDN)
  fetchingDevOps: 'Fetching DevOps data...',
  doneFetchingDevOps: (num: number): string =>
    `✅ Done fetching DevOps data ${num}s ✅`,
  lookingForDevOps: 'Looking for DevOps to add to Resource Groups...',
  addingDevOpsPipelines: (num: number): string =>
    `Created and adding ${num} DevOps pipelines to this Resource Group`,
  addingInsightComponents: (num: number): string =>
    `Created and adding ${num} Insight Components to this Resource Group`,
  unableToFindSite: (name: string): string =>
    `⚠️  Unable to find site for Insight Component ${name} ⚠️`,
  // Azure CosmosDB
  fetchingCosmosDbData: 'Fetching CosmosDB data...',
  doneFetchingCosmosDbData: (num: number): string =>
    `✅ Done fetching CosmosDB data in ${num}s ✅`,
  lookingForCosmosDb: 'Looking for CosmosBD to add to Resource Groups...',
  addingAzureCosmosDbs: (num: number): string =>
    `Created and adding ${num} CosmosDbs to this Resource Group`,
  // Virtual Machine Scale Set
  fetchingVirtualMachineScaleSetData:
    'Fetching Virtual Machine Scale Set data...',
  doneFetchingVirtualMachineScaleSetData: (num: number): string =>
    `✅ Done fetching Virtual Machine Scale Set data in ${num}s ✅`,
  lookingForVmss:
    'Looking for Virtual Machine Scale Set data to add to Subnet...',
  addingVmsss: (num: number): string =>
    `Created and adding ${num} Virtual Machine Scale Set data to this Subnet`,
  // Virtual Machine
  fetchingVirtualMachineData: 'Fetching Virtual Machine data...',
  doneFetchingVirtualMachineData: (num: number): string =>
    `✅ Done fetching Virtual Machine data in ${num}s ✅`,
  lookingForVms: 'Looking for Virtual Machines to add to Subnet...',
  addingVms: (num: number): string =>
    `Created and adding ${num} Virtual Machines to this Subnet`,
  unableToFindNetworkInterface: (id: string): string =>
    `❌ WARNING: Unable to find Network Interface for VM ${id} - not added ❌`,
  // Key Vaults
  fetchingKeyVaults: 'Fetching Key Vaults...',
  fetchingMoreKeyVaults:
    'More than 1000 Key Vaults found, fetching more data...',
  fetchingKeyVaultData:
    'Fetching Key Vault data for this Azure account via the Azure SDK...',
  doneFetchingKeyVaultData: (num: number): string =>
    `✅ Done fetching Key Vault data in ${num}s ✅`,
  lookingForKeyVaults: 'Looking for Key Vaults to add to Resource Groups...',
  addingKeyVaults: (num: number): string =>
    `Created and adding ${num} Key Vaults to this Resource Group`,
  // Api Management
  fetchingApiManagementData: 'Fetching Api Management data...',
  doneFetchingApiManagementData: (num: number): string =>
    `✅ Done fetching Api Management data in ${num}s ✅`,
  lookingForApiManagements:
    'Looking for API Managements to add to Resource Groups...',
  addingApiManagements: (num: number): string =>
    `Created and adding ${num} API Management Services to Resource Groups...`,
  fetchingApiManagement:
    'Begin step 1) Fetching API Management Service Data...',
  foundApiManagementData: (num: number): string =>
    `End step 1) Fetched ${num} API Management Services`,
  fetchingAllApiManagementDataFor: (name: string): string =>
    `Fetching all API Management Data for ${name}`,
  fetchingApiManagementApis: (name: string): string =>
    `Begin step 2) Fetching API Management APIs for ${name} ...`,
  foundApiManagementApiData: (num: number, name: string): string =>
    `End step 2) Fetched ${num} API Management APIs for ${name}`,
  fetchingApiManagementApiDiagnostics: (name: string): string =>
    `Begin step 3) Fetching API Management API Diagnostics for ${name} ...`,
  foundApiManagementApiDiagnosticsData: (num: number, name: string): string =>
    `End step 3) Fetched ${num} API Management API Diagnostics for ${name}`,
  fetchingApiManagementApiOperations: (name: string): string =>
    `Begin step 4) Fetching API Management API Operations for ${name}...`,
  foundApiManagementApiOperationsData: (num: number, name: string): string =>
    `End step 4) Fetched ${num} API Management API Operations for ${name}`,
  fetchingApiManagementApiOperationsPolicy: (name: string): string =>
    `Begin step 5) Fetching API Management API Operations Policy for ${name}...`,
  fetchingApiManagementApiPolicy: (name: string): string =>
    `Begin step 6) Fetching API Management API Policy for ${name}...`,
  fetchingApiManagementApiVersionSet: (name: string): string =>
    `Skipping step 7) Version Sets are not currently supported skipping for ${name}`,
  fetchingApiManagementAuthorizationServers: (name: string): string =>
    `Begin step 8) Fetching API Management Authorization Servers for ${name}...`,
  foundApiManagementAuthorizationServersData: (num: number, name: string): string =>
    `End step 8) Fetched ${num} API Management Authorization Servers for ${name}`,
  fetchingApiManagementBackends: (name: string): string =>
    `Begin step 9) Fetching API Management Backends for ${name}...`,
  foundApiManagementBackendsData: (num: number, name: string): string =>
    `End step 9) Fetched ${num} API Management Backends for ${name}`,
  fetchingApiManagementCertificates: (name: string): string =>
    `Begin step 10) Fetching API Management Certificates for ${name}...`,
  foundApiManagementCertificatesData: (num: number, name: string): string =>
    `End step 10) Fetched ${num} API Management Certificates for ${name}`,
  fetchingApiManagementCustomDomains: (name: string): string =>
    `Skipping step 11) Custom Domains are not currently supported skipping for ${name}`,
  fetchingApiManagementGateways: (name: string): string =>
    `Begin step 12) Fetching API Management Gateways for ${name}...`,
  foundApiManagementGatewaysData: (num: number, name: string): string =>
    `End step 12) Fetched ${num} API Management Gateways for ${name}`,
  fetchingApiManagementGatewayApis: (name: string): string =>
    `Begin step 13) Fetching API Management Gateway APIs for ${name}...`,
  foundApiManagementGatewayApisData: (num: number, name: string): string =>
    `End step 13) Fetched ${num} API Management Gateway APIs for ${name}`,
  fetchingApiManagementDiagnostics: (name: string): string =>
    `Begin step 14) Fetching API Management Diagnostics for ${name}...`,
  foundApiManagementDiagnosticsData: (num: number, name: string): string =>
    `End step 14) Fetched ${num} API Management Diagnostics for ${name}`,
  fetchingApiManagementGroups: (name: string): string =>
    `Begin step 15) Fetching API Management Groups for ${name}...`,
  foundApiManagementGroupsData: (num: number, name: string): string =>
    `End step 15) Fetched ${num} API Management Groups for ${name}`,
  fetchingApiManagementGroupUsers: (name: string): string =>
    `Begin step 16) Fetching API Management Group Users for ${name}...`,
  foundApiManagementGroupUsersData: (num: number, name: string): string =>
    `End step 16) Fetched ${num} API Management Group Users for ${name}`,
  fetchingApiManagementIdentityProviders: (name: string): string =>
    `Begin step 17) Fetching API Management Identity Providers for ${name}...`,
  foundApiManagementIdentityProvidersData: (num: number, name: string): string =>
    `End step 17) Fetched ${num} API Management Identity Providers for ${name}`,
  fetchingApiManagementLoggers: (name: string): string =>
    `Begin step 18) Fetching API Management Loggers for ${name}...`,
  foundApiManagementLoggersData: (num: number, name: string): string =>
    `End step 18) Fetched ${num} API Management Loggers for ${name}`,
  fetchingApiManagementPolicy: (name: string): string =>
    `Begin step 19) Fetching API Management Policy for ${name}...`,
  fetchingApiManagementProducts: (name: string): string =>
    `Begin step 20) Fetching API Management Products for ${name}...`,
  foundApiManagementProductsData: (num: number, name: string): string =>
    `End step 20) Fetched ${num} API Management Products for ${name}`,
  fetchingApiManagementProductApis: (name: string): string =>
    `Begin step 21) Fetching API Management Product APIs for ${name}...`,
  foundApiManagementProductApisData: (num: number, name: string): string =>
    `End step 21) Fetched ${num} API Management Product APIs for ${name}`,
  fetchingApiManagementProductPolicy: (name: string): string =>
    `Begin step 22) Fetching API Management Product Policy for ${name}...`,
  fetchingApiManagementProperty: (name: string): string =>
    `Skipping step 23) Property is not currently supported skipping for ${name}`,
  fetchingApiManagementSubscriptions: (name: string): string =>
    `Begin step 24) Fetching API Management Subscriptions for ${name}...`,
  foundApiManagementSubscriptionsData: (num: number, name: string): string =>
    `End step 24) Fetched ${num} API Management Subscriptions for ${name}`,
  completedDataFetchForApiManagement: (name: string): string =>
    `✅ Finished fetching data for ${name}... ✅ `,
  // Recovery Serviecce (Azure Backup)
  fetchingRecoveryServicesData: 'Fetching Recovery Services data...',
  doneRecoveryServicesData: (num: number): string =>
    `✅ Done fetching Recovery Services data in ${num}s ✅`,
  lookingForRecoveryServices:
    'Looking for Recovery Services to add to Resource Groups...',
  addingRecoveryServices: (num: number): string =>
    `Created and adding ${num} Recovery Services to this Resource Group`,
  unknownRecoveryServiceBackupManagementType: (type: string): string =>
    `❌ WARNING: Unknown Recovery Service Backup Management Type: ${type}❌`,
  // SQL Virtual Machine
  fetchingSqlVirtualMachineData: 'Fetching SQL VirtualMachines data...',
  doneFetchingSqlVirtualMachineData: (num: number): string =>
    `✅ Done fetching  SQL VirtualMachine data in ${num}s ✅`,
  lookingForSqlVirtualMachines:
    'Looking for SQL VirtualMachines to add to Resource Groups...',
  addingSqlVirtualMachines: (num: number): string =>
    `Created and adding ${num} QL VirtualMachines to this Resource Group`,
  // Virtual WANs
  fetchingVirtualWANData: 'Fetching Virtual WANs data...',
  doneFetchingVirtualWANData: (num: number): string =>
    `✅ Done fetching Virtual WANs data in ${num}s ✅`,
  lookingForVirtualWANs: 'Looking for Virtual WAN to add to Resource Groups...',
  addingVirtualWAN: (num: number): string =>
    `Created and adding ${num} Virtual WANs to this Resource Group`,
  // Service Bus namespace
  fetchingServiceBus: 'Fetching Service Bus namespace data...',
  doneFetchingServiceBus: (num: number): string =>
    `✅ Done fetching Service Bus Services data in ${num}s ✅`,
  lookingForServiceBus:
    'Looking for Service Bus namespace to add to Resource Groups...',
  addingServiceBus: (num: number): string =>
    `Created and adding ${num} Service Bus namespaces to Resource Groups...`,
  // public IP
  fetchingPublicIpsData: 'Fetching Public IP data...',
  doneFetchingPublicIpsData: (num: number): string =>
    `✅ Done fetching Public IP data in ${num}s ✅`,
  lookingForPublicIps: 'Looking for Public IPs to add to Resource Groups...',
  addingPublicIps: (num: number): string =>
    `Created and adding ${num} Public IPs to this Resource Group`,
  // Event Grid
  fetchingEventGridData: 'Fetching Event Grid Domains data...',
  doneFetchingEventGridData: (num: number): string =>
    `✅ Done fetching Event Grid Domains data in ${num}s ✅`,
  lookingForEventGridDomain:
    'Looking for Event Grid Domains to add to Resource Groups...',
  addingEventGridDomains: (num: number): string =>
    `Created and adding ${num} Event Grid Domains to this Resource Group`,
  // Event Hub
  fetchingEventHubData: 'Fetching Event Hub data...',
  doneFetchingEventHubData: (num: number): string =>
    `✅ Done fetching Event Hub data in ${num}s ✅`,
  lookingForEventHubs: 'Looking for Event Hubs to add to Resource Groups...',
  addingEventHubs: (num: number): string =>
    `Created and adding ${num} Event Hubs to this Resource Group`,
  // Traffic Manager
  fetchingTrafficManagerData: 'Fetching Traffic Manager Profile data...',
  doneFetchingTrafficManagerData: (num: number): string =>
    `✅ Done fetching Traffic Manager Profile data in ${num}s ✅`,
  lookingForTrafficManagerProfiles:
    'Looking for Traffic Manager Profile to add to Resource Groups...',
  addingTrafficManagerProfiles: (num: number): string =>
    `Created and adding ${num} Traffic Manager Profiles to this Resource Group`,
}
