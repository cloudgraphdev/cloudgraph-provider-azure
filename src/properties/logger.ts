/* eslint-disable max-len */
export default {
  // Action Group
  foundActionGroups: (num: number): string =>
  `Found ${num} action groups`,
  // Activity Log Alerts
  foundActivityLogAlerts: (num: number): string =>
    `Found ${num} Activity Log Alerts`,
  /* Active Directory */
  foundAdApplications: (num: number): string => `Found ${num} AD applications`,
  foundAdGroups: (num: number): string => `Found ${num} AD groups`,
  foundAdIdentitySecurityDefaultsEnforcementPolicy: (num: number): string =>
    `Found ${num} AD Identity Security Defaults Enforcement Policy`,
  foundAdServicePrincipals: (num: number): string =>
    `Found ${num} AD service principals`,
  foundAdUsers: (num: number): string => `Found ${num} AD users`,
  // Arc Connected Clusters
  foundArcConnectedClusters: (num: number): string =>
    `Found ${num} Arc connected clusters`,
  // AKS Managed Clusters
  foundAKSManagedClusters: (num: number): string =>
    `Found ${num} AKS managed clusters`,
  /* App Service */
  foundAppServiceEnvironments: (num: number): string =>
    `Found ${num} app service environments`,
  foundKubesEnvs: (num: number): string => `Found ${num} kube environments`,
  foundAppServicePlans: (num: number): string =>
    `Found ${num} app service plans`,
  foundWebApps: (num: number): string => `Found ${num} web apps`,
  foundWebAppsSiteAuthSettings: (num: number): string =>
    `Found ${num} web apps site auth settings`,
  foundWebAppsSiteConfigs: (num: number): string =>
    `Found ${num} web apps site configs`,
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
  // AutoProvisioningSetting
  foundAutoProvisioningSettings: (num: number): string =>
    `Found ${num} auto provisioning settings`,
  // Azure Backup
  foundBackupVaults: (num: number): string => `Found ${num} Backup Vaults`,
  foundBackupInstances: (num: number): string => `Found ${num} Backup Instances`,
  foundBackupPolicies: (num: number): string => `Found ${num} Backup Policies`,
  /* Cognitive services account */
  foundCognitiveServicesAccounts: (num: number): string => `Found ${num} cognitive services accounts`,
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
  /* Cosmos DB */
  foundCosmosDbAccounts: (num: number): string => `Found ${num} cosmos DB accounts`,
  /* Data Collection Rule */
  foundDataCollectionRules: (num: number): string => `Found ${num} data collection rules`,
  /* Data Factory */
  foundDataFactory: (num: number): string => `Found ${num} data factories`,
  foundIntegrationRuntimes: (num: number): string => `Found ${num} integration runtimes`,
  /* Database */
  foundManagedSqlInstance: (num: number): string =>
    `Found ${num} managed SQL instances`,
  foundDatabaseMySql: (num: number): string => `Found ${num} MySQL databases`,
  foundDatabasePostgreSql: (num: number): string =>
    `Found ${num} PostgreSQL databases`,
  foundDatabaseSql: (num: number): string => `Found ${num} SQL databases`,
  foundDatabaseSqlVm: (num: number): string =>
    `Found ${num} SQL virtual machines`,
  // Data Lake
  foundDataLakeStorageAccounts: (num: number): string => `Found ${num} Data Lake storage accounts`,
  // Diagnostic Settings
  foundDiagnosticSettingsResources: (num: number): string => `Found ${num} diagnostic settings`,
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
  // ExpressRouteGateways
  foundExpressRouteGateways: (num: number): string => `Found ${num} ExpressRoute Gateways`,
  // File Share
  foundFileShares: (num: number): string => `Found ${num} file shares`,
  // Firewall
  foundFirewalls: (num: number): string => `Found ${num} firewalls`,
  // Azure Functions
  foundFunctionApps: (num: number): string => `Found ${num} function apps`,
  foundFunctions: (num: number): string => `Found ${num} functions`,
  foundFunctionAppsSiteConfigs: (num: number): string =>
    `Found ${num} function apps site configs`,
  // Key Vault
  foundKeyVault: (num: number): string => `Found ${num} Key Vault`,
  foundKeyVaultKeys: (num: number): string => `Found ${num} Key Vault keys`,
  foundKeyVaultSecrets: (num: number): string =>
    `Found ${num} Key Vault secrets`,
  // Load balancer
  foundLoadBalancers: (num: number): string => `Found ${num} load balancers`,
  // Machine Learning Workspaces
  foundMachineLearningWorkspaces: (num: number): string => `Found ${num} machine learning workspaces`,  
  // Metric Alert
  foundMetricAlerts: (num: number): string => `Found ${num} metric alerts`,
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
  // Recovery Vaults
  foundRecoveryVaults: (num: number): string => `Found ${num} recovery vaults`,
  // RedisCache
  foundRedisCaches: (num: number): string => `Found ${num} Redis caches`,
  // Replication Appliances
  foundReplicationAppliances: (num: number): string => `Found ${num} replication appliances`,
  // Replication Centers
  foundReplicationCenters: (num: number): string => `Found ${num} replication centers`,
  // Replication Networks
  foundReplicationNetworks: (num: number): string => `Found ${num} replication networks`,
  // Replication Policies
  foundReplicationPolicies: (num: number): string => `Found ${num} replication policies`,
  // Resource Groups
  foundResourceGroups: (num: number): string => `Found ${num} resource groups`,
  // Security Assesments
  foundSecurityAssesments: (num: number): string =>
    `Found ${num} security assesments`,
  // Security Contacts
  foundSecurityContacts: (num: number): string =>
    `Found ${num} security contacts`,
  // Security Groups
  foundSecurityGroups: (num: number): string => `Found ${num} security groups`,
  foundSecurityGroupFlowLogs: (num: number): string =>
    `Found ${num} security group flow logs`,
  // Security Pricings
  foundSecurityPricings: (num: number): string =>
    `Found ${num} security pricings`,
  // Security Settings
  foundSecuritySettings: (num: number): string =>
    `Found ${num} security settings`,
  // Service Bus
  foundServiceBus: (num: number): string => `Found ${num} service bus`,
  // SQL Servers
  foundPostgreSqlServers: (num: number): string =>
    `Found ${num} PostgreSQL servers`,
  foundSqlServers: (num: number): string => `Found ${num} SQL servers`,
  foundMySqlServers: (num: number): string => `Found ${num} MySQL servers`,
  // Storage Account
  foundStorageAccounts: (num: number): string =>
    `Found ${num} storage accounts`,
  // Storage Containers
  foundStorageContainers: (num: number): string =>
    `Found ${num} storage containers`,
  // Storage Blobs
  foundStorageBlobs: (num: number): string => `Found ${num} storage blobs`,
  // SynapseBigDataPools
  foundSynapseBigDataPools: (num: number): string => `Found ${num} synapse big data pools`,
  // SynapseSqlPools
  foundSynapseSqlPools: (num: number): string => `Found ${num} synapse SQL pools`,
  // SynapseWorkspace
  foundSynapseWorkspaces: (num: number): string => `Found ${num} synapse workspaces`,
  // Traffic Manager
  foundTrafficManagerProfile: (num: number): string =>
    `Found ${num} traffic manager profiles`,
  // Virtual Machines
  foundvirtualMachines: (num: number): string =>
    `Found ${num} virtual machines`,
  // Virtual Machines Scale Sets
  foundvirtualMachinesScaleSets: (num: number): string =>
    `Found ${num} virtual machines scale sets`,
  // Virtual Networks
  foundvirtualNetworks: (num: number): string =>
    `Found ${num} virtual networks`,
  // Log Analytics Solutions
  foundLogAnalyticsSolutions: (num: number): string =>
    `Found ${num} log analytics solutions`,
  // Log Analytics Workspaces
  foundLogAnalyticsWorkspaces: (num: number): string =>
    `Found ${num} log analytics workspaces`,
  // Application Insights
  foundAppInsights: (num: number): string =>
    `Found ${num} application insights`,
  // Generic Rest API
  fetchedDataFromRestApi: (url: string): string =>
    `Fetched data from Azure REST API: ${url}`,
  /* Other */
  fetchingMoreRestApiData: 'Found more REST API data, fetching more data...',
}
