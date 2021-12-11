import services from './services'
import AzureDisk from '../services/disk'
import AzureDns from '../services/dns'
import AzureFunctionApp from '../services/functionApp'
import AzurePublicIp from '../services/publicIp'
import AzureNetworkInterface from '../services/networkInterface'
import AzureResourceGroup from '../services/resourceGroup'
import AzureNetworkSecurityGroup from '../services/securityGroup'
import AzureStorageAccount from '../services/storageAccount'
import AzureTag from '../services/tag'
import AzureVirtualNetwork from '../services/virtualNetwork'
import AzureStorageContainer from '../services/storageContainer'

/**
 * serviceMap is an object that contains all currently supported services for AWS
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.disk]: AzureDisk,
  [services.dns]: AzureDns,
  [services.functionApp]: AzureFunctionApp,
  [services.publicIp]: AzurePublicIp,
  [services.networkInterface]: AzureNetworkInterface,
  [services.storageAccount]: AzureStorageAccount,
  [services.resourceGroup]: AzureResourceGroup,
  [services.securityGroup]: AzureNetworkSecurityGroup,
  [services.virtualNetwork]: AzureVirtualNetwork,
  [services.storageContainer]: AzureStorageContainer,
  tag: AzureTag,
}
