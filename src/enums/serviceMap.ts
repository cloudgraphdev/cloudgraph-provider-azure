import services from './services'
import AzureActionGroup from '../services/actionGroup'
import AzureActivityLogAlerts from '../services/activityLogAlerts'
import AzureADApplication from '../services/adApplication'
import AzureADGroup from '../services/adGroup'
import AzureADIdentitySecurityDefaultsEnforcementPolicy from '../services/adIdentitySecurityDefaultsEnforcementPolicy'
import AzureADServicePrincipal from '../services/adServicePrincipal'
import AzureADUser from '../services/adUser'
import AzureAksManagedCluster from '../services/aksManagedCluster'
import AzureMetricAlert from '../services/metricAlert'
import AzureAppServiceEnvironment from '../services/appServiceEnvironment'
// import AzureAppServiceKubeEnvironment from '../services/appServiceKubeEnvironment'
import AzureAppServicePlan from '../services/appServicePlan'
import AzureAppServiceWebApp from '../services/appServiceWebApp'
import AzureArcConnectedCluster from '../services/arcConnectedCluster'
import AzureAuthRoleAssignment from '../services/authRoleAssignment'
import AzureAuthRoleDefinition from '../services/authRoleDefinition'
import AzureAutoProvisioningSettings from '../services/autoProvisioningSettings'
import AzureCdnCustomDomains from '../services/cdnCustomDomains'
import AzureCdnEndpoints from '../services/cdnEndpoints'
import AzureCdnOriginGroups from '../services/cdnOriginGroups'
import AzureCdnOrigins from '../services/cdnOrigins'
import AzureCdnProfiles from '../services/cdnProfiles'
import AzureCognitiveServicesAccount from '../services/cognitiveServicesAccount'
import AzureContainerRegistry from '../services/containerRegistry'
import AzureDataCollectionRule from '../services/dataCollectionRule'
import AzureDataFactory from '../services/dataFactory'
import AzureDatabaseManagedSqlInstance from '../services/databaseManagedSqlInstance'
import AzureDatabaseMySql from '../services/databaseMySql'
import AzureDatabasePostgreSql from '../services/databasePostgreSql'
import AzureDatabaseSql from '../services/databaseSql'
import AzureDatabaseSqlVm from '../services/databaseSqlVm'
import AzureDataLakeStorageAccount from '../services/dataLakeStorageAccounts'
import AzureDiagnosticSettings from '../services/diagnosticSettings'
import AzureDisk from '../services/disk'
import AzureDns from '../services/dns'
import AzureEventGrid from '../services/eventGrid'
import AzureEventHub from '../services/eventHub'
import AzureExpressRouteGateway from '../services/expressRouteGateways'
import AzureFileShare from '../services/fileShare'
import AzureFirewall from '../services/firewall'
import AzureFunctionApp from '../services/functionApp'
import AzureKeyVault from '../services/keyVault'
import AzureLoadBalancer from '../services/loadBalancer'
import AzureMachineLearningWorkspace from '../services/machineLearningWorkspaces'
import AzureMySqlServer from '../services/mySqlServers'
import AzureNetworkInterface from '../services/networkInterface'
import AzureNetworkSecurityGroup from '../services/securityGroup'
import AzurePolicyAssignment from '../services/policyAssignment'
import AzurePostgreSqlServer from '../services/postgreSqlServers'
import AzurePrivateDns from '../services/privateDns'
import AzurePublicIp from '../services/publicIp'
import AzureRecoveryVault from '../services/recoveryVaults'
import AzureRedisCache from '../services/redisCache'
import AzureReplicationAppliance from '../services/replicationAppliances'
import AzureReplicationCenter from '../services/replicationCenters'
import AzureReplicationNetwork from '../services/replicationNetworks'
import AzureReplicationPolicy from '../services/replicationPolicies'
import AzureResourceGroup from '../services/resourceGroup'
import AzureSecurityAssesments from '../services/securityAssesments'
import AzureSecurityContacts from '../services/securityContacts'
import AzureSecurityPricings from '../services/securityPricings'
import AzureSecuritySettings from '../services/securitySettings'
import AzureStorageAccount from '../services/storageAccount'
import AzureStorageBlob from '../services/storageBlob'
import AzureStorageContainer from '../services/storageContainer'
import AzureTag from '../services/tag'
import AzureTrafficManagerProfile from '../services/trafficManagerProfile'
import AzureVirtualMachine from '../services/virtualMachine'
import AzureVirtualMachineScaleSet from '../services/virtualMachineScaleSet'
import AzureVirtualNetwork from '../services/virtualNetwork'
import AzureSqlServers from '../services/sqlServers'
import AzureLogAnalyticsSolutions from '../services/logAnalyticsSolution'
import AzureLogAnalyticsWorkspaces from '../services/logAnalyticsWorkspace'
import AzureCosmosDb from '../services/cosmosDb'
import AzureAppInsights from '../services/appInsights'
import AzureIntegrationRuntime from '../services/integrationRuntimes' 
import AzureServiceBus from '../services/serviceBus'
import AzureBackupVault from '../services/backupVault'
import AzureBackupInstance from '../services/backupInstance'
import AzureBackupPolicy from '../services/backupPolicy'

/**
 * serviceMap is an object that contains all currently supported services for AWS
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.actionGroup]: AzureActionGroup,
  [services.activityLogAlerts]: AzureActivityLogAlerts,
  [services.adApplication]: AzureADApplication,
  [services.adGroup]: AzureADGroup,
  [services.adIdentitySecurityDefaultsEnforcementPolicy]:
    AzureADIdentitySecurityDefaultsEnforcementPolicy,
  [services.adServicePrincipal]: AzureADServicePrincipal,
  [services.adUser]: AzureADUser,
  [services.aksManagedCluster]: AzureAksManagedCluster,
  [services.metricAlert]: AzureMetricAlert,
  [services.appServiceEnvironment]: AzureAppServiceEnvironment,
  // [services.appServiceKubeEnvironment]: AzureAppServiceKubeEnvironment,
  [services.appInsights]: AzureAppInsights,
  [services.appServicePlan]: AzureAppServicePlan,
  [services.appServiceWebApp]: AzureAppServiceWebApp,
  [services.arcConnectedCluster]: AzureArcConnectedCluster,
  [services.authRoleAssignment]: AzureAuthRoleAssignment,
  [services.authRoleDefinition]: AzureAuthRoleDefinition,
  [services.autoProvisioningSettings]: AzureAutoProvisioningSettings,
  [services.backupVault]: AzureBackupVault,
  [services.backupInstance]: AzureBackupInstance,
  [services.backupPolicy]: AzureBackupPolicy,
  [services.cdnCustomDomains]: AzureCdnCustomDomains,
  [services.cdnEndpoints]: AzureCdnEndpoints,
  [services.cdnOriginGroups]: AzureCdnOriginGroups,
  [services.cdnOriginGroups]: AzureCdnOriginGroups,
  [services.cdnOrigins]: AzureCdnOrigins,
  [services.cdnOrigins]: AzureCdnOrigins,
  [services.cdnProfiles]: AzureCdnProfiles,
  [services.cognitiveServicesAccount]: AzureCognitiveServicesAccount,
  [services.containerRegistry]: AzureContainerRegistry,
  [services.cosmosDb]: AzureCosmosDb,
  [services.dataCollectionRule]: AzureDataCollectionRule,
  [services.dataFactory]: AzureDataFactory,
  [services.databaseManagedSqlInstance]: AzureDatabaseManagedSqlInstance,
  [services.databaseMySql]: AzureDatabaseMySql,
  [services.databasePostgreSql]: AzureDatabasePostgreSql,
  [services.databaseSqlVm]: AzureDatabaseSqlVm,
  [services.databaseSql]: AzureDatabaseSql,
  [services.dataLakeStorageAccounts]: AzureDataLakeStorageAccount,
  [services.diagnosticSettings]: AzureDiagnosticSettings,
  [services.disk]: AzureDisk,
  [services.dns]: AzureDns,
  [services.eventGrid]: AzureEventGrid,
  [services.eventHub]: AzureEventHub,
  [services.expressRouteGateways]: AzureExpressRouteGateway,
  [services.fileShare]: AzureFileShare,
  [services.firewall]: AzureFirewall,
  [services.functionApp]: AzureFunctionApp,
  [services.integrationRuntime]: AzureIntegrationRuntime,
  [services.keyVault]: AzureKeyVault,
  [services.loadBalancer]: AzureLoadBalancer,
  [services.logAnalyticsSolution]: AzureLogAnalyticsSolutions,
  [services.logAnalyticsWorkspace]: AzureLogAnalyticsWorkspaces,
  [services.machineLearningWorkspaces]: AzureMachineLearningWorkspace,
  [services.mySqlServers]: AzureMySqlServer,
  [services.networkInterface]: AzureNetworkInterface,
  [services.policyAssignment]: AzurePolicyAssignment,
  [services.postgreSqlServers]: AzurePostgreSqlServer,
  [services.privateDns]: AzurePrivateDns,
  [services.publicIp]: AzurePublicIp,
  [services.recoveryVaults]: AzureRecoveryVault,
  [services.redisCaches]: AzureRedisCache,
  [services.replicationAppliances]: AzureReplicationAppliance,
  [services.replicationCenters]: AzureReplicationCenter,
  [services.replicationNetworks]: AzureReplicationNetwork,
  [services.replicationPolicies]: AzureReplicationPolicy,
  [services.resourceGroup]: AzureResourceGroup,
  [services.securityAssesments]: AzureSecurityAssesments,
  [services.securityContacts]: AzureSecurityContacts,
  [services.securityGroup]: AzureNetworkSecurityGroup,
  [services.securityPricings]: AzureSecurityPricings,
  [services.securitySettings]: AzureSecuritySettings,
  [services.serviceBus]: AzureServiceBus,
  [services.sqlServers]: AzureSqlServers,
  [services.storageAccount]: AzureStorageAccount,
  [services.storageBlob]: AzureStorageBlob,
  [services.storageContainer]: AzureStorageContainer,
  [services.trafficManagerProfile]: AzureTrafficManagerProfile,
  [services.virtualMachineScaleSet]: AzureVirtualMachineScaleSet,
  [services.virtualMachine]: AzureVirtualMachine,
  [services.virtualNetwork]: AzureVirtualNetwork,
  tag: AzureTag,
}
