import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import regions from '../../enums/regions'
import services from '../../enums/services'

const findServiceInstancesWithTag = (tag: any, service: any): any => {
  const { id } = tag
  return service.filter(({ Tags }) => {
    for (const [key, value] of Object.entries(Tags)) {
      if (id === `${key}:${value}`) {
        return true
      }
    }
    return false
  })
}

export default ({
  service: tag,
  data,
}: {
  service: any
  data: Array<{ name: string; data: { [property: string]: any[] } }>
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  for (const region of regions) {
    /**
     * Find related Resource Groups
     */
    const resourceGroups: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.resourceGroup)
    if (resourceGroups?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        resourceGroups.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const resourceGroup of dataAtRegion) {
          const { id } = resourceGroup
          connections.push({
            id,
            resourceType: services.resourceGroup,
            relation: 'child',
            field: 'resourceGroups',
          })
        }
      }
    }
    /**
     * Find related App Service Plan
     */
    const appServicePlans: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.appServicePlan)
    if (appServicePlans?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        appServicePlans.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const appServicePlan of dataAtRegion) {
          const { id } = appServicePlan
          connections.push({
            id,
            resourceType: services.appServicePlan,
            relation: 'child',
            field: 'appServicePlans',
          })
        }
      }
    }
    /**
     * Find related App Service Web App
     */
    const appServiceWebApps: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.appServiceWebApp)
    if (appServiceWebApps?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        appServiceWebApps.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const appServiceWebApp of dataAtRegion) {
          const { id } = appServiceWebApp
          connections.push({
            id,
            resourceType: services.appServiceWebApp,
            relation: 'child',
            field: 'appServiceWebApps',
          })
        }
      }
    }
    /**
     * Find related Azure Functions
     */
    const azureFunctions: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.functionApp)
    if (azureFunctions?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        azureFunctions.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureFunction of dataAtRegion) {
          const { id } = azureFunction
          connections.push({
            id,
            resourceType: services.functionApp,
            relation: 'child',
            field: 'functionApps',
          })
        }
      }
    }
    /**
     * Find related Azure KeyVault
     */
    const azureKeyVaults: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.keyVault)
    if (azureKeyVaults?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        azureKeyVaults.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureKeyVault of dataAtRegion) {
          const { id } = azureKeyVault
          connections.push({
            id,
            resourceType: services.keyVault,
            relation: 'child',
            field: 'keyVaults',
          })
        }
      }
    }
    /**
     * Find related network security groups
     */
    const securityGroups: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.securityGroup)
    if (securityGroups?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        securityGroups.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const securityGroup of dataAtRegion) {
          const { id } = securityGroup
          connections.push({
            id,
            resourceType: services.securityGroup,
            relation: 'child',
            field: 'securityGroups',
          })
        }
      }
    }
    /**
     * Find related Virtual Networks
     */
    const virtualNetworks: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.virtualNetwork)
    if (virtualNetworks?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        virtualNetworks.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const virtualNetwork of dataAtRegion) {
          const { id } = virtualNetwork
          connections.push({
            id,
            resourceType: services.virtualNetwork,
            relation: 'child',
            field: 'virtualNetworks',
          })
        }
      }
    }
    /**
     * Find related Azure Network Interfaces
     */
    const azureNetworkInterfaces: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.networkInterface)
    if (azureNetworkInterfaces?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        azureNetworkInterfaces.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const networkInterface of dataAtRegion) {
          const { id } = networkInterface
          connections.push({
            id,
            resourceType: services.networkInterface,
            relation: 'child',
            field: 'networkInterfaces',
          })
        }
      }
    }
    /**
     * Find related Disks
     */
    const disks: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.disk)
    if (disks?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        disks.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureDisk of dataAtRegion) {
          const { id } = azureDisk
          connections.push({
            id,
            resourceType: services.disk,
            relation: 'child',
            field: 'disks',
          })
        }
      }
    }
    /**
     * Find related Firewall
     */
    const firewalls: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.firewall)
    if (firewalls?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        firewalls.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureFirewall of dataAtRegion) {
          const { id } = azureFirewall
          connections.push({
            id,
            resourceType: services.firewall,
            relation: 'child',
            field: 'firewalls',
          })
        }
      }
    }
    /**
     * Find related Public Ips
     */
    const publicIps: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.publicIp)
    if (publicIps?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        publicIps.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const publicIp of dataAtRegion) {
          const { id } = publicIp
          connections.push({
            id,
            resourceType: services.publicIp,
            relation: 'child',
            field: 'publicIps',
          })
        }
      }
    }

    /**
     * Find related Storage Accounts
     */
    const azureStorageAccounts: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.storageAccount)
    if (azureStorageAccounts?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        azureStorageAccounts.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const azureStorageAccount of dataAtRegion) {
          const { id } = azureStorageAccount
          connections.push({
            id,
            resourceType: services.storageAccount,
            relation: 'child',
            field: 'storageAccounts',
          })
        }
      }
    }
    /**
     * Find related Dns Zones
     */
    const dnsZones: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.dns)
    if (dnsZones?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        dnsZones.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const dnsZone of dataAtRegion) {
          const { id } = dnsZone
          connections.push({
            id,
            resourceType: services.dns,
            relation: 'child',
            field: 'dns',
          })
        }
      }
    }
    /**
     * Find related Virtual Machines
     */
    const virtualMachines: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.virtualMachine)
    if (virtualMachines?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        virtualMachines.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const virtualMachine of dataAtRegion) {
          const { id } = virtualMachine
          connections.push({
            id,
            resourceType: services.virtualMachine,
            relation: 'child',
            field: 'virtualMachines',
          })
        }
      }
    }
    /**
     * Find related AD Applications
     */
    const adApplications: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.adApplication)
    if (adApplications?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        adApplications.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const adApplication of dataAtRegion) {
          const { id } = adApplication
          connections.push({
            id,
            resourceType: services.adApplication,
            relation: 'child',
            field: 'adApplications',
          })
        }
      }
    }
    /**
     * Find related AD Service Principals
     */
    const adServicePrincipals: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.adServicePrincipal)
    if (adServicePrincipals?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        adServicePrincipals.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const adServicePrincipal of dataAtRegion) {
          const { id } = adServicePrincipal
          connections.push({
            id,
            resourceType: services.adServicePrincipal,
            relation: 'child',
            field: 'adServicePrincipals',
          })
        }
      }
    }
    /**
     * Find related CDN Profiles
     */
    const cdnProfiles: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.cdnProfiles)
    if (cdnProfiles?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        cdnProfiles.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const cdnProfile of dataAtRegion) {
          const { id } = cdnProfile
          connections.push({
            id,
            resourceType: services.cdnProfiles,
            relation: 'child',
            field: 'cdnProfiles',
          })
        }
      }
    }
    /**
     * Find related CDN Endpoints
     */
    const cdnEndpoints: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.cdnEndpoints)
    if (cdnEndpoints?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        cdnEndpoints.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const cdnEndpoint of dataAtRegion) {
          const { id } = cdnEndpoint
          connections.push({
            id,
            resourceType: services.cdnEndpoints,
            relation: 'child',
            field: 'cdnEndpoints',
          })
        }
      }
    }
    /**
     * Find related Container Registries
     */
    const containerRegistries: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.containerRegistry)
    if (containerRegistries?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        containerRegistries.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const containerRegistry of dataAtRegion) {
          const { id } = containerRegistry
          connections.push({
            id,
            resourceType: services.containerRegistry,
            relation: 'child',
            field: 'containerRegistries',
          })
        }
      }
    }
    /**
     * Find related Container Registries
     */
    const loadBalancers: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.loadBalancer)
    if (loadBalancers?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        loadBalancers.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const loadBalancer of dataAtRegion) {
          const { id } = loadBalancer
          connections.push({
            id,
            resourceType: services.loadBalancer,
            relation: 'child',
            field: 'loadBalancers',
          })
        }
      }
    }
    /**
     * Find related Managed SQL Instances
     */
    const managedInstances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.databaseManagedSqlInstance)
    if (managedInstances?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        managedInstances.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const managedInstance of dataAtRegion) {
          const { id } = managedInstance
          connections.push({
            id,
            resourceType: services.databaseManagedSqlInstance,
            relation: 'child',
            field: 'databaseManagedSqlInstances',
          })
        }
      }
    }
    /**
     * Find related Container Registries
     */
    const dataFactories: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.dataFactory)
    if (dataFactories?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        dataFactories.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const dataFactory of dataAtRegion) {
          const { id } = dataFactory
          connections.push({
            id,
            resourceType: services.dataFactory,
            relation: 'child',
            field: 'dataFactories',
          })
        }
      }
    }
    /**
     * Find related traffic manager profiles
     */
    const trafficManagerProfiles: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.trafficManagerProfile)
    if (trafficManagerProfiles?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        trafficManagerProfiles.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const trafficManagerProfile of dataAtRegion) {
          const { id } = trafficManagerProfile
          connections.push({
            id,
            resourceType: services.trafficManagerProfile,
            relation: 'child',
            field: 'trafficManagerProfiles',
          })
        }
      }
    }
    /**
     * Find related App Service Kube Environment
     */
    const kubeEnvironments: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.appServiceKubeEnvironment)
    if (kubeEnvironments?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        kubeEnvironments.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const appServiceKubeEnvironment of dataAtRegion) {
          const { id } = appServiceKubeEnvironment
          connections.push({
            id,
            resourceType: services.appServiceKubeEnvironment,
            relation: 'child',
            field: 'appServiceKubeEnvironments',
          })
        }
      }
    }
    /**
     * Find related Aks Managed Clusters
     */
    const managedClusters: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.aksManagedCluster)
    if (managedClusters?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        managedClusters.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const aksManagedCluster of dataAtRegion) {
          const { id } = aksManagedCluster
          connections.push({
            id,
            resourceType: services.aksManagedCluster,
            relation: 'child',
            field: 'aksManagedClusters',
          })
        }
      }
    }
    /**
     * Find related Aks Managed Clusters
     */
    const connectedClusters: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.arcConnectedCluster)
    if (connectedClusters?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        connectedClusters.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const arcConnectedCluster of dataAtRegion) {
          const { id } = arcConnectedCluster
          connections.push({
            id,
            resourceType: services.arcConnectedCluster,
            relation: 'child',
            field: 'arcConnectedClusters',
          })
        }
      }
    }
    /**
     * Find related SQL Servers
     */
    const sqlServers: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.sqlServers)
    if (sqlServers?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        sqlServers.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const sqlServer of dataAtRegion) {
          const { id } = sqlServer
          connections.push({
            id,
            resourceType: services.sqlServers,
            relation: 'child',
            field: 'sqlServers',
          })
        }
      }
    }
    /**
     * Find related PostgreSQL Servers
     */
    const postgreSqlServers: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.postgreSqlServers)
    if (postgreSqlServers?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        postgreSqlServers.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const sqlServer of dataAtRegion) {
          const { id } = sqlServer
          connections.push({
            id,
            resourceType: services.postgreSqlServers,
            relation: 'child',
            field: 'postgreSqlServers',
          })
        }
      }
    }
    /**
     * Find related MySQL Servers
     */
    const mySqlServers: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.mySqlServers)
    if (mySqlServers?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        mySqlServers.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const sqlServer of dataAtRegion) {
          const { id } = sqlServer
          connections.push({
            id,
            resourceType: services.mySqlServers,
            relation: 'child',
            field: 'mySqlServers',
          })
        }
      }
    }
    /**
     * Find related ActivityLogAlerts
     */
    const activityLogAlerts: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.activityLogAlerts)
    if (activityLogAlerts?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        activityLogAlerts.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const activityLogAlert of dataAtRegion) {
          const { id } = activityLogAlert
          connections.push({
            id,
            resourceType: services.activityLogAlerts,
            relation: 'child',
            field: 'activityLogAlerts',
          })
        }
      }
    }

    /**
     * Find related LogAnalyticsWorkspaces
     */
    const logAnalyticsWorkspaces: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.logAnalyticsWorkspace)
    if (logAnalyticsWorkspaces?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        logAnalyticsWorkspaces.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const logAnalyticsWorkspace of dataAtRegion) {
          const { id } = logAnalyticsWorkspace
          connections.push({
            id,
            resourceType: services.logAnalyticsWorkspace,
            relation: 'child',
            field: 'logAnalyticsWorkspaces',
          })
        }
      }
    }

    /**
     * Find related LogAnalyticsSolutions
     */
    const logAnalyticsSolutions: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.logAnalyticsSolution)
    if (logAnalyticsSolutions?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        logAnalyticsSolutions.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const logAnalyticsSolution of dataAtRegion) {
          const { id } = logAnalyticsSolution
          connections.push({
            id,
            resourceType: services.logAnalyticsSolution,
            relation: 'child',
            field: 'logAnalyticsSolutions',
          })
        }
      }
    }

    /**
     * Find related cosmos db accounts
     */
    const cosmosDbAccounts: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.cosmosDb)
    if (cosmosDbAccounts?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        cosmosDbAccounts.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const cosmosDbAccount of dataAtRegion) {
          const { id } = cosmosDbAccount
          connections.push({
            id,
            resourceType: services.cosmosDb,
            relation: 'child',
            field: 'cosmosDb',
          })
        }
      }
    }

    /**
     * Find related metric alerts
     */
    const metricAlerts: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.metricAlert)
    if (metricAlerts?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        metricAlerts.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const metricAlert of dataAtRegion) {
          const { id } = metricAlert
          connections.push({
            id,
            resourceType: services.metricAlert,
            relation: 'child',
            field: 'metricAlerts',
          })
        }
      }
    }

    /**
     * Find related AppInsights
     */
    const appInsights: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.appInsights)
    if (appInsights?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        appInsights.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const appInsight of dataAtRegion) {
          const { id } = appInsight
          connections.push({
            id,
            resourceType: services.appInsights,
            relation: 'child',
            field: 'appInsights',
          })
        }
      }
    }

    /**
     * Find related action groups
     */
    const actionGroups: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.actionGroup)
    if (actionGroups?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        actionGroups.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const actionGroup of dataAtRegion) {
          const { id } = actionGroup
          connections.push({
            id,
            resourceType: services.actionGroup,
            relation: 'child',
            field: 'actionGroups',
          })
        }
      }
    }

    /**
     * Find related RedisCaches
     */
    const redisCaches: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.redisCaches)
    if (redisCaches?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        redisCaches.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const redisCache of dataAtRegion) {
          const { id } = redisCache
          connections.push({
            id,
            resourceType: services.redisCaches,
            relation: 'child',
            field: 'redisCaches',
          })
        }
      }
    }

    /*
     * Find related machine learning workspaces
     */
    const machineLearningWorkspaces: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.machineLearningWorkspaces)
    if (machineLearningWorkspaces?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        machineLearningWorkspaces.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const workspace of dataAtRegion) {
          const { id } = workspace
          connections.push({
            id,
            resourceType: services.machineLearningWorkspaces,
            relation: 'child',
            field: 'machineLearningWorkspaces',
          })
        }
      }
    }

    /**
     * Find related app service environments
     */
    const appServiceEnvironments: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.appServiceEnvironment)
    if (appServiceEnvironments?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        appServiceEnvironments.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const appServiceEnv of dataAtRegion) {
          const { id } = appServiceEnv
          connections.push({
            id,
            resourceType: services.appServiceEnvironment,
            relation: 'child',
            field: 'appServiceEnvironments',
          })
        }
      }
    }

    /**
     * Find related data collection rules
     */
    const dataCollectionRules: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.dataCollectionRule)
    if (dataCollectionRules?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        dataCollectionRules.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const dataCollectionRule of dataAtRegion) {
          const { id } = dataCollectionRule
          connections.push({
            id,
            resourceType: services.dataCollectionRule,
            relation: 'child',
            field: 'dataCollectionRules',
          })
        }
      }
    }

    /**
     * Find related expressRouteGateways
     */
    const expressRouteGateways: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.expressRouteGateways)
    if (expressRouteGateways?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        expressRouteGateways.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const gateway of dataAtRegion) {
          const { id } = gateway
          connections.push({
            id,
            resourceType: services.expressRouteGateways,
            relation: 'child',
            field: 'expressRouteGateways',
          })
        }
      }
    }

    /**
     * Find related service bus
     */
    const serviceBusList: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.serviceBus)
    if (serviceBusList?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        serviceBusList.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const serviceBus of dataAtRegion) {
          const { id } = serviceBus
          connections.push({
            id,
            resourceType: services.serviceBus,
            relation: 'child',
            field: 'serviceBus',
          })
        }
      }
    }

    /**
     * Find related backup vaults
     */
    const backupVaults: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.backupVault)
    if (backupVaults?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        backupVaults.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const backupVault of dataAtRegion) {
          const { id } = backupVault
          connections.push({
            id,
            resourceType: services.backupVault,
            relation: 'child',
            field: 'backupVault',
          })
        }
      }
    }

    /**
     * Find related RecoveryVaults
     */
    const recoveryVaults: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.recoveryVaults)
    if (recoveryVaults?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        recoveryVaults.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const recoveryVault of dataAtRegion) {
          const { id } = recoveryVault
          connections.push({
            id,
            resourceType: services.recoveryVaults,
            relation: 'child',
            field: 'recoveryVaults',
          })
        }
      }
    }

    /**
     * Find related cognitive services account
     */
    const cognitiveServicesAccountList: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.cognitiveServicesAccount)
    if (cognitiveServicesAccountList?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        cognitiveServicesAccountList.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const cognitiveServicesAccount of dataAtRegion) {
          const { id } = cognitiveServicesAccount
          connections.push({
            id,
            resourceType: services.cognitiveServicesAccount,
            relation: 'child',
            field: 'cognitiveServicesAccounts',
          })
        }
      }
    }

    /**
     * Find related synapse workspaces
     */
    const synapseWorkspaces: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.synapseWorkspaces)
    if (synapseWorkspaces?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        synapseWorkspaces.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const workspace of dataAtRegion) {
          const { id } = workspace
          connections.push({
            id,
            resourceType: services.synapseWorkspaces,
            relation: 'child',
            field: 'synapseWorkspaces',
          })
        }
      }
    }

    /**
     * Find related synapse sql pools
     */
    const synapseSqlPools: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.synapseSqlPools)
    if (synapseSqlPools?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        synapseSqlPools.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const sqlPool of dataAtRegion) {
          const { id } = sqlPool
          connections.push({
            id,
            resourceType: services.synapseSqlPools,
            relation: 'child',
            field: 'synapseSqlPools',
          })
        }
      }
    }

    /**
     * Find related synapse big data pools
     */
    const synapseBigDataPools: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === services.synapseBigDataPools)
    if (synapseBigDataPools?.data?.[region]) {
      const dataAtRegion: any = findServiceInstancesWithTag(
        tag,
        synapseBigDataPools.data[region]
      )
      if (!isEmpty(dataAtRegion)) {
        for (const bigDataPool of dataAtRegion) {
          const { id } = bigDataPool
          connections.push({
            id,
            resourceType: services.synapseBigDataPools,
            relation: 'child',
            field: 'synapseBigDataPools',
          })
        }
      }
    }
  }

  const tagResult = {
    [tag.id]: connections,
  }
  return tagResult
}
