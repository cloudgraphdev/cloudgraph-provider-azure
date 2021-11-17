import { regionMap } from '../enums/regions'
import services from '../enums/services'

export const GLOBAL_REGION = regionMap.global
export const DEFAULT_REGION = regionMap.unitedStates
export const DEFAULT_RESOURCES = Object.values(services).join(',')
export const ENV_VAR_CREDS_LOG = 'Using ENV variable credentials'
export const MESSAGE_INTERVAL = 45000