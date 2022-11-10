export default `mutation($input: [AddazureRecoveryInstanceInput!]!) {
  addazureRecoveryInstance(input: $input, upsert: true) {
    numUids
  }
}`
