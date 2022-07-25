import { Entity, ServiceConnection } from '@cloudgraph/sdk'
import { flatMap } from 'lodash'
import services from '../../enums/services'

// to avoid boilerplate, all aliases are generated from the type azureXxxx <=> xxxx
const aliases = Object.keys(services).reduce(
  (acc: { [k: string]: string }, key: string) => {
    const serviceName = services[key]
    const formattedName =
      serviceName.charAt(0).toUpperCase() + serviceName.slice(1)
    const serivceAlias = `azure${formattedName}`
    acc[serviceName] = serivceAlias
    return acc
  },
  {}
)

export default ({
  service,
  data,
}: {
  service: { id: string; regions: string[] }
  data: Entity[]
}): {
  [property: string]: ServiceConnection[]
} => {
  const { id: subscriptionId } = service
  const connections: ServiceConnection[] = []
  const connectTo = Object.values(services)

  for (const serviceName of connectTo) {
    const instances: {
      name: string
      data: { [property: string]: any[] }
    } = data.find(({ name }) => name === serviceName)

    if (instances?.data) {
      const filtered = flatMap(instances.data).filter(
        i => i.subscriptionId === subscriptionId
      )

      for (const instance of filtered) {
        if (instance) {
          connections.push({
            id: instance.id,
            resourceType: serviceName,
            relation: 'child',
            field: aliases[serviceName] ? aliases[serviceName] : serviceName,
          })
        }
      }
    }
  }

  return {
    [subscriptionId]: connections,
  }
}
