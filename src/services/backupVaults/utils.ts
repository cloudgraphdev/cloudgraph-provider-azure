export interface DppIdentityDetails {
  type?: string
  principalId?: string
  tenantId?: string
}

export interface StorageSetting {
  datastoreType?: string
  type?: string
}

export interface BackupVault {
  provisioningState?: string
  storageSettings?: StorageSetting[]
  isVaultProtectedByResourceGuard?: boolean
}

export interface BackupVaultResource {
  id?: string
  name?: string
  type?: string
  location?: string
  tags?: {
    [propertyName: string]: string
  }
  eTag?: string
  identity: DppIdentityDetails
  properties: BackupVault
  region: string
  resourceGroupId: string
}
