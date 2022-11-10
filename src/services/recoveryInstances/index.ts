import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import getConnections from './connections'
import getData from './data'
import format from './format'
import mutation from './mutation'

export default class AzureRecoveryInstance
  extends BaseService
  implements Service
{
  getData = getData.bind(this)

  getConnections = getConnections.bind(this)

  format = format.bind(this)

  mutation = mutation
}
