export default `mutation($input: [AddazureActionGroupInput!]!) {
  addazureActionGroup(input: $input, upsert: true) {
    numUids
  }
}`;
