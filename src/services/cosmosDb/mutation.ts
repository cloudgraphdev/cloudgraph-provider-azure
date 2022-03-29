export default `mutation($input: [AddazureCosmosDbInput!]!) {
  addazureCosmosDb(input: $input, upsert: true) {
    numUids
  }
}`;
