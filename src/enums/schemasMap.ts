import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.disk]: 'azureDisk',
  [services.functionApp]: 'azureFunctionApp',
  [services.keyVault]: 'azureKeyVault',
  [services.networkInterface]: 'azureNetworkInterface',
  [services.publicIp]: 'azurePublicIp',
  [services.resourceGroup]: 'azureResourceGroup',
  [services.securityGroup]: 'azureNetworkSecurityGroup',
  [services.storageAccount]: 'azureStorageAccount',
  [services.storageContainer]: 'azureStorageContainer',
  [services.virtualMachine]: 'azureVirtualMachine',
  [services.virtualNetwork]: 'azureVirtualNetwork',
  tag: 'azureTag',
}
