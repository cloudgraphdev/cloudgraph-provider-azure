import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'
import services from '../../enums/services'
import { caseInsensitiveEqual } from '../../utils'
import { RawAzureResourceGroup } from '../resourceGroup/data'
import { RawAzureSynapseWorkspace } from './data'
import { RawAzureSynapseBigDataPool } from '../synapseBigDataPools/data'
import { RawAzureSynapseSqlPool } from '../synapseSqlPools/data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureSynapseWorkspace
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, resourceGroupId: rgName, name } = service

  /**
   * Find resource group related to this workspace
   */
  const resourceGroups: {
    name: string
    data: { [property: string]: RawAzureResourceGroup[] }
  } = data.find(({ name }) => name === services.resourceGroup)

  if (resourceGroups?.data?.[region]) {
    const resourceGroupsInRegion: RawAzureResourceGroup[] = resourceGroups.data[
      region
    ].filter(({ name: resourceGroupName }: RawAzureResourceGroup) =>
      caseInsensitiveEqual(resourceGroupName, rgName)
    )

    if (!isEmpty(resourceGroupsInRegion)) {
      for (const rg of resourceGroupsInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.resourceGroup,
          relation: 'child',
          field: 'resourceGroup',
        })
      }
    }
  }

  /**
   * Find synapseBigDataPools related to this workspace
   */
  const synapseBigDataPools: {
    name: string
    data: { [property: string]: RawAzureSynapseBigDataPool[] }
  } = data.find(({ name }) => name === services.synapseBigDataPools)

  if (synapseBigDataPools?.data?.[region]) {
    const dataInRegion: RawAzureSynapseBigDataPool[] = synapseBigDataPools.data[
      region
    ].filter(({ id }: RawAzureSynapseBigDataPool) =>
      id.indexOf(name) !== -1
    )

    if (!isEmpty(dataInRegion)) {
      for (const pool of dataInRegion) {
        connections.push({
          id: pool.id,
          resourceType: services.synapseBigDataPools,
          relation: 'child',
          field: 'synapseBigDataPools',
        })
      }
    }
  }

  /**
   * Find synapseSqlPools related to this workspace
   */
  const synapseSqlPools: {
    name: string
    data: { [property: string]: RawAzureSynapseSqlPool[] }
  } = data.find(({ name }) => name === services.synapseSqlPools)

  if (synapseSqlPools?.data?.[region]) {
    const dataInRegion: RawAzureSynapseSqlPool[] = synapseSqlPools.data[
      region
    ].filter(({ id }: RawAzureSynapseSqlPool) =>
      id.indexOf(name) !== -1
    )

    if (!isEmpty(dataInRegion)) {
      for (const pool of dataInRegion) {
        connections.push({
          id: pool.id,
          resourceType: services.synapseSqlPools,
          relation: 'child',
          field: 'synapseSqlPools',
        })
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
