import { Service } from '@cloudgraph/sdk'
import BaseService from '../base'
import mutation from './mutation'

export default class AzureSubscription extends BaseService implements Service {
  format = ({ service }: { service: any }): any => service

  getData

  mutation = mutation
}
