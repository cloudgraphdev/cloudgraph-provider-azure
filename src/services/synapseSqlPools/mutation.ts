export default `mutation($input: [AddazureSynapseSqlPoolInput!]!) {
  addazureSynapseSqlPool(input: $input, upsert: true) {
    numUids
  }
}`;
