export default `mutation($input: [AddazureManagementGroupInput!]!) {
  addazureManagementGroup(input: $input, upsert: true) {
    numUids
  }
}`;
