import { AzureRawTag } from '../types/generated'
import { TagMap } from '../types'
import { RawAzureResourceGroup } from '../services/resourceGroup/data'

export const formatTagsFromMap = (tags: TagMap): AzureRawTag[] => {
  const result: AzureRawTag[] = []
  for (const [key, value] of Object.entries(tags)) {
    // We need an id here to enfore uniqueness for Dgraph, otherwise we get duplicate tags
    result.push({ id: `${key}:${value}`, key, value })
  }
  return result
}

export const obfuscateSensitiveString = (s: string): string => {
  const stars = '*'.repeat(Math.min(30, s.length - 6))
  return s.slice(0, 3) + stars + s.slice(stars.length + 3, s.length)
}

export const lowerCaseLocation = (location: string): string =>
  location.split(' ').join('').toLowerCase()

export const getResourceGroupNames = (resourceGroups: {
  [property: string]: RawAzureResourceGroup[]
}): string[] =>
  Object.values(resourceGroups)
    .flat()
    .map(({ name }) => name)