export default `mutation($input: [AddazureBackupVaultInput!]!) {
  addazureBackupVault(input: $input, upsert: true) {
    numUids
  }
}`
