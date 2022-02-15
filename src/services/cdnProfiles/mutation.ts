export default `mutation($input: [AddazureCdnProfileInput!]!) {
  addazureCdnProfile(input: $input, upsert: true) {
    numUids
  }
}`;
