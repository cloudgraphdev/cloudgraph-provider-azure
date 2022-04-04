export default `mutation($input: [AddazureAppServiceKubeEnvironmentInput!]!) {
  addazureAppServiceKubeEnvironment(input: $input, upsert: true) {
    numUids
  }
}`;
