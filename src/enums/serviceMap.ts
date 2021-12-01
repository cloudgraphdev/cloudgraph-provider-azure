// import services from './services'
import AzureFunctionApp from '../services/functionApp'
import AzurePublicIp from '../services/publicIp'
import AzureResourceGroup from '../services/resourceGroup'
import AzureTag from '../services/tag'
import AzureVirtualNetwork from '../services/virtualNetwork'
import services from './services'

/**
 * serviceMap is an object that contains all currently supported services for AWS
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.functionApp]: AzureFunctionApp,
  [services.publicIp]: AzurePublicIp,
  [services.resourceGroup]: AzureResourceGroup,
  [services.virtualNetwork]: AzureVirtualNetwork,
  tag: AzureTag,
}
