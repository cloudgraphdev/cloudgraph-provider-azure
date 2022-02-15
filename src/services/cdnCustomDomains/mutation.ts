export default `mutation($input: [AddazureCdnCustomDomainInput!]!) {
  addazureCdnCustomDomain(input: $input, upsert: true) {
    numUids
  }
}`;
