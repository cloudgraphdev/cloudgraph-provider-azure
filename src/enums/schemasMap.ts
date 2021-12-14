import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.disk]: 'azureDisk',
  [services.functionApp]: 'azureFunctionApp',
  [services.networkInterface]: 'azureNetworkInterface',
  [services.publicIp]: 'azurePublicIp',
  [services.resourceGroup]: 'azureResourceGroup',
  [services.securityGroup]: 'azureNetworkSecurityGroup',
  [services.storageAccount]: 'azureStorageAccount',
  [services.virtualMachine]: 'azureVirtualMachine',
  [services.virtualNetwork]: 'azureVirtualNetwork',
  tag: 'azureTag',
}
