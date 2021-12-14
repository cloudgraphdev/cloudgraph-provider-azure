export default `mutation($input: [AddazureKeyVaultInput!]!) {
  addazureKeyVault(input: $input, upsert: true) {
    numUids
  }
}`;
