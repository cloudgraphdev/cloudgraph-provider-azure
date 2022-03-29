import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import getData from './data'
import format from './format'
import getConnections from './connections'
import mutation from './mutation'

export default class AzureCosmosDb extends BaseService implements Service {
  getData = getData.bind(this)
  
  format = format.bind(this)

  mutation = mutation

  getConnections = getConnections.bind(this)
}
