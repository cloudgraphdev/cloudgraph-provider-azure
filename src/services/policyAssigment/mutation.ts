export default `mutation($input: [AddazurePolicyAssigmentInput!]!) {
  addazurePolicyAssigment(input: $input, upsert: true) {
    numUids
  }
}`;
