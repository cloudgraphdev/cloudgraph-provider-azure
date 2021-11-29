import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import format from './format'
import mutation from './mutation'
import getData from './data'

export default class AzureFunctionApp extends BaseService implements Service {
  format = format.bind(this)

  getData = getData.bind(this)

  mutation = mutation
}
