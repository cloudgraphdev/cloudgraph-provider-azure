export default `mutation($input: [AddazureADUserInput!]!) {
  addazureADUser(input: $input, upsert: true) {
    numUids
  }
}`;
