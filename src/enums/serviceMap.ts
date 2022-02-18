import services from './services'
import AzureADApplication from '../services/adApplication'
import AzureADGroup from '../services/adGroup'
import AzureADServicePrincipal from '../services/adServicePrincipal'
import AzureADUser from '../services/adUser'
import AzureAppServicePlan from '../services/appServicePlan'
import AzureAppServiceWebApp from '../services/appServiceWebApp'
import AzureAuthRoleAssignment from '../services/authRoleAssignment'
import AzureAuthRoleDefinition from '../services/authRoleDefinition'
import AzureDatabaseMySql from '../services/databaseMySql'
import AzureDatabasePostgreSql from '../services/databasePostgreSql'
import AzureDatabaseSql from '../services/databaseSql'
import AzureDatabaseSqlVm from '../services/databaseSqlVm'
import AzureDisk from '../services/disk'
import AzureDns from '../services/dns'
import AzureEventGrid from '../services/eventGrid'
import AzureEventHub from '../services/eventHub'
import AzureFirewall from '../services/firewall'
import AzureFunctionApp from '../services/functionApp'
import AzureKeyVault from '../services/keyVault'
import AzureMonitorInsightsActivityLogAlertRule from '../services/monitorInsightsActivityLogAlertRule'
import AzureNetworkInterface from '../services/networkInterface'
import AzureNetworkSecurityGroup from '../services/securityGroup'
import AzurePolicyAssignment from '../services/policyAssignment'
import AzurePrivateDns from '../services/privateDns'
import AzurePublicIp from '../services/publicIp'
import AzureResourceGroup from '../services/resourceGroup'
import AzureSecurityAssesments from '../services/securityAssesments'
import AzureSecurityPricings from '../services/securityPricings'
import AzureSecuritySettings from '../services/securitySettings'
import AzureStorageAccount from '../services/storageAccount'
import AzureStorageBlob from '../services/storageBlob'
import AzureStorageContainer from '../services/storageContainer'
import AzureTag from '../services/tag'
import AzureVirtualMachine from '../services/virtualMachine'
import AzureVirtualNetwork from '../services/virtualNetwork'
import AzureVirtualMachineScaleSet from '../services/virtualMachineScaleSet'
import AzureCdnEndpoints from '../services/cdnEndpoints'
import AzureCdnProfiles from '../services/cdnProfiles'
import AzureCdnCustomDomains from '../services/cdnCustomDomains'
import AzureCdnOrigins from '../services/cdnOrigins'
import AzureCdnOriginGroups from '../services/cdnOriginGroups'

/**
 * serviceMap is an object that contains all currently supported services for AWS
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.adApplication]: AzureADApplication,
  [services.adGroup]: AzureADGroup,
  [services.adServicePrincipal]: AzureADServicePrincipal,
  [services.adUser]: AzureADUser,
  [services.appServicePlan]: AzureAppServicePlan,
  [services.appServiceWebApp]: AzureAppServiceWebApp,
  [services.authRoleAssignment]: AzureAuthRoleAssignment,
  [services.authRoleDefinition]: AzureAuthRoleDefinition,
  [services.cdnCustomDomains]: AzureCdnCustomDomains,
  [services.cdnEndpoints]: AzureCdnEndpoints,
  [services.cdnProfiles]: AzureCdnProfiles,
  [services.cdnOrigins]: AzureCdnOrigins,
  [services.cdnOriginGroups]: AzureCdnOriginGroups,
  [services.databaseMySql]: AzureDatabaseMySql,
  [services.databasePostgreSql]: AzureDatabasePostgreSql,
  [services.databaseSql]: AzureDatabaseSql,
  [services.databaseSqlVm]: AzureDatabaseSqlVm,
  [services.disk]: AzureDisk,
  [services.dns]: AzureDns,
  [services.eventGrid]: AzureEventGrid,
  [services.eventHub]: AzureEventHub,
  [services.firewall]: AzureFirewall,
  [services.functionApp]: AzureFunctionApp,
  [services.keyVault]: AzureKeyVault,
  [services.monitorInsightsActivityLogAlertRule]:
    AzureMonitorInsightsActivityLogAlertRule,
  [services.networkInterface]: AzureNetworkInterface,
  [services.policyAssignment]: AzurePolicyAssignment,
  [services.privateDns]: AzurePrivateDns,
  [services.publicIp]: AzurePublicIp,
  [services.resourceGroup]: AzureResourceGroup,
  [services.securityAssesments]: AzureSecurityAssesments,
  [services.securityGroup]: AzureNetworkSecurityGroup,
  [services.securityPricings]: AzureSecurityPricings,
  [services.securitySettings]: AzureSecuritySettings,
  [services.storageAccount]: AzureStorageAccount,
  [services.storageBlob]: AzureStorageBlob,
  [services.virtualMachine]: AzureVirtualMachine,
  [services.virtualMachineScaleSet]: AzureVirtualMachineScaleSet,
  [services.virtualNetwork]: AzureVirtualNetwork,
  [services.storageContainer]: AzureStorageContainer,
  tag: AzureTag,
}
