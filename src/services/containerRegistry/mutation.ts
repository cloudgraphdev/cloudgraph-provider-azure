export default `mutation($input: [AddazureContainerRegistryInput!]!) {
  addazureContainerRegistry(input: $input, upsert: true) {
    numUids
  }
}`;
