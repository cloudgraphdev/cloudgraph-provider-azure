import CloudGraph from '@cloudgraph/sdk'
import camelCase from 'lodash/camelCase'
import isEmpty from 'lodash/isEmpty'
import unionWith from 'lodash/unionWith'
import isEqual from 'lodash/isEqual'
import { ProviderError } from '@cloudgraph/sdk/dist/src/types'
import relations from '../enums/relations'
import {
  AzureDebugScope,
  AzureDebugScopeInitialData,
  AzureError,
} from '../types'

const { logger } = CloudGraph

export const toCamel = (o: any): any => {
  let origKey
  let newKey
  let value

  if (o instanceof Array) {
    return o.map(value => {
      if (typeof value === 'object') {
        value = toCamel(value)
      }
      return value
    })
  }

  const newObject = {}
  for (origKey in o) {
    if (o.hasOwnProperty(origKey)) {
      newKey = camelCase(origKey)
      value = o[origKey]
      if (
        value instanceof Array ||
        (value !== null && value !== undefined && value.constructor === Object)
      ) {
        value = toCamel(value)
      }
      newObject[newKey] = value
    }
  }

  return newObject
}

export const getKeyByValue = (
  object: Record<string, unknown>,
  value: any
): string | undefined => {
  return Object.keys(object).find(key => object[key] === value)
}

export const intersectStringArrays = (
  a: Array<string>,
  b: Array<string>
): Array<string> => {
  const setA = new Set(a)
  const setB = new Set(b)
  const intersection = new Set([...setA].filter(x => setB.has(x)))
  return Array.from(intersection)
}

export function initTestConfig(): void {
  jest.setTimeout(900000)
}

const errorsHistory: ProviderError[] = []

export function getAllProviderErrors(): ProviderError[] {
  return errorsHistory
}

export function generateAzureErrorLog(
  service: string,
  functionName: string,
  err?: AzureError
): void {
  logger.warn(
    `There was a problem getting data for service ${service}, CG encountered an error calling ${functionName}`
  )
  if (typeof err === 'undefined') {
    logger.debug(`Unknown error on ${service} calling ${functionName}`)
  } else if (
    err.statusCode !== 401 ||
    err.statusCode !== 403 ||
    err.statusCode !== 404 ||
    err.statusCode !== 503
  ) {
    logger.warn(err.message)
  } else if (err.statusCode === 429) {
    logger.debug(`Rate exceeded for ${service}:${functionName}`)
  } else {
    logger.debug(err.message)
  }
  if (err?.statusCode !== 429) {
    errorsHistory.push({
      service,
      function: functionName,
      message: err?.message || 'Unknown error',
    })
  }
  throw new Error()
}

export const settleAllPromises = async (
  promises: Promise<any>[]
): Promise<any[]> =>
  (await Promise.allSettled(promises)).map(
    /** We force the PromiseFulfilledResult interface
     *  because all promises that we input to Promise.allSettled
     *  are always resolved, that way we suppress the compiler error complaining
     *  that Promise.allSettled returns an Array<PromiseFulfilledResult | PromiseRejectedResult>
     *  and that the value property doesn't exist for the PromiseRejectedResult interface */
    i => (i as PromiseFulfilledResult<any>).value
  )

/**
 * Sorts a services list depending on his dependencies
 * @param resourceNames services to sort
 * @returns sorted list of services
 */
export const sortResourcesDependencies = (resourceNames: string[]): string[] =>
  resourceNames.sort((prevResource, nextResource) => {
    const dependecies = relations[prevResource]

    if (dependecies && dependecies.includes(nextResource)) {
      return -1
    }
    return 0
  })

export const generateAzureDebugScope = (
  service: string,
  client: any,
  scope: string
): AzureDebugScope => {
  return {
    service,
    fullScope: `${client.constructor.name}:${scope}`,
  }
}

export const tryCatchWrapper = async (
  func: () => Promise<void>,
  { service, client, scope, operation }: AzureDebugScopeInitialData
): Promise<void> => {
  const debugScope = generateAzureDebugScope(service, client, scope)
  try {
    await func()
  } catch (error) {
    generateAzureErrorLog(
      debugScope.service,
      `${debugScope.fullScope}:${operation}`,
      error
    )
  }
}

export const caseInsensitiveEqual = (s1: string, s2: string): boolean =>
  !!s1 && !!s2 && s1.toLowerCase() === s2.toLowerCase()

export const caseInsensitiveIncludes = (arr: string[], s1: string): boolean =>
  !isEmpty(arr) &&
  arr.filter(str => str.toLowerCase().includes(s1.toLowerCase())).length > 0

export const checkAndMergeConnections = (
  serviceConnections: any,
  connectionsToMerge: any
): any => {
  const connections = serviceConnections
  // IF we have no pre existing connections for this service, use new connections
  // IF we have pre existing connections, check if its for the same serivce id, if so
  // check if the connections list for that id is empty, use new connections for that id if so.
  // otherwise, merge connections by unioning on id of the connections
  if (!isEmpty(connections)) {
    const entries: [string, any][] = Object.entries(connectionsToMerge)
    for (const [key] of entries) {
      // If there are no service connections for this entity i.e. { [serviceId]: [] }
      // use new connections for that key
      if (connections[key]) {
        if (isEmpty(connections[key])) {
          connections[key] = connectionsToMerge[key] ?? []
        } else {
          connections[key] = unionWith(
            connections[key],
            connectionsToMerge[key] ?? [],
            isEqual
          )
        }
      } else {
        Object.assign(connections, connectionsToMerge)
      }
    }
    return connections
  }
  return connectionsToMerge
}
