import { ListContainerItem } from '@azure/arm-storage/esm/models'
import { ServiceConnection } from '@cloudgraph/sdk'
import services from '../../enums/services'

/**
 * StorageContainer
 */

export default ({
  service: storageContainer,
  data,
  region,
}: {
  data: { name: string; data: { [property: string]: any[] } }[]
  service: ListContainerItem & {
    storageAccountId: string
    region: string
  }
  region: string
}): { [key: string]: ServiceConnection[] } => {
  const connections: ServiceConnection[] = []

  /**
   * Find Storage Account
   * related to the Storage Container
   */

  const {
    id,
    storageAccountId
  } = storageContainer

  const storageAccounts = data.find(({ name }) => name === services.storageAccount)

  if (storageAccounts?.data?.[region]) {
    const storageAccount = storageAccounts.data[region].find(({id}) => 
      id === storageAccountId
    )

    if (storageAccount) {
      connections.push({
        id: storageAccountId,
        resourceType: services.storageAccount,
        relation: 'child',
        field: 'storageAccount',
      })
    }
  }

  const storageContainerResult = {
    [id]: connections,
  }
  return storageContainerResult;
}
