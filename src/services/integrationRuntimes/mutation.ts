export default `mutation($input: [AddazureIntegrationRuntimeInput!]!) {
  addazureIntegrationRuntime(input: $input, upsert: true) {
    numUids
  }
}`;
