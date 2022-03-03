export default `mutation($input: [AddazureDatabaseManagedSqlInstanceInput!]!) {
  addazureDatabaseManagedSqlInstance(input: $input, upsert: true) {
    numUids
  }
}`;
