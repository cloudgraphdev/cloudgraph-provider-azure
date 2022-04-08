export default `mutation($input: [AddazureReplicationPolicyInput!]!) {
  addazureReplicationPolicy(input: $input, upsert: true) {
    numUids
  }
}`;
