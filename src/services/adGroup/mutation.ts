export default `mutation($input: [AddazureADGroupInput!]!) {
  addazureADGroup(input: $input, upsert: true) {
    numUids
  }
}`;
