import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import getData from './data'
import format from './format'
import mutation from './mutation'
import getConnections from './connections'

export default class AzureServiceBus extends BaseService implements Service {
  getData = getData.bind(this)
  
  format = format.bind(this)

  mutation = mutation

 getConnections = getConnections.bind(this)
}
