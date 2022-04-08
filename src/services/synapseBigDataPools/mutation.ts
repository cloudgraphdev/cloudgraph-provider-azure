export default `mutation($input: [AddazureSynapseBigDataPoolInput!]!) {
  addazureSynapseBigDataPool(input: $input, upsert: true) {
    numUids
  }
}`;
