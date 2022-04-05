import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import getConnections from './connections'
import format from './format'
import mutation from './mutation'
import getData from './data'

export default class AzureBackupInstance
  extends BaseService
  implements Service
{
  getData = getData.bind(this)

  getConnections = getConnections.bind(this)

  format = format.bind(this)

  mutation = mutation
}
