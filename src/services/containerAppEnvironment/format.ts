import { RawAzureAppEnvironment } from './data'
import { formatTagsFromMap } from '../../utils/format'
import { AzureContainerAppEnvironment } from '../../types/generated'

export default ({
  service,
  account: subscriptionId,
}: {
  service: RawAzureAppEnvironment
  account: string
}): AzureContainerAppEnvironment => {
  const {
    id,
    name,
    type,
    region,
    resourceGroupId,
    certificates = [],
    daprComponents = [],
    storages = [],
    defaultDomain,
    eventStreamEndpoint,
    infrastructureResourceGroup,
    provisioningState,
    staticIp,
    zoneRedundant,
    Tags: TagMap,
  } = service
  return {
    id,
    subscriptionId,
    name,
    type,
    region,
    resourceGroupId,
    certificates: certificates.map(c => ({
      id: c.id,
      name: c.name,
      type: c.type,
      location: c.location,
    })),
    daprComponents: daprComponents.map(d => ({
      id: d.id,
      name: d.name,
      type: d.type,
      componentType: d.componentType,
      ignoreErrors: d.ignoreErrors,
      secretStoreComponent: d.secretStoreComponent,
      version: d.version,
    })),
    storages: storages.map(s => ({
      id: s.id,
      name: s.name,
      type: s.type,
    })),
    defaultDomain,
    eventStreamEndpoint,
    infrastructureResourceGroup,
    provisioningState,
    staticIp,
    zoneRedundant,
    tags: formatTagsFromMap(TagMap),
  }
}
