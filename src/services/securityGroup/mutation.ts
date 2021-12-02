export default `mutation($input: [AddazureNetworkSecurityGroupInput!]!) {
  addazureNetworkSecurityGroup(input: $input, upsert: true) {
    numUids
  }
}`;
