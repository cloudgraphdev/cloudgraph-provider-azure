// import services from './services'
import AzureFunctionApp from '../services/functionApp'
import AzureResourceGroup from '../services/resourceGroup'
import AzureTag from '../services/tag'
import services from './services'

/**
 * serviceMap is an object that contains all currently supported services for AWS
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  [services.functionApp]: AzureFunctionApp,
  [services.resourceGroup]: AzureResourceGroup,
  tag: AzureTag,
}
