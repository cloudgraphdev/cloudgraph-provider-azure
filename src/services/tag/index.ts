import { Service } from '@cloudgraph/sdk';
import BaseService from '../base';
// import getConnections from './connections';
import mutation from './mutation';

export default class AzureTag extends BaseService implements Service {
  format = ({service}: {service: any}): any => service

  // getConnections = getConnections.bind(this)

  getData

  mutation = mutation;
}
