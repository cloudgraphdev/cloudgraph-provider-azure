import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.actionGroup]: 'azureActionGroup',
  [services.activityLogAlerts]: 'azureActivityLogAlert',
  [services.adApplication]: 'azureADApplication',
  [services.adGroup]: 'azureADGroup',
  [services.adIdentitySecurityDefaultsEnforcementPolicy]:
    'azureAdIdentitySecurityDefaultsEnforcementPolicy',
  [services.adServicePrincipal]: 'azureADServicePrincipal',
  [services.adUser]: 'azureADUser',
  [services.aksManagedCluster]: 'azureAksManagedCluster',
  [services.appServiceEnvironment]: 'azureAppServiceEnvironment',
  // [services.appServiceKubeEnvironment]: 'azureAppServiceKubeEnvironment',
  [services.appInsights]: 'azureAppInsights',
  [services.appServicePlan]: 'azureAppServicePlan',
  [services.appServiceWebApp]: 'azureAppServiceWebApp',
  [services.arcConnectedCluster]: 'azureArcConnectedCluster',
  [services.authRoleAssignment]: 'azureAuthRoleAssignment',
  [services.authRoleDefinition]: 'azureAuthRoleDefinition',
  [services.autoProvisioningSettings]: 'azureAutoProvisioningSetting',
  [services.backupVault]: 'azureBackupVault',
  [services.backupInstance]: 'azureBackupInstance',
  [services.backupPolicy]: 'azureBackupPolicy',
  [services.cdnCustomDomains]: 'azureCdnCustomDomain',
  [services.cdnEndpoints]: 'azureCdnEndpoint',
  [services.cdnOriginGroups]: 'azureCdnOriginGroup',
  [services.cdnOriginGroups]: 'azureCdnOriginGroup',
  [services.cdnOrigins]: 'azureCdnOrigin',
  [services.cdnOrigins]: 'azureCdnOrigin',
  [services.cdnProfiles]: 'azureCdnProfile',
  [services.cognitiveServicesAccount]: 'azureCognitiveServicesAccount',
  [services.containerRegistry]: 'azureContainerRegistry',
  [services.cosmosDb]: 'azureCosmosDb',
  [services.dataCollectionRule]: 'azureDataCollectionRule',
  [services.dataFactory]: 'azureDataFactory',
  [services.databaseManagedSqlInstance]: 'azureDatabaseManagedSqlInstance',
  [services.databaseMySql]: 'azureDatabaseMySql',
  [services.databasePostgreSql]: 'azureDatabasePostgreSql',
  [services.databaseSqlVm]: 'azureDatabaseSqlVm',
  [services.databaseSql]: 'azureDatabaseSql',
  [services.dataLakeStorageAccounts]: 'azureDataLakeStorageAccount',
  [services.diagnosticSettings]: 'azureDiagnosticSetting',
  [services.disk]: 'azureDisk',
  [services.dns]: 'azureDnsZone',
  [services.eventGrid]: 'azureEventGrid',
  [services.eventHub]: 'azureEventHub',
  [services.expressRouteGateways]: 'azureExpressRouteGateway',
  [services.fileShare]: 'azureFileShare',
  [services.firewall]: 'azureFirewall',
  [services.functionApp]: 'azureFunctionApp',
  [services.integrationRuntime]: 'azureIntegrationRuntime',
  [services.keyVault]: 'azureKeyVault',
  [services.loadBalancer]: 'azureLoadBalancer',
  [services.logAnalyticsSolution]: 'azureLogAnalyticsSolution',
  [services.logAnalyticsWorkspace]: 'azureLogAnalyticsWorkspace',
  [services.machineLearningWorkspaces]: 'azureMachineLearningWorkspace',  
  [services.metricAlert]:'azureMetricAlert',
  [services.mySqlServers]: 'azureMySqlServer',
  [services.networkInterface]: 'azureNetworkInterface',
  [services.policyAssignment]: 'azurePolicyAssignment',
  [services.postgreSqlServers]: 'azurePostgreSqlServer',
  [services.privateDns]: 'azurePrivateDnsZone',
  [services.publicIp]: 'azurePublicIp',
  [services.recoveryVaults]: 'azureRecoveryVault',
  [services.redisCaches]: 'azureRedisCache',
  [services.replicationAppliances]: 'azureReplicationAppliance',
  [services.replicationCenters]: 'azureReplicationCenter',
  [services.replicationNetworks]: 'azureReplicationNetwork',
  [services.resourceGroup]: 'azureResourceGroup',
  [services.securityAssesments]: 'azureSecurityAssesment',
  [services.securityContacts]: 'azureSecurityContact',
  [services.securityGroup]: 'azureNetworkSecurityGroup',
  [services.securityPricings]: 'azureSecurityPricing',
  [services.securitySettings]: 'azureSecuritySetting',
  [services.serviceBus]: 'azureServiceBus',
  [services.sqlServers]: 'azureSqlServer',
  [services.storageAccount]: 'azureStorageAccount',
  [services.storageBlob]: 'azureStorageBlob',
  [services.storageContainer]: 'azureStorageContainer',
  [services.synapseBigDataPools]: 'azureSynapseBigDataPool',
  [services.synapseSqlPools]: 'azureSynapseSqlPool',
  [services.synapseWorkspaces]: 'azureSynapseWorkspace',
  [services.trafficManagerProfile]: 'azureTrafficManagerProfile',
  [services.virtualMachineScaleSet]: 'azureVirtualMachineScaleSet',
  [services.virtualMachine]: 'azureVirtualMachine',
  [services.virtualNetwork]: 'azureVirtualNetwork',
  tag: 'azureTag',
}
