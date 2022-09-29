export default `mutation($input: [AddazureDbManagedSqlInstanceInput!]!) {
  addazureDbManagedSqlInstance(input: $input, upsert: true) {
    numUids
  }
}`;
