import services from './services'

/**
 * schemasMap is an object that contains schemas name by resource
 */
export default {
  [services.authRoleAssignment]: 'azureAuthRoleAssignment',
  [services.authRoleDefinition]: 'azureAuthRoleDefinition',
  [services.disk]: 'azureDisk',
  [services.dns]: 'azureDnsZone',
  [services.firewall]: 'azureFirewall',
  [services.functionApp]: 'azureFunctionApp',
  [services.keyVault]: 'azureKeyVault',
  [services.networkInterface]: 'azureNetworkInterface',
  [services.policyAssignment]: 'azurePolicyAssignment',
  [services.publicIp]: 'azurePublicIp',
  [services.resourceGroup]: 'azureResourceGroup',
  [services.securityAssesments]: 'azureSecurityAssesments',
  [services.securityGroup]: 'azureNetworkSecurityGroup',
  [services.securityPricings]: 'azureSecurityPricings',
  [services.securitySettings]: 'azureSecuritySettings',
  [services.storageAccount]: 'azureStorageAccount',
  [services.storageContainer]: 'azureStorageContainer',
  [services.virtualMachine]: 'azureVirtualMachine',
  [services.virtualMachine]: 'azureVirtualMachine',
  [services.virtualMachineScaleSet]: 'azureVirtualMachineScaleSet',
  [services.virtualNetwork]: 'azureVirtualNetwork',
  tag: 'azureTag',
}
