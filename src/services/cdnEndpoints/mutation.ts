export default `mutation($input: [AddazureCdnEndpointInput!]!) {
  addazureCdnEndpoint(input: $input, upsert: true) {
    numUids
  }
}`;
