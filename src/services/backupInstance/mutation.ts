export default `mutation($input: [AddazureBackupInstanceInput!]!) {
  addazureBackupInstance(input: $input, upsert: true) {
    numUids
  }
}`
