export default `mutation($input: [AddazureDatabaseSqlVmInput!]!) {
  addazureDatabaseSqlVm(input: $input, upsert: true) {
    numUids
  }
}`;
