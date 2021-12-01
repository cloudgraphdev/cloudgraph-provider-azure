export default `mutation($input: [AddazureVirtualNetworkInput!]!) {
  addazureVirtualNetwork(input: $input, upsert: true) {
    numUids
  }
}`;
