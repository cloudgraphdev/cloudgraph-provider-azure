import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.disk]: 'azureDisk',
  [services.dns]: 'azureDnsZone',
  [services.firewall]: 'azureFirewall',
  [services.functionApp]: 'azureFunctionApp',
  [services.keyVault]: 'azureKeyVault',
  [services.networkInterface]: 'azureNetworkInterface',
  [services.policyAssigment]: 'azurePolicyAssignment',
  [services.publicIp]: 'azurePublicIp',
  [services.resourceGroup]: 'azureResourceGroup',
  [services.securityAssesments]: 'azureSecurityAssesments',
  [services.securityGroup]: 'azureNetworkSecurityGroup',
  [services.securityPricings]: 'azureSecurityPricings',
  [services.securitySettings]: 'azureSecuritySettings',
  [services.storageAccount]: 'azureStorageAccount',
  [services.storageContainer]: 'azureStorageContainer',
  [services.virtualMachine]: 'azureVirtualMachine',
  [services.virtualNetwork]: 'azureVirtualNetwork',
  tag: 'azureTag',
}
