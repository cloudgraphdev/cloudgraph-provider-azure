export default `mutation($input: [AddazureMySqlServerInput!]!) {
  addazureMySqlServer(input: $input, upsert: true) {
    numUids
  }
}`;
