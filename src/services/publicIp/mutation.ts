export default `mutation($input: [AddazurePublicIpInput!]!) {
  addazurePublicIp(input: $input, upsert: true) {
    numUids
  }
}`;
