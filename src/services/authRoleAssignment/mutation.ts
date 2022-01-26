export default `mutation($input: [AddazureAuthRoleAssignmentInput!]!) {
  addazureAuthRoleAssignment(input: $input, upsert: true) {
    numUids
  }
}`;
