import services from './services'
import AzureDisk from '../services/disk'
import AzureDns from '../services/dns'
import AzureFirewall from '../services/firewall'
import AzureFunctionApp from '../services/functionApp'
import AzureKeyVault from '../services/keyVault'
import AzureNetworkInterface from '../services/networkInterface'
import AzureNetworkSecurityGroup from '../services/securityGroup'
import AzurePublicIp from '../services/publicIp'
import AzureResourceGroup from '../services/resourceGroup'
import AzureStorageAccount from '../services/storageAccount'
import AzureTag from '../services/tag'
import AzureVirtualMachine from '../services/virtualMachine'
import AzureVirtualNetwork from '../services/virtualNetwork'
import AzureStorageContainer from '../services/storageContainer'

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
  [services.publicIp]: AzurePublicIp,
  [services.resourceGroup]: AzureResourceGroup,
  [services.securityGroup]: AzureNetworkSecurityGroup,
  [services.storageAccount]: AzureStorageAccount,
  [services.virtualMachine]: AzureVirtualMachine,
  [services.virtualNetwork]: AzureVirtualNetwork,
  [services.storageContainer]: AzureStorageContainer,
  tag: AzureTag,
}
