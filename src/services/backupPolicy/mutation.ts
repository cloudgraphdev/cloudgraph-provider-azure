export default `mutation($input: [AddazureBackupPolicyInput!]!) {
  addazureBackupPolicy(input: $input, upsert: true) {
    numUids
  }
}`
