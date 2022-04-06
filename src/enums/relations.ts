import services from './services'
/**
 * Set relations between services to data sharing
 * The key of the object represents the parent or base service,
 * it might contain a array of dependant or childs that must be executed after the parent
 */
export default {
  [services.appServicePlan]: [services.appServiceWebApp],
  [services.storageAccount]: [services.storageContainer],
  [services.storageContainer]: [services.storageBlob],
  [services.cdnProfiles]: [services.cdnEndpoints],
  [services.cdnEndpoints]: [services.cdnCustomDomains, services.cdnOrigins, services.cdnOriginGroups],
  [services.dataFactory]: [services.integrationRuntime],
  [services.backupVault]: [services.backupInstance, services.backupPolicy],
  [services.synapseWorkspaces]: [services.synapseBigDataPools, services.synapseSqlPools]
}
