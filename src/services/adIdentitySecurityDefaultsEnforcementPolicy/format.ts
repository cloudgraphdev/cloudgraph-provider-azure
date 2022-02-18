import cuid from 'cuid'
import { AzureAdIdentitySecurityDefaultsEnforcementPolicy } from '../../types/generated'
import { RawAzureADIdentitySecurityDefaultsEnforcementPolicyClient } from './data'

export default ({
  service,
}: {
  service: RawAzureADIdentitySecurityDefaultsEnforcementPolicyClient
  account: string
}): AzureAdIdentitySecurityDefaultsEnforcementPolicy => {
  const {
    id,
    region,
    description,
    displayName,
    isEnabled,
  } = service
  return {
    id: id || cuid(),
    region,
    description,
    displayName,
    isEnabled,
  }
}
