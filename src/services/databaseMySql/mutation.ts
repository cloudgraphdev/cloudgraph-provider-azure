export default `mutation($input: [AddazureDatabaseMySqlInput!]!) {
  addazureDatabaseMySql(input: $input, upsert: true) {
    numUids
  }
}`;
