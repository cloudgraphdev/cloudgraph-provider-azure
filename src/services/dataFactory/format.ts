import {
  AzureDataFactory,
  AzureDataFactoryDataFlow,
  AzureDataFactoryDataset,
  AzureDataFactoryIntegrationRuntime,
  AzureDataFactoryLinkedService,
  AzureDataFactoryPipeline,
  AzureDataFactoryTrigger,
} from '../../types/generated'
import { formatTagsFromMap } from '../../utils/format'
import { RawAzureDataFactory } from './data'

export default ({
  service,
  account,
  region,
}: {
  service: RawAzureDataFactory
  account: string
  region: string
}): AzureDataFactory => {
  const {
    id,
    name,
    type,
    resourceGroupId,
    Tags,
    eTag,
    identity,
    provisioningState,
    createTime,
    version,
    publicNetworkAccess,
    pipelines = [],
    dataFlows = [],
    datasets = [],
    integrationRuntimes = [],
    linkedServices = [],
    triggers = [],
  } = service

  return {
    id,
    name,
    region,
    type,
    subscriptionId: account,
    resourceGroupId,
    tags: formatTagsFromMap(Tags),
    eTag,
    identity: identity
      ? {
          type: identity.type,
          principalId: identity.principalId,
          tenantId: identity.tenantId,
        }
      : {},
    provisioningState,
    createTime,
    version,
    publicNetworkAccess,
    pipelines:
      pipelines?.map(
        ({
          id: pipelineId,
          name: pipelineName,
          type: pipelineType,
        }): AzureDataFactoryPipeline => ({
          id: pipelineId,
          name: pipelineName,
          type: pipelineType,
        })
      ) ?? [],
    dataFlows:
      dataFlows?.map(
        ({
          id: dataFlowId,
          name: dataFlowName,
          type: dataFlowType,
        }): AzureDataFactoryDataFlow => ({
          id: dataFlowId,
          name: dataFlowName,
          type: dataFlowType,
        })
      ) ?? [],
    datasets:
      datasets?.map(
        ({
          id: datasetId,
          name: datasetName,
          properties: { type: datasetType },
        }): AzureDataFactoryDataset => ({
          id: datasetId,
          name: datasetName,
          type: datasetType,
        })
      ) ?? [],
    integrationRuntimes:
      integrationRuntimes?.map(
        ({
          id: runtimeId,
          name: runtimeName,
          properties: { type: runtimeType },
        }): AzureDataFactoryIntegrationRuntime => ({
          id: runtimeId,
          name: runtimeName,
          type: runtimeType,
        })
      ) ?? [],
    linkedServices:
      linkedServices?.map(
        ({
          id: runtimeId,
          name: runtimeName,
          properties: { type: runtimeType },
        }): AzureDataFactoryLinkedService => ({
          id: runtimeId,
          name: runtimeName,
          type: runtimeType,
        })
      ) ?? [],
    triggers:
      triggers?.map(
        ({
          id: triggerId,
          name: triggerName,
          properties: { type: triggerType },
        }): AzureDataFactoryTrigger => ({
          id: triggerId,
          name: triggerName,
          type: triggerType,
        })
      ) ?? [],
  }
}
