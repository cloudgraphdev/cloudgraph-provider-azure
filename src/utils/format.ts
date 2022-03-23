import { SystemData } from '@azure/arm-eventhub'
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
  (location && location.split(' ').join('').toLowerCase()) || 'global'

export const getResourceGroupNames = (resourceGroups: {
  [property: string]: RawAzureResourceGroup[]
}): string[] =>
  Object.values(resourceGroups)
    .flat()
    .map(({ name }) => name)

export const transformSystemData = (systemData: SystemData): {
  createdBy?: string
  createdByType?: string
  createdAt?: string
  lastModifiedBy?: string
  lastModifiedByType?: string
  lastModifiedAt?: string
} => {
  if (systemData) {
    const {
      createdBy,
      createdByType,
      createdAt,
      lastModifiedBy,
      lastModifiedByType,
      lastModifiedAt,
    } = systemData
    return {
      createdBy,
      createdByType,
      createdAt: createdAt?.toISOString(),
      lastModifiedBy,
      lastModifiedByType,
      lastModifiedAt: lastModifiedAt?.toISOString(),
    }
  }
  return {}
}