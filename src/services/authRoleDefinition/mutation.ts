export default `mutation($input: [AddazureAuthRoleDefinitionInput!]!) {
  addazureAuthRoleDefinition(input: $input, upsert: true) {
    numUids
  }
}`;
