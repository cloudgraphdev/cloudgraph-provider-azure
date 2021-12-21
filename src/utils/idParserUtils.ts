export interface AzureResourceIdSegment {
  parseIdType?: string
  resourceId?: string
  subscriptionId?: string
  resourceGroups?: string
  baseResourceProviderNamespace?: string
  baseResourceType?: string
  baseResourceName?: string
  resourceProviderNamespace?: string
  resourceType?: string
  resourceName?: string
  parentResourceType?: string
  parentResourceName?: string
  grandParentResourceType?: string
  grandParentResourceName?: string
  managementGroups?: string
  networkInterfaces?: string
  ipConfigurations?: string
}

export const azureResourceProviderNamespace = {
  network: 'Microsoft.Network',
  compute: 'Microsoft.Compute',
}

// ResourceId Format
// https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-functions-resource
export const azureResourceIdFormat = {
  resourceAppliedToResource: 'resourceAppliedToResource',
  // one resource, e.g. /virtualNetwork
  extensionResourceAppliedToResourceGroupL1:
    'extensionResourceAppliedToResourceGroupL1',
  // resource with sub resource e.g. /virtualNetwork/subnet
  extensionResourceAppliedToResourceGroupL2:
    'extensionResourceAppliedToResourceGroupL2',
  // resource with sub resources
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
export const parseResourceId = (resourceId: string): AzureResourceIdSegment => {
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

  let azureResourceIdSegment = {}

  for (const resourceIdFormat of Object.keys(resourceIdRegExps)) {
    const m = resourceId.match(resourceIdRegExps[resourceIdFormat])

    if (m) {
      let resourceProvider
      switch (resourceIdFormat) {
        case azureResourceIdFormat.resourceAppliedToResource:
          // eslint-disable-next-line no-case-declarations
          const baseResourceProvider = m[6].split('/')
          resourceProvider = m[9].split('/')
          azureResourceIdSegment = {
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
          break
        case azureResourceIdFormat.extensionResourceAppliedToResourceGroupL1:
          resourceProvider = m[6].split('/')
          azureResourceIdSegment = {
            parseIdType:
              azureResourceIdFormat.extensionResourceAppliedToResourceGroupL1,
            resourceId,
            subscriptionId: m[2],
            resourceGroups: m[4],
            resourceProviderNamespace: resourceProvider[1],
            resourceType: resourceProvider[2],
            resourceName: resourceProvider[3],
          }
          break
        case azureResourceIdFormat.extensionResourceAppliedToResourceGroupL2:
          resourceProvider = m[6].split('/')
          azureResourceIdSegment = {
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
          break
        case azureResourceIdFormat.extensionResourceAppliedToResourceGroupL3:
          resourceProvider = m[6].split('/')
          azureResourceIdSegment = {
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
          break
        case azureResourceIdFormat.extensionResourceAppliedToVMScaleSetResource:
          resourceProvider = m[6].split('/')
          azureResourceIdSegment = {
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
          break
        case azureResourceIdFormat.extensionResourceAppliedToSubscription:
          resourceProvider = m[4].split('/')
          azureResourceIdSegment = {
            parseIdType:
              azureResourceIdFormat.extensionResourceAppliedToSubscription,
            resourceId,
            subscriptionId: m[2],
            resourceProviderNamespace: resourceProvider[1],
            resourceType: resourceProvider[2],
            resourceName: resourceProvider[3],
          }
          break
        case azureResourceIdFormat.extensionResourceAppliedToManagementGroup:
          resourceProvider = m[6].split('/')
          azureResourceIdSegment = {
            parseIdType:
              azureResourceIdFormat.extensionResourceAppliedToManagementGroup,
            resourceId,
            managementGroups: m[4],
            resourceProviderNamespace: resourceProvider[1],
            resourceType: resourceProvider[2],
            resourceName: resourceProvider[3],
          }
          break
        default:
          azureResourceIdSegment = {
            resourceId,
          }
      }
      return azureResourceIdSegment
    }
  }
  return azureResourceIdSegment
}
