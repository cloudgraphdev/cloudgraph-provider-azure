export default `mutation($input: [AddazureNetworkInterfaceInput!]!) {
  addazureNetworkInterface(input: $input, upsert: true) {
    numUids
  }
}`;
