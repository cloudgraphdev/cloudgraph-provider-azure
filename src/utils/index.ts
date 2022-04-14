import CloudGraph from '@cloudgraph/sdk'
import camelCase from 'lodash/camelCase'
import isEmpty from 'lodash/isEmpty'
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

/**
 * Helper function with generic types that helps solve the problem 
 * of checking if an object matches one of the types specified in a type union
 *
 * @param TypeUnion - Specifies the type union
 * @param Type - The specific type you want to match
 * @param input - The object you want to check
 * @param stringPath - Name of the unique attribute that helps identify the type you want to match 
 * @returns True if the object matches the type
 * 
 */
export function isType<TypeUnion, Type extends TypeUnion>(
  input: TypeUnion,
  stringPath: string
): input is Type {
  return (input as Type)[stringPath] !== undefined
}
