export const azureResourceIdSegment = {
  parseIdType: 'parseIdType',
  resourceId: 'resourceId',
  subscriptionId: 'subscriptionId',
  resourceGroups: 'resourceGroups',
  baseResourceProviderNamespace: 'baseResourceProviderNamespace',
  baseResourceType: 'baseResourceType',
  baseResourceName: 'baseResourceName',
  resourceProviderNamespace: 'resourceProviderNamespace',
  resourceType: 'resourceType',
  resourceName: 'resourceName',
  parentResourceType: 'parentResourceType',
  parentResourceName: 'parentResourceName',
  grandParentResourceType: 'grandParentResourceType',
  grandParentResourceName: 'grandParentResourceName',
  managementGroups: 'managementGroups',
}

export const azureResourceProviderNamespace = {
  network: 'Microsoft.Network',
  compute: 'Microsoft.Compute',
}

export const azureResourceIdFormat = {
  resourceAppliedToResource: 'resourceAppliedToResource',
  extensionResourceAppliedToResourceGroupL1:
    'extensionResourceAppliedToResourceGroupL1',
  extensionResourceAppliedToResourceGroupL2:
    'extensionResourceAppliedToResourceGroupL2',
  extensionResourceAppliedToResourceGroupL3:
    'extensionResourceAppliedToResourceGroupL3',
  extensionResourceAppliedToVMScaleSetResource:
    'extensionResourceAppliedToVMScaleSetResource',
  extensionResourceAppliedToSubscription:
    'extensionResourceAppliedToSubscription',
  extensionResourceAppliedToManagementGroup:
    'extensionResourceAppliedToManagementGroup',
}

// TODO need to optimized
export const parseResourceId = (resourceId: string): any => {
  // used for subscriptionId
  const regExpUUIDMatcher =
    '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}'
  // used for resource name
  // most azure resource name can not use *#&+:<>?
  const regExpResourceNameMatcher = '[\\w-_~`!@$%^()[\\]={}|\\;"\'<>,.]*'

  const resourceIdRegExps = {
    resourceAppliedToResource: RegExp(
      // eslint-disable-next-line max-len
      `^/(subscriptions)/(${regExpUUIDMatcher})/(resourceGroups|resourcegroups)/(${regExpResourceNameMatcher})/(providers)((/${regExpResourceNameMatcher}){3})/(providers)((/${regExpResourceNameMatcher}){3})$`
    ),
    extensionResourceAppliedToResourceGroupL1: RegExp(
      // eslint-disable-next-line max-len
      `^/(subscriptions)/(${regExpUUIDMatcher})/(resourceGroups|resourcegroups)/(${regExpResourceNameMatcher})/(providers)((/${regExpResourceNameMatcher}){3})$`
    ),
    extensionResourceAppliedToResourceGroupL2: RegExp(
      // eslint-disable-next-line max-len
      `^/(subscriptions)/(${regExpUUIDMatcher})/(resourceGroups|resourcegroups)/(${regExpResourceNameMatcher})/(providers)((/${regExpResourceNameMatcher}){5})$`
    ),
    extensionResourceAppliedToResourceGroupL3: RegExp(
      // eslint-disable-next-line max-len
      `^/(subscriptions)/(${regExpUUIDMatcher})/(resourceGroups|resourcegroups)/(${regExpResourceNameMatcher})/(providers)((/${regExpResourceNameMatcher}){7})$`
    ),
    extensionResourceAppliedToVMScaleSetResource: RegExp(
      // eslint-disable-next-line max-len
      `^/(subscriptions)/(${regExpUUIDMatcher})/(resourceGroups|resourcegroups)/(${regExpResourceNameMatcher})/(providers)((/${regExpResourceNameMatcher}){9})$`
    ),
    extensionResourceAppliedToSubscription: RegExp(
      `^/(subscriptions)/(${regExpUUIDMatcher})/(providers)((/${regExpResourceNameMatcher}){3})$`
    ),
    extensionResourceAppliedToManagementGroup: RegExp(
      // eslint-disable-next-line max-len
      `^/(providers)/(Microsoft.Management)/(managementGroups|resourcegroups)/(${regExpResourceNameMatcher})/(providers)((/${regExpResourceNameMatcher}){3})$`
    ),
  }

  for (const resourceIdFormat of Object.keys(resourceIdRegExps)) {
    const m = resourceId.match(resourceIdRegExps[resourceIdFormat])

    if (m) {
      let resourceProvider
      switch (resourceIdFormat) {
        case azureResourceIdFormat.resourceAppliedToResource:
          // eslint-disable-next-line no-case-declarations
          const baseResourceProvider = m[6].split('/')
          resourceProvider = m[9].split('/')
          return {
            parseIdType: azureResourceIdFormat.resourceAppliedToResource,
            resourceId,
            subscriptionId: m[2],
            resourceGroups: m[4],
            baseResourceProviderNamespace: baseResourceProvider[1],
            baseResourceType: baseResourceProvider[2],
            baseResourceName: baseResourceProvider[3],
            resourceProviderNamespace: resourceProvider[1],
            resourceType: resourceProvider[2],
            resourceName: resourceProvider[3],
          }
        case azureResourceIdFormat.extensionResourceAppliedToResourceGroupL1:
          resourceProvider = m[6].split('/')
          return {
            parseIdType:
              azureResourceIdFormat.extensionResourceAppliedToResourceGroupL1,
            resourceId,
            subscriptionId: m[2],
            resourceGroups: m[4],
            resourceProviderNamespace: resourceProvider[1],
            resourceType: resourceProvider[2],
            resourceName: resourceProvider[3],
          }
        case azureResourceIdFormat.extensionResourceAppliedToResourceGroupL2:
          resourceProvider = m[6].split('/')
          return {
            parseIdType:
              azureResourceIdFormat.extensionResourceAppliedToResourceGroupL2,
            resourceId,
            subscriptionId: m[2],
            resourceGroups: m[4],
            resourceProviderNamespace: resourceProvider[1],
            parentResourceType: resourceProvider[2],
            parentResourceName: resourceProvider[3],
            resourceType: resourceProvider[4],
            resourceName: resourceProvider[5],
          }
        case azureResourceIdFormat.extensionResourceAppliedToResourceGroupL3:
          resourceProvider = m[6].split('/')
          return {
            parseIdType:
              azureResourceIdFormat.extensionResourceAppliedToResourceGroupL3,
            resourceId,
            subscriptionId: m[2],
            resourceGroups: m[4],
            resourceProviderNamespace: resourceProvider[1],
            grandParentResourceType: resourceProvider[2],
            grandParentResourceName: resourceProvider[3],
            parentResourceType: resourceProvider[4],
            parentResourceName: resourceProvider[5],
            resourceType: resourceProvider[6],
            resourceName: resourceProvider[7],
          }
        case azureResourceIdFormat.extensionResourceAppliedToVMScaleSetResource:
          resourceProvider = m[6].split('/')
          return {
            parseIdType:
              azureResourceIdFormat.extensionResourceAppliedToVMScaleSetResource,
            resourceId,
            subscriptionId: m[2],
            resourceGroups: m[4],
            resourceProviderNamespace: resourceProvider[1],
            parentResourceType: resourceProvider[2],
            parentResourceName: resourceProvider[3],
            resourceType: resourceProvider[4],
            resourceName: resourceProvider[5],
            networkInterfaces: resourceProvider[7],
            ipConfigurations: resourceProvider[9],
          }
        case azureResourceIdFormat.extensionResourceAppliedToSubscription:
          resourceProvider = m[4].split('/')
          return {
            parseIdType:
              azureResourceIdFormat.extensionResourceAppliedToSubscription,
            resourceId,
            subscriptionId: m[2],
            resourceProviderNamespace: resourceProvider[1],
            resourceType: resourceProvider[2],
            resourceName: resourceProvider[3],
          }
        case azureResourceIdFormat.extensionResourceAppliedToManagementGroup:
          resourceProvider = m[6].split('/')
          return {
            parseIdType:
              azureResourceIdFormat.extensionResourceAppliedToManagementGroup,
            resourceId,
            managementGroups: m[4],
            resourceProviderNamespace: resourceProvider[1],
            resourceType: resourceProvider[2],
            resourceName: resourceProvider[3],
          }
        default:
          return null
      }
    }
  }
}
