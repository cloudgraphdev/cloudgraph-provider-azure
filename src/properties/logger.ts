export default {
  authenticatingWithServicePrincipalSecret:
    'Authenticating with the Azure node SDK using Service Principal and Secret',
  // Azure Functions
  foundFunctionApps: (num: number): string => `Found ${num} function apps`,
  foundFunctions: (num: number): string => `Found ${num} functions`,
  // Public Ips
  foundPublicIps: (num: number): string => `Found ${num} public ips`,
  // Resource Groups
  foundResourceGroups: (num: number): string => `Found ${num} resource groups`,
  // Virtual Networks
  foundvirtualNetworks: (num: number): string => `Found ${num} virtual networks`,
  // Generic Rest API
  fetchedDataFromRestApi: (url: string): string =>
    `Fetched data from Azure REST API: ${url}`,
  fetchingMoreRestApiData: 'Found more REST API data, fetching more data...',
  authenticatingViaOauth:
    'Authenticating Via Ouath to get token for use with REST API...',
}
