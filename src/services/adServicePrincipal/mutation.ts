export default `mutation($input: [AddazureADServicePrincipalInput!]!) {
  addazureADServicePrincipal(input: $input, upsert: true) {
    numUids
  }
}`;
