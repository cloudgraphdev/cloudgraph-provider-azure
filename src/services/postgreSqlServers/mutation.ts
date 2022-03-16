export default `mutation($input: [AddazurePostgreSqlServerInput!]!) {
  addazurePostgreSqlServer(input: $input, upsert: true) {
    numUids
  }
}`;
