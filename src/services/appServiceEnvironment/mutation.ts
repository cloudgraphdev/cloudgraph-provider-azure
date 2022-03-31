export default `mutation($input: [AddazureAppServiceEnvironmentInput!]!) {
  addazureAppServiceEnvironment(input: $input, upsert: true) {
    numUids
  }
}`;
