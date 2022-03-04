export default `mutation($input: [AddazureTrafficManagerProfileInput!]!) {
  addazureTrafficManagerProfile(input: $input, upsert: true) {
    numUids
  }
}`;
