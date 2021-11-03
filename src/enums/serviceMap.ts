// import services from './services'
import AzureTag from '../services/tag'

/**
 * serviceMap is an object that contains all currently supported services for AWS
 * serviceMap is used by the serviceFactory to produce instances of service classes
 */
export default {
  tag: AzureTag,
}
