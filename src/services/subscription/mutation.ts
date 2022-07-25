export default `mutation($input: [AddazureSubsriptionInput!]!) {
  addazureSubsription(input: $input, upsert: true) {
    numUids
  }
}`
