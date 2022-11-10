export default `mutation($input: [AddazureRecoveryPolicyInput!]!) {
  addazureRecoveryPolicy(input: $input, upsert: true) {
    numUids
  }
}`
