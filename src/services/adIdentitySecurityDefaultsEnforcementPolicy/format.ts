import { AzureAdIdentitySecurityDefaultsEnforcementPolicy } from '../../types/generated'
import { RawAzureADIdentitySecurityDefaultsEnforcementPolicyClient } from './data'

export default ({
  service,
}: {
  service: RawAzureADIdentitySecurityDefaultsEnforcementPolicyClient
  account: string
}): AzureAdIdentitySecurityDefaultsEnforcementPolicy => {
  const { id, region, description, displayName, isEnabled } = service
  return {
    id,
    region,
    description,
    displayName,
    isEnabled,
  }
}
