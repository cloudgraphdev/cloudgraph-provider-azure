import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import format from './format'
import getConnections from './connections'
import mutation from './mutation'
import getData from './data'

export default class AzureRedisCache extends BaseService implements Service {
  format = format.bind(this)

  getConnections = getConnections.bind(this)

  getData = getData.bind(this)

  mutation = mutation
}
