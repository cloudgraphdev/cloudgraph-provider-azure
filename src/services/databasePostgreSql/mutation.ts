export default `mutation($input: [AddazureDatabasePostgreSqlInput!]!) {
  addazureDatabasePostgreSql(input: $input, upsert: true) {
    numUids
  }
}`;
