import cuid from 'cuid'

import { AzureLogAnalyticsSolution } from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureLogAnalyticsSolution } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureLogAnalyticsSolution
  account: string
  region: string
}): AzureLogAnalyticsSolution => {
  const {
    id,
    name,
    resourceGroupId,
    plan,
    properties,
    type,
    Tags = {},
  } = service

  const {
    workspaceResourceId,
    provisioningState,
    containedResources,
    referencedResources,
    // TODO: these are valid properties but arent on the ts type from azure so we have to ignore the linting
    // eslint-disable-next-line
    // @ts-ignore
    creationTime,
    // eslint-disable-next-line
    // @ts-ignore
    lastModifiedTime // eslint-disable-line
  } = properties

  return {
    id: id || cuid(),
    name,
    type,
    resourceGroupId,
    subscriptionId: account,
    region,
    plan,
    properties: {
      workspaceResourceId,
      provisioningState,
      containedResources,
      referencedResources,
      creationTime,
      lastModifiedTime
    },
    tags: formatTagsFromMap(Tags),
  }
}
