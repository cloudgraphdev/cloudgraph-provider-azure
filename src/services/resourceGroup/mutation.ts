export default `mutation($input: [AddazureResourceGroupInput!]!) {
  addazureResourceGroup(input: $input, upsert: true) {
    numUids
  }
}`;
