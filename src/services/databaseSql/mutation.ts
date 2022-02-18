export default `mutation($input: [AddazureDatabaseSqlInput!]!) {
  addazureDatabaseSql(input: $input, upsert: true) {
    numUids
  }
}`;
