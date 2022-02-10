export default `mutation($input: [AddazureCdnOriginInput!]!) {
  addazureCdnOrigin(input: $input, upsert: true) {
    numUids
  }
}`;
