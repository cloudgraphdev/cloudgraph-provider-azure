export default `mutation($input: [AddazureRecoveryVaultInput!]!) {
  addazureRecoveryVault(input: $input, upsert: true) {
    numUids
  }
}`;
