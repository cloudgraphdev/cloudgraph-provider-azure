export default `mutation($input: [AddazureADApplicationInput!]!) {
  addazureADApplication(input: $input, upsert: true) {
    numUids
  }
}`;
