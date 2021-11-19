import CloudGraph from '@cloudgraph/sdk'
import axios, { AxiosPromise } from 'axios'

import azureLoggerText from '../properties/logger'
import { AzureDebugScope, RequestConfig } from '../types'
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
  version = '2020-06-01',
}: {
  id: string
  filter?: string
  version?: string
}): string => `${id}?${filter}api-version=${version}`

export const getDataFromMsRestApi = async ({
  authToken,
  initialUrl
}: {
  authToken: string
  initialUrl: string
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

      allData.push(data || [])

      if (nextLink) {
        logger.info(lt.fetchingMoreRestApiData)
        await getAllData(nextLink)
      }

      logger.info(lt.fetchedDataFromRestApi(path))
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

    const resp = response.data

    // if (resp && !resp.error) {
    //   return resp
    // }
    // throw resp.error
    return resp
  } catch (e) {
    logger.error({ e, resourceId, version })
  }
}

type TListFn = () => Promise<any>
type TListNextFn = (nextLinkToken: string) => Promise<any>

export const getAllResources = async (
  listCall: TListFn,
  listNextCall: TListNextFn,
  debugScope: AzureDebugScope
): Promise<Array<any>> => {
  const fullResources = []

  let resources: any
  await tryCatchWrapper(
    async () => {
      resources = await listCall()
      fullResources.push(...resources)
    },
    debugScope,
    'list'
  )

  let { nextLink } = resources

  await tryCatchWrapper(
    async () => {
      while (nextLink) {
        resources = await listNextCall(nextLink)
        fullResources.push(...resources)
        nextLink = resources.nextLink
      }
    },
    debugScope,
    'listNext'
  )

  return fullResources
}
