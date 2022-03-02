import services from './services'
import AzureADApplication from '../services/adApplication'
import AzureADGroup from '../services/adGroup'
import AzureADIdentitySecurityDefaultsEnforcementPolicy from '../services/adIdentitySecurityDefaultsEnforcementPolicy'
import AzureADServicePrincipal from '../services/adServicePrincipal'
import AzureADUser from '../services/adUser'
import AzureAppServicePlan from '../services/appServicePlan'
import AzureAppServiceWebApp from '../services/appServiceWebApp'
import AzureAuthRoleAssignment from '../services/authRoleAssignment'
import AzureAuthRoleDefinition from '../services/authRoleDefinition'
import AzureCdnCustomDomains from '../services/cdnCustomDomains'
import AzureCdnEndpoints from '../services/cdnEndpoints'
import AzureCdnOriginGroups from '../services/cdnOriginGroups'
import AzureCdnOrigins from '../services/cdnOrigins'
import AzureCdnProfiles from '../services/cdnProfiles'
import AzureContainerRegistry from '../services/containerRegistry'
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
import AzureLoadBalancer from '../services/loadBalancer'
import AzureMonitorInsightsActivityLogAlertRule from '../services/monitorInsightsActivityLogAlertRule'
import AzureNetworkInterface from '../services/networkInterface'
import AzureNetworkSecurityGroup from '../services/securityGroup'
import AzurePolicyAssignment from '../services/policyAssignment'
import AzurePrivateDns from '../services/privateDns'
import AzurePublicIp from '../services/publicIp'
import AzureResourceGroup from '../services/resourceGroup'
import AzureSecurityAssesments from '../services/securityAssesments'
import AzureSecurityContacts from '../services/securityContacts'
import AzureSecurityPricings from '../services/securityPricings'
import AzureSecuritySettings from '../services/securitySettings'
import AzureStorageAccount from '../services/storageAccount'
import AzureStorageBlob from '../services/storageBlob'
import AzureStorageContainer from '../services/storageContainer'
import AzureTag from '../services/tag'
import AzureVirtualMachine from '../services/virtualMachine'
import AzureVirtualMachineScaleSet from '../services/virtualMachineScaleSet'
import AzureVirtualNetwork from '../services/virtualNetwork'

/**
 * serviceMap is an object that contains all currently supported services for AWS
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.adApplication]: AzureADApplication,
  [services.adGroup]: AzureADGroup,
  [services.adIdentitySecurityDefaultsEnforcementPolicy]: AzureADIdentitySecurityDefaultsEnforcementPolicy,
  [services.adServicePrincipal]: AzureADServicePrincipal,
  [services.adUser]: AzureADUser,
  [services.appServicePlan]: AzureAppServicePlan,
  [services.appServiceWebApp]: AzureAppServiceWebApp,
  [services.authRoleAssignment]: AzureAuthRoleAssignment,
  [services.authRoleDefinition]: AzureAuthRoleDefinition,
  [services.cdnCustomDomains]: AzureCdnCustomDomains,
  [services.cdnEndpoints]: AzureCdnEndpoints,
  [services.cdnOriginGroups]: AzureCdnOriginGroups,
  [services.cdnOrigins]: AzureCdnOrigins,
  [services.cdnProfiles]: AzureCdnProfiles,
  [services.containerRegistry]: AzureContainerRegistry,
  [services.databaseMySql]: AzureDatabaseMySql,
  [services.databasePostgreSql]: AzureDatabasePostgreSql,
  [services.databaseSqlVm]: AzureDatabaseSqlVm,
  [services.databaseSql]: AzureDatabaseSql,
  [services.disk]: AzureDisk,
  [services.dns]: AzureDns,
  [services.eventGrid]: AzureEventGrid,
  [services.eventHub]: AzureEventHub,
  [services.firewall]: AzureFirewall,
  [services.functionApp]: AzureFunctionApp,
  [services.keyVault]: AzureKeyVault,
  [services.loadBalancer]: AzureLoadBalancer,
  [services.monitorInsightsActivityLogAlertRule]:AzureMonitorInsightsActivityLogAlertRule,
  [services.networkInterface]: AzureNetworkInterface,
  [services.policyAssignment]: AzurePolicyAssignment,
  [services.privateDns]: AzurePrivateDns,
  [services.publicIp]: AzurePublicIp,
  [services.resourceGroup]: AzureResourceGroup,
  [services.securityAssesments]: AzureSecurityAssesments,
  [services.securityContacts]: AzureSecurityContacts,
  [services.securityGroup]: AzureNetworkSecurityGroup,
  [services.securityPricings]: AzureSecurityPricings,
  [services.securitySettings]: AzureSecuritySettings,
  [services.storageAccount]: AzureStorageAccount,
  [services.storageBlob]: AzureStorageBlob,
  [services.storageContainer]: AzureStorageContainer,
  [services.virtualMachineScaleSet]: AzureVirtualMachineScaleSet,
  [services.virtualMachine]: AzureVirtualMachine,
  [services.virtualNetwork]: AzureVirtualNetwork,
  tag: AzureTag,
}
