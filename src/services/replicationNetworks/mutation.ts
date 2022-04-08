export default `mutation($input: [AddazureReplicationNetworkInput!]!) {
  addazureReplicationNetwork(input: $input, upsert: true) {
    numUids
  }
}`;
