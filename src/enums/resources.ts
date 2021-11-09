export default {
  disk: 'azurerm_managed_disk',
  region: 'azurerm_region', // Not a real TF resource, used to organize all regional resources
  subnet: 'azurerm_subnet',
  linuxVm: 'azurerm_linux_virtual_machine',
  function: 'azurerm_function', // Not a real TF resource, used to organize all regional resources
  keyVault: 'azurerm_key_vault',
  // sql server
  sqlServer: 'azurerm_sql_server',
  sdkSqlServer: 'Microsoft.Sql/servers',
  sqlDb: 'azurerm_sql_database',
  sdkSqlDb: 'Microsoft.Sql/servers/databases',
  sqlElasticPools: 'azurerm_mssql_elasticpool',
  sdkSqlElasticPools: 'Microsoft.Sql/servers/elasticPools',
  sqlFirewallRule: 'azurerm_sql_firewall_rule',
  sdkSqlFirewallRule: 'Microsoft.Sql/servers/firewallRules',
  // postgreSQL
  postgreSqlServer: 'azurerm_postgresql_server',
  sdkPostgreSqlServer: 'Microsoft.DBforPostgreSQL/servers',
  postgreSqlDb: 'azurerm_postgresql_database',
  sdkPostgreSqlDb: 'Microsoft.DBforPostgreSQL/servers/databases',
  postgreSqlConfiguration: 'azurerm_postgresql_configuration',
  sdkPostgreSqlConfiguration:
    'Microsoft.DBforPostgreSQL/servers/configurations',
  postgreSqlFirewallRule: 'azurerm_postgresql_firewall_rule',
  sdkPostgreSqlFirewallRule: 'Microsoft.DBforPostgreSQL/servers/firewallRules',
  // mySql
  mySqlServer: 'azurerm_mysql_server',
  sdkMySqlServer: 'Microsoft.DBforMySQL/servers',
  mySqlDb: 'azurerm_mysql_database',
  sdkMySqlDb: 'Microsoft.DBforMySQL/servers/databases',
  mySqlConfiguration: 'azurerm_mysql_configuration',
  sdkMySqlConfiguration: 'Microsoft.DBforMySQL/servers/configurations',
  mySqlFirewallRule: 'azurerm_mysql_firewall_rule',
  sdkMySqlFirewallRule: 'Microsoft.DBforMySQL/servers/firewallRules',

  windowsVm: 'azurerm_windows_virtual_machine',
  appService: 'azurerm_app_service',
  dataFactory: 'azurerm_data_factory',
  functionApp: 'azurerm_function_app',
  subscription: 'azurerm_subscription',
  resourceGroup: 'azurerm_resource_group',
  securityGroup: 'azurerm_network_security_group',
  virtualNetwork: 'azurerm_virtual_network',
  storageAccount: 'azurerm_storage_account',
  appServicePlan: 'azurerm_app_service_plan',
  storageContainer: 'azurerm_storage_container',
  networkInterface: 'azurerm_network_interface',
  dataFactoryDataset: 'azurerm_data_factory_dataset', // Not a real TF resource
  dataFactoryDataFlow: 'azurerm_data_factory_data_flow', // Not a real TF resource
  dataFactoryPipeline: 'azurerm_data_factory_pipeline',
  dataFactoryLinkedService: 'azurerm_data_factory_linked_service', // Not a real TF resource
  dataFactoryIntegrationRuntime: 'azurerm_data_factory_integration_runtime', // Not a real TF resource
  // public ip
  publicIp: 'azurerm_public_ip',
  sdkPublicIp: 'Microsoft.Network/publicIPAddresses',
  // load balancer
  loadBalancer: 'azurerm_lb',
  sdkLoadBalancer: 'Microsoft.Network/loadBalancers',
  frontendIpConfiguration: 'azurerm_frontend_ip_configuration',
  sdkFrontendIPConfiguration:
    'Microsoft.Network/loadBalancers/frontendIPConfigurations',
  loadBalancingRule: 'azurerm_lb_rule',
  sdkLoadBalancingRule: 'Microsoft.Network/loadBalancers/loadBalancingRules',
  loadBalancerBackEndAddressPool: 'azurerm_lb_backend_address_pool',
  sdkLoadBalancerBackEndAddressPool:
    'Microsoft.Network/loadBalancers/backendAddressPools',
  loadBalancerBackEndAddress: 'azurerm_lb_backend_address',
  sdkLoadBalancerBackEndAddress:
    'Microsoft.Network/loadBalancers/backendAddressPools/loadBalancerBackendAddresses',
  loadBalancerHealthProbe: 'azurerm_lb_probe',
  sdkLoadBalancerHealthProbe: 'Microsoft.Network/loadBalancers/probes',
  loadBalancerNATRule: 'azurerm_lb_nat_rule',
  sdkLoadBalancerNATRule: 'Microsoft.Network/loadBalancers/inboundNatRules',
  loadBalancerOutboundRule: 'azurerm_lb_outbound_rule',
  sdkLoadBalancerOutboundRule: 'Microsoft.Network/loadBalancers/outboundRules',
  // vmss
  sdkVirtualMachineScaleSets: 'Microsoft.Compute/virtualMachineScaleSets',
  sdkVirtualMachineScaleSetsVirtualMachine:
    'Microsoft.Compute/virtualMachineScaleSets/virtualMachines',
  linuxVmss: 'azurerm_linux_virtual_machine_scale_set',
  windowsVmss: 'azurerm_windows_virtual_machine_scale_set',
  // firewall
  firewall: 'azurerm_firewall',
  applicationRuleCollection: 'azurerm_firewall_application_rule_collection',
  natRuleCollection: 'azurerm_firewall_nat_rule_collection',
  networkRuleCollection: 'azurerm_firewall_network_rule_collection',
  ipConfigurations: 'azurerm_firewall_ip_configurations', // Not a real TF resource
  // kubernetes
  kubernetesCluster: 'azurerm_kubernetes_cluster',
  kubernetesClusterNodePool: 'azurerm_kubernetes_cluster_node_pool',
  managedIdentity: 'azurerm_managed_identity', // Not a real TF resource, used to connect aks
  operationalInsights: 'azurerm_operational_insights', // Not a real TF resource, used to connect aks
  cdnProfile: 'azurerm_cdn_profile',
  sdkCdnProfiles: 'Microsoft.Cdn/profiles',
  cdnEndpoint: 'azurerm_cdn_endpoint',
  sdkCdnEndpoints: 'Microsoft.Cdn/profiles/endpoints',
  cdnCustomDomain: 'azurerm_cdn_custom_domain', // Not a real TF resource
  sdkCdnCustomerDomains: 'Microsoft.Cdn/profiles/endpoints/customdomains',
  cdnOrigin: 'azurerm_cdn_origin', // Not a real TF resource
  sdkCdnOrigins: 'Microsoft.Cdn/profiles/endpoints/origins',
  cdnOriginGroup: 'azurerm_cdn_origin_group', // Not a real TF resource
  sdkCdnOriginGroups: 'Microsoft.Cdn/profiles/endpoints/origingroups',
  // devops
  devOpsPipeline: 'azurerm_devops_pipeline', // Not a real TF resource
  sdkDevOpsPipeline: 'Microsoft.DevOps/pipelines',
  insightsComponent: 'azurerm_insights_component', // Not a real TF resource
  sdkInsightsComponents: 'Microsoft.Insights/components',
  serverFarm: 'azurerm_server_farms', // Not a real TF resource
  sdkServerFarms: 'Microsoft.Web/serverfarms',
  site: 'azurerm_site', // Not a real TF resource
  sdkSites: 'Microsoft.Web/sites',
  // cosmosdb resources
  cosmosDbAccount: 'azurerm_cosmosdb_account',
  sdkCosmosDbAccount: 'Microsoft.DocumentDB/databaseAccounts',
  cosmosDbCasandraKeySpace: 'azurerm_cosmosdb_cassandra_keyspace',
  sdkCosmosDbCasandraKeySpace:
    'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces',
  sdkCosmosDbCasandraKeySpaceThroughputSettings:
    'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings',
  cosmosDbGremlinDatabase: 'azurerm_cosmosdb_gremlin_database',
  sdkCosmosDbGremlinDatabase:
    'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases',
  sdkCosmosDbGremlinDatabaseThroughputSettings:
    'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings',
  cosmosDbGremlinGraph: 'azurerm_cosmosdb_gremlin_graph',
  sdkCosmosDbGremlinGraph:
    'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs',
  cosmosDbMongoDatabase: 'azurerm_cosmosdb_mongo_database',
  sdkCosmosDbMongoDatabase:
    'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases',
  sdkCosmosDbMongoDatabaseThroughputSettings:
    'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings',
  cosmosDbMongoCollection: 'azurerm_cosmosdb_mongo_collection',
  sdkCosmosDbMongoCollection:
    'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections',
  cosmosDbSqlDatabase: 'azurerm_cosmosdb_sql_database',
  sdkCosmosDbSqlDatabase: 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases',
  sdkCosmosDbSqlDatabaseThroughputSettings:
    'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings',
  cosmosDbSqlContainer: 'azurerm_cosmosdb_sql_container',
  sdkCosmosDbSqlContainer:
    'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers',
  cosmosDbTable: 'azurerm_cosmosdb_table',
  sdkCosmosDbTable: 'Microsoft.DocumentDB/databaseAccounts/tables',
  sdkCosmosDbTableThroughputSettings:
    'Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings',
  // API Management resources
  sdkApiManagementService: 'Microsoft.ApiManagement/service',
  apiManagementService: 'azurerm_api_management',
  sdkApiManagementApi: 'Microsoft.ApiManagement/service/apis',
  apiManagementApi: 'azurerm_api_management_api',
  sdkApiManagementApiDiagnostics:
    'Microsoft.ApiManagement/service/apis/diagnostics',
  apiManagementApiDiagnostics: 'azurerm_api_management_api_diagnostic',
  sdkApiManagementApiOperations:
    'Microsoft.ApiManagement/service/apis/operations',
  apiManagementApiOperations: 'azurerm_api_management_api_operation',
  sdkApiManagementApiOperationPolicy:
    'Microsoft.ApiManagement/service/apis/operations/policies',
  apiManagementApiOperationPolicy:
    'azurerm_api_management_api_operation_policy',
  sdkApiManagementApiPolicy: 'Microsoft.ApiManagement/service/apis/policies',
  apiManagementApiPolicy: 'azurerm_api_management_api_policy',
  sdkApiManagementAuthorizationServer:
    'Microsoft.ApiManagement/service/authorizationServers',
  apiManagementAuthorizationServer:
    'azurerm_api_management_authorization_server',
  sdkApiManagementBackend: 'Microsoft.ApiManagement/service/backends',
  apiManagementBackend: 'azurerm_api_management_backend',
  sdkApiManagementCertificate: 'Microsoft.ApiManagement/service/certificates',
  apiManagementCertificate: 'azurerm_api_management_certificate',
  sdkApiManagementGateway: 'Microsoft.ApiManagement/service/gateways',
  apiManagementGateway: 'azurerm_api_management_certificate',
  sdkApiManagementGatewayApi: 'Microsoft.ApiManagement/service/gateways/apis',
  apiManagementGatewayApi: 'azurerm_api_management_gateways_apis',
  sdkApiManagementDiagnostic: 'Microsoft.ApiManagement/service/diagnostics',
  apiManagementDiagnostic: 'azurerm_api_management_diagnostic',
  sdkApiManagementGroup: 'Microsoft.ApiManagement/service/groups',
  apiManagementGroup: 'azurerm_api_management_group',
  sdkApiManagementGroupUser: 'Microsoft.ApiManagement/service/groups/users',
  apiManagementGroupUser: 'azurerm_api_management_group_user',
  sdkApiManagementIdentityProvider:
    'Microsoft.ApiManagement/service/identityProviders',
  apiManagementIdentityProvider: 'azurerm_api_management_identity_provider',
  sdkApiManagementLogger: 'Microsoft.ApiManagement/service/loggers',
  apiManagementLogger: 'azurerm_api_management_logger',
  sdkApiManagementPolicy: 'Microsoft.ApiManagement/service/policies',
  apiManagementPolicy: 'azurerm_api_management_policy',
  sdkApiManagementProduct: 'Microsoft.ApiManagement/service/products',
  apiManagementProduct: 'azurerm_api_management_product',
  sdkApiManagementProductApi: 'Microsoft.ApiManagement/service/products/apis',
  apiManagementProductApi: 'azurerm_api_management_product_api',
  sdkApiManagementProductPolicy:
    'Microsoft.ApiManagement/service/products/policies',
  apiManagementProductPolicy: 'azurerm_api_management_product_policy',
  sdkApiManagementSubscription: 'Microsoft.ApiManagement/service/subscriptions',
  apiManagementSubscription: 'azurerm_api_management_subscription',
  // Recovery Services
  recoveryServiceVault: 'azurerm_recovery_services_vault',
  sdkRecoveryServiceVault: 'Microsoft.RecoveryServices/vaults',
  recoveryServiceBackupPolicyStorage: 'azurerm_backup_policy_storage',
  recoveryServiceBackupPolicyIaasVM: 'azurerm_backup_policy_iaas_vm',
  recoveryServiceBackupPolicyWorkload: 'azurerm_backup_policy_workload',
  sdkRecoveryServiceBackupPolicy:
    'Microsoft.RecoveryServices/vaults/backupPolicies',
  recoveryBackupProtectedStorageItem: 'azurerm_backup_protected_storage_item',
  recoveryBackupProtectedIaasVmItem: 'azurerm_backup_protected_iaas_vm_item',
  recoveryServiceBackupProtectedWorkload:
    'azurerm_backup_protected_workload_item',
  sdkRecoveryBackupProtectedItem:
    'Microsoft.RecoveryServices/vaults/backupFabrics/protectionContainers/protectedItems',
  recoveryBackupStorageConfig: 'azurerm_backup_storage_config',
  sdkRecoveryBackupStorageConfig:
    'Microsoft.RecoveryServices/vaults/backupstorageconfig',
  recoveryBackupConfig: 'azurerm_backup_config',
  sdkRecoveryBackupConfig: 'Microsoft.RecoveryServices/vaults/backupconfig',
  // sql virtual machine
  sqlVirtualMachine: 'azurerm_sql_virtual_machine',
  // Virtual WAN resources
  virtualWAN: 'azurerm_virtual_wan',
  sdkVirtualHub: 'Microsoft.Network/virtualHubs',
  virtualHub: 'azurerm_virtual_hub',
  sdkVirtualHubRouteTable: 'Microsoft.Network/virtualHubs/hubRouteTables',
  virtualHubRouteTable: 'azurerm_virtual_hub_route_table',
  sdkVpnGateway: 'Microsoft.Network/vpnGateways',
  vpnGateway: 'azurerm_vpn_gateway',
  sdkVpnGatewayConnection: 'Microsoft.Network/vpnGateways/vpnConnections',
  vpnGatewayConnection: 'azurerm_vpn_gateway_connection',
  sdkExpressRouteGateway: 'Microsoft.Network/expressRouteGateways',
  expressRouteGateway: 'azurerm_express_route_gateway',
  sdkVpnSites: 'Microsoft.Network/vpnSites',
  vpnSites: 'azurerm_vpn_site',
  sdkVpnSiteLink: 'Microsoft.Network/vpnSites/vpnSiteLinks',
  vpnSiteLink: 'azurerm_vpn_site_link',
  // service bus resources
  sdkServiceBusNamespace: 'Microsoft.ServiceBus/Namespaces',
  serviceBusNamespace: 'azurerm_servicebus_namespace',
  sdkServicebusNamespaceAuthorizationRule:
    'Microsoft.ServiceBus/Namespaces/AuthorizationRules',
  servicebusNamespaceAuthorizationRule:
    'azurerm_servicebus_namespace_authorization_rule',
  sdkServicebusNamespaceNetworkRuleSet:
    'Microsoft.ServiceBus/Namespaces/NetworkRuleSets',
  servicebusNamespaceNetworkRuleSet:
    'azurerm_servicebus_namespace_network_rule_set',
  sdkServicebusQueue: 'Microsoft.ServiceBus/Namespaces/Queues',
  servicebusQueue: 'azurerm_servicebus_queue',
  sdkServicebusNamespaceDisasterRecoveryConfigs:
    'Microsoft.ServiceBus/Namespaces/disasterrecoveryconfigs',
  servicebusNamespaceDisasterRecoveryConfigs:
    'azurerm_servicebus_namespace_disaster_recovery_configs',
  // event grid domain
  eventGridDomain: 'azurerm_eventgrid_domain',
  eventGridDomainTopic: 'azurerm_eventgrid_domain_topic',
  // event hub
  eventHubNamespace: 'azurerm_eventhub_namespace',
  eventHub: 'azurerm_eventhub',
  eventHubConsumerGroup: 'azurerm_eventhub_consumer_group',
  // traffic manager
  trafficManagerProfile: 'azurerm_traffic_manager_profile',
  trafficManagerEndpoint: 'azurerm_traffic_manager_endpoint',
}
