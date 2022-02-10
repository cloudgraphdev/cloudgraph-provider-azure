export default `mutation($input: [AddazureCdnOriginGroupInput!]!) {
  addazureCdnOriginGroup(input: $input, upsert: true) {
    numUids
  }
}`;
