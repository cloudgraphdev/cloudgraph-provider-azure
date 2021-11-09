import { ServiceConnection } from '@cloudgraph/sdk'
// import { isEmpty } from 'lodash'
// import regions from '../../enums/regions'
// import services from '../../enums/services'

// const findServiceInstancesWithTag = (tag: any, service: any): any => {
//   const { id } = tag
//   return service.filter(({ Tags }) => {
//     for (const [key, value] of Object.entries(Tags)) {
//       if (id === `${key}:${value}`) {
//         return true
//       }
//     }
//     return false
//   })
// }

export default ({
  service: tag,
  // data,
}: {
  service: any
  data: Array<{ name: string; data: { [property: string]: any[] } }>
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  // for (const region of regions) {}

  const tagResult = {
    [tag.id]: connections,
  }
  return tagResult
}
