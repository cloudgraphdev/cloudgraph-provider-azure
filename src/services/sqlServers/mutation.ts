export default `mutation($input: [AddazureSqlServerInput!]!) {
  addazureSqlServer(input: $input, upsert: true) {
    numUids
  }
}`;
