import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import getConnections from './connections'
import format from './format'
import mutation from './mutation'
import getData from './data'

export default class AzureAksManagedCluster extends BaseService implements Service {
  format = format.bind(this)

  getConnections = getConnections.bind(this)

  getData = getData.bind(this)

  mutation = mutation
}
