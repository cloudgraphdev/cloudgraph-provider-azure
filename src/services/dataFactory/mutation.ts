export default `mutation($input: [AddazureDataFactoryInput!]!) {
  addazureDataFactory(input: $input, upsert: true) {
    numUids
  }
}`;
