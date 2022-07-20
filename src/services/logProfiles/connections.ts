import { ServiceConnection } from '@cloudgraph/sdk'
import { isEmpty } from 'lodash'

import services from '../../enums/services'
import { RawAzureStorageAccount } from '../storageAccount/data'
import { RawAzureLogProfileResource } from './data'

export default ({
  service,
  data,
  region,
}: {
  service: RawAzureLogProfileResource
  data: Array<{ name: string; data: { [property: string]: any[] } }>
  region: string
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  const { id, storageAccountId } = service

  /**
   * Find storage account related to this log profile
   */
  const storageAccounts: {
    name: string
    data: { [property: string]: RawAzureStorageAccount[] }
  } = data.find(({ name }) => name === services.storageAccount)

  if (storageAccounts?.data?.[region]) {
    const storageAccountsInRegion: RawAzureStorageAccount[] =
      storageAccounts.data[region].filter(
        ({ id: saId }: RawAzureStorageAccount) => saId === storageAccountId
      )

    if (!isEmpty(storageAccountsInRegion)) {
      for (const rg of storageAccountsInRegion) {
        connections.push({
          id: rg.id,
          resourceType: services.storageAccount,
          relation: 'child',
          field: 'storageAccount',
        })
      }
    }
  }

  const rgResult = {
    [id]: connections,
  }
  return rgResult
}
