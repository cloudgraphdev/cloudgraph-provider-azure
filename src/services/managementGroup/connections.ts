import { ServiceConnection } from '@cloudgraph/sdk'

import services from '../../enums/services'
import { RawAzureManagementGroup } from './data'
import { caseInsensitiveEqual, caseInsensitiveIncludes } from '../../utils'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureManagementGroup
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const {
    id,
    details: { managementGroupAncestorsChain = [] } = {},
    children = [],
  } = service
  const { name: parentName = '' } = managementGroupAncestorsChain?.shift() || {}
  const { name: rootName = '' } = managementGroupAncestorsChain?.pop() || {}
  const childrenNames: string[] = children?.map(({ name }) => name)

  /**
   * Find related Management Groups
   */
  const managementGroups: {
    name: string
    data: { [property: string]: any[] }
  } = data.find(({ name }) => name === services.managementGroup)
  if (managementGroups?.data?.[region]) {
    // Find root stack
    if (rootName) {
      const rootManagementGroup: RawAzureManagementGroup =
        managementGroups.data[region].find(({ name }) =>
          caseInsensitiveEqual(name, rootName)
        )
      if (rootManagementGroup) {
        connections.push({
          id: rootManagementGroup.id,
          resourceType: services.managementGroup,
          relation: 'child',
          field: 'rootManagementGroup',
          insertAfterNodeInsertion: true,
        })
      }
    }
    // Find parent stack
    if (parentName) {
      const parentManagementGroup: RawAzureManagementGroup =
        managementGroups.data[region].find(({ name }) =>
          caseInsensitiveEqual(name, parentName)
        )
      if (parentManagementGroup) {
        connections.push({
          id: parentManagementGroup.id,
          resourceType: services.managementGroup,
          relation: 'child',
          field: 'parentManagementGroup',
          insertAfterNodeInsertion: true,
        })
      }
    }
    // Find children
    if (childrenNames.length > 0) {
      const childrenManagementGroups: RawAzureManagementGroup[] =
        managementGroups.data[region].find(({ name }) =>
          caseInsensitiveIncludes(childrenNames, name)
        )
      if (childrenManagementGroups.length > 0) {
        for (const child of childrenManagementGroups) {
          connections.push({
            id: child.id,
            resourceType: services.managementGroup,
            relation: 'child',
            field: 'childrenManagementGroups',
            insertAfterNodeInsertion: true,
          })
        }
      }
    }
  }

  const mGResult = {
    [id]: connections,
  }
  return mGResult
}
