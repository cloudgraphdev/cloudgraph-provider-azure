export default `mutation($input: [AddazureStorageContainerInput!]!) {
  addazureStorageContainer(input: $input, upsert: true) {
    numUids
  }
}`;
