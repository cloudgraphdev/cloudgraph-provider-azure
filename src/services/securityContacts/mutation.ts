export default `mutation($input: [AddazureSecurityContactInput!]!) {
  addazureSecurityContact(input: $input, upsert: true) {
    numUids
  }
}`;
