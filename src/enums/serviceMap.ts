import services from './services'
import AzureDisk from '../services/disk'
import AzureDns from '../services/dns'
import AzureFirewall from '../services/firewall'
import AzureFunctionApp from '../services/functionApp'
import AzureKeyVault from '../services/keyVault'
import AzureNetworkInterface from '../services/networkInterface'
import AzureNetworkSecurityGroup from '../services/securityGroup'
import AzurePolicyAssigment from '../services/policyAssigment'
import AzurePublicIp from '../services/publicIp'
import AzureResourceGroup from '../services/resourceGroup'
import AzureSecurityAssesments from '../services/securityAssesments'
import AzureSecurityPricings from '../services/securityPricings'
import AzureSecuritySettings from '../services/securitySettings'
import AzureStorageAccount from '../services/storageAccount'
import AzureStorageContainer from '../services/storageContainer'
import AzureTag from '../services/tag'
import AzureVirtualMachine from '../services/virtualMachine'
import AzureVirtualNetwork from '../services/virtualNetwork'

/**
 * serviceMap is an object that contains all currently supported services for AWS
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.disk]: AzureDisk,
  [services.dns]: AzureDns,
  [services.firewall]: AzureFirewall,
  [services.functionApp]: AzureFunctionApp,
  [services.keyVault]: AzureKeyVault,
  [services.networkInterface]: AzureNetworkInterface,
  [services.policyAssigment]: AzurePolicyAssigment,
  [services.publicIp]: AzurePublicIp,
  [services.resourceGroup]: AzureResourceGroup,
  [services.securityAssesments]: AzureSecurityAssesments,
  [services.securityGroup]: AzureNetworkSecurityGroup,
  [services.securityPricings]: AzureSecurityPricings,
  [services.securitySettings]: AzureSecuritySettings,
  [services.storageAccount]: AzureStorageAccount,
  [services.virtualMachine]: AzureVirtualMachine,
  [services.virtualNetwork]: AzureVirtualNetwork,
  [services.storageContainer]: AzureStorageContainer,
  tag: AzureTag,
}
