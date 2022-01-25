export default `mutation($input: [AddazureSecurityAssesmentInput!]!) {
  addazureSecurityAssesment(input: $input, upsert: true) {
    numUids
  }
}`;
