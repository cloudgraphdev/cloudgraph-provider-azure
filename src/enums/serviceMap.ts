import services from './services'
import AzureDisk from '../services/disk'
import AzureFunctionApp from '../services/functionApp'
import AzurePublicIp from '../services/publicIp'
import AzureNetworkInterface from '../services/networkInterface'
import AzureResourceGroup from '../services/resourceGroup'
import AzureTag from '../services/tag'
import AzureVirtualNetwork from '../services/virtualNetwork'

/**
 * serviceMap is an object that contains all currently supported services for AWS
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.disk]: AzureDisk,
  [services.functionApp]: AzureFunctionApp,
  [services.publicIp]: AzurePublicIp,
  [services.networkInterface]: AzureNetworkInterface,
  [services.resourceGroup]: AzureResourceGroup,
  [services.virtualNetwork]: AzureVirtualNetwork,
  tag: AzureTag,
}
