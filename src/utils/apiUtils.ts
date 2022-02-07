/* eslint-disable @typescript-eslint/no-explicit-any */
import CloudGraph from '@cloudgraph/sdk'
import axios, { AxiosPromise } from 'axios'

import apiSelectors from '../enums/apiSelectors'
import azureLoggerText from '../properties/logger'
import {
  AzureDebugScopeInitialData,
  AzureRestApiClientRequestParams,
  AzureRestApiNewClientParams,
  AzureServiceConfig,
  RequestConfig,
} from '../types'
import { getAadTokenViaAxios } from './authUtils'
import { getResourceGroupFromEntity } from './idParserUtils'
import { tryCatchWrapper } from './index'

const { logger } = CloudGraph
const lt = { ...azureLoggerText }

/**
 * Generic REST API interactions
 */

export const generateAxiosRequest = ({
  baseUrl,
  path: url,
  data,
  verb,
  headers,
}: RequestConfig): AxiosPromise<any> => {
  return axios({
    method: verb || 'post',
    baseURL: baseUrl,
    url,
    headers: {
      ...headers,
    },
    data,
  })
}

export const baseUrl = 'https://management.azure.com'

export const createUriForMsRestApiRequest = ({
  id,
  filter = '',
  version = '2020-10-01',
}: {
  id: string
  filter?: string
  version?: string
}): string => `${id}?${filter}api-version=${version}`

export const getDataFromMsRestApi = async ({
  authToken,
  initialUrl,
  kindSelector = '',
}: {
  authToken: string
  initialUrl: string
  kindSelector?: string
}): Promise<any> => {
  const allData = []

  const getAllData = async (nextLinkToken = ''): Promise<any> => {
    try {
      const path = nextLinkToken || initialUrl

      const response = await generateAxiosRequest({
        baseUrl,
        path,
        verb: 'GET',
        headers: { Authorization: `Bearer ${authToken}` },
      })

      const { value: data, nextLink } = response.data

      allData.push(
        ...(kindSelector
          ? data?.filter(({ kind }) =>
              kind.includes(apiSelectors.functionApp)
            ) || []
          : data || [])
      )

      if (nextLink) {
        logger.debug(lt.fetchingMoreRestApiData)
        await getAllData(nextLink)
      }

      logger.debug(lt.fetchedDataFromRestApi(path))
      return data
    } catch (e) {
      logger.error(e)
    }
  }

  await Promise.all(await getAllData())

  return allData
}

export const getResourceByIdFromMsRestApi = async ({
  authToken,
  resourceId,
  version = '2020-06-01',
}: {
  authToken: string
  resourceId: string
  version?: string
}): Promise<void | any> => {
  try {
    const path = createUriForMsRestApiRequest({
      id: resourceId,
      version,
    })

    const response = await generateAxiosRequest({
      baseUrl,
      path,
      verb: 'GET',
      headers: { Authorization: `Bearer ${authToken}` },
    })

    const resp = response?.data

    // if (resp && !resp.error) {
    //   return resp
    // }
    // throw resp.error
    return resp
  } catch (e) {
    logger.error({ e, resourceId, version })
  }
}

type TListFnWithArgs = (...args: any[]) => Promise<any>
type TListNextFn = (nextLinkToken: string) => Promise<any>

/**
 * Gets all resources from a service, which covers three use cases:
 * 1. listCall doesn't need any arguments
 * 2. listCall needs the resourceGroupName as the sole entry argument:
 *   - resourceGroupName is embedded in each item of the resulting list
 * 3. listCall requires both resourceGroupName and an unique identifier of the parent resource:
 *   - resourceGroupName is embedded in each item of the resulting list
 *   - if the propertyName param exists, a new property is added to each element of the list containing the uniqueIdentifier
 *
 * @param {Object} config
 * @param {TListFnWithArgs} config.listCall List all resources call
 * @param {TListNextFn} config.listNextCall List all resources call that uses token of the last successful List call
 * @param {AzureDebugScopeInitialData} config.debugScope Object that describes the service, the client and scope for log tracing purposes
 * @param {string} config.resourceGroupName Optional string parameter that could be mandatory for the function passed in the listCall param
 * @param {string} config.uniqueIdentifier Optional string parameter that could be mandatory for the function passed in the listCall param
 * @param {string} config.propertyName Optional string parameter to name the property that will contain the unique identifier
 * @returns {Promise<Array<any>>} Result of the listCalls
 */
export const getAllResources = async ({
  listCall,
  listNextCall,
  debugScope: { service, client, scope },
  resourceGroupName,
  uniqueIdentifier,
  propertyName,
}: {
  listCall: TListFnWithArgs
  listNextCall: TListNextFn
  debugScope: AzureDebugScopeInitialData
  resourceGroupName?: string
  uniqueIdentifier?: string
  propertyName?: string
}): Promise<Array<any>> => {
  const fullResources = []

  let resources: any
  // This allows us to add the uniqueIdentifier used to find this item as property
  // and give it a convenient name, keeping it flexible for schema/format types.
  // This enables us to easily find/filter items not only for us to associate it to their parent resource
  // but also pave the road to complex dgraph queries
  const newPropContainer =
    uniqueIdentifier && propertyName ? { [propertyName]: uniqueIdentifier } : {}
  await tryCatchWrapper(
    async () => {
      resources = await listCall(
        // This creates a array-like object that allows destructuring arguments for all three use cases(one, two or no arguments)
        ...[
          ...(resourceGroupName ? [resourceGroupName] : []),
          ...(uniqueIdentifier ? [uniqueIdentifier] : []),
        ]
      )
      fullResources.push(
        ...resources.map((r: any) => ({
          ...r,
          // This adds the resourceGroupName if present if not it parses it from the resource id
          resourceGroup: resourceGroupName || getResourceGroupFromEntity(r),
          ...newPropContainer,
        }))
      )
    },
    { service, client, scope, operation: listCall.name }
  )

  let { nextLink } = resources

  await tryCatchWrapper(
    async () => {
      while (nextLink) {
        resources = await listNextCall(nextLink)
        fullResources.push(
          ...resources.map(r => ({
            ...r,
            // This adds the resourceGroupName if present if not it parses it from the resource id
            resourceGroup: resourceGroupName || getResourceGroupFromEntity(r),
            ...newPropContainer,
          }))
        )
        nextLink = resources.nextLink
      }
    },
    { service, client, scope, operation: listNextCall.name }
  )

  return fullResources
}
export class RestApiClient {
  $host: string

  subscriptionId: string

  scope: string

  kind: string

  config: AzureServiceConfig

  constructor({ config, scope, kind, options }: AzureRestApiNewClientParams) {
    if (config === undefined) {
      throw new Error("'config' cannot be null")
    }
    if (!options) {
      options = {}
    }
    this.subscriptionId = config.subscriptionId
    this.kind = kind
    this.scope = scope
    this.$host = options.$host || baseUrl
    this.config = config
  }

  async getRequestedData({
    type,
    resourceGroupName,
    filters,
  }: AzureRestApiClientRequestParams): Promise<any> {
    const authToken = await getAadTokenViaAxios(this.config)
    try {
      const path = `/subscriptions/${this.config.subscriptionId}/resourceGroups/${resourceGroupName}/${this.scope}/${this.kind}/${type}`
      return getDataFromMsRestApi({
        authToken,
        initialUrl: createUriForMsRestApiRequest({
          id: path,
          filter: `$filter=${(filters || []).join(' or ')}&`,
        }),
      })
    } catch (error) {
      logger.debug(error)
    }
  }
}
