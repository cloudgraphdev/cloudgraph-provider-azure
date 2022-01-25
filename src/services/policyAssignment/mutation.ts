export default `mutation($input: [AddazurePolicyAssignmentInput!]!) {
  addazurePolicyAssignment(input: $input, upsert: true) {
    numUids
  }
}`;
