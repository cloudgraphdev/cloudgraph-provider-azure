import { ManagementGroupChildInfo } from '@azure/arm-managementgroups'
import cuid from 'cuid'
import { RawAzureManagementGroup } from './data'
import {
  AzureManagementGroup,
  AzureManagementGroupChildrenInfo,
} from '../../types/generated'

function formatMGChildren(
  children: ManagementGroupChildInfo[]
): AzureManagementGroupChildrenInfo[] {
  if (children.length > 0) {
    return children.map(
      ({
        id: childId,
        displayName: childDisplayName,
        name: childName,
        children: childChildren,
      }) => ({
        id: childId || cuid(),
        displayName: childDisplayName,
        name: childName,
        children: formatMGChildren(childChildren),
      })
    )
  }
  return []
}

export default ({
  service,
}: {
  service: RawAzureManagementGroup
  account: string
  region: string
}): AzureManagementGroup => {
  const {
    id,
    name,
    type,
    region,
    tenantId,
    displayName,
    details: {
      version,
      updatedTime,
      updatedBy,
      parent: {
        id: parentId,
        name: parentName,
        displayName: parentDisplayName,
      },
      path = [],
      managementGroupAncestors = [],
      managementGroupAncestorsChain = [],
    },
    children = [],
  } = service
  return {
    id: id || cuid(),
    name,
    type,
    region,
    tenantId,
    displayName,
    details: {
      version,
      updatedTime: updatedTime.toISOString(),
      updatedBy,
      parent: {
        id: parentId || cuid(),
        name: parentName,
        displayName: parentDisplayName,
      },
      path: path.map(({ displayName: pathDisplayName, name: pathName }) => ({
        id: cuid(),
        displayName: pathDisplayName,
        name: pathName,
      })),
      managementGroupAncestors,
      managementGroupAncestorsChain: managementGroupAncestorsChain.map(
        ({ displayName: mGACDisplayName, name: mGACName }) => ({
          id: cuid(),
          displayName: mGACDisplayName,
          name: mGACName,
        })
      ),
    },
    children: formatMGChildren(children),
  }
}
