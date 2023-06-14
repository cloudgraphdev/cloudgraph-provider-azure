export default `mutation($input: [AddazurePublicIpPrefixInput!]!) {
  addazurePublicIpPrefix(input: $input, upsert: true) {
    numUids
  }
}`
