export default `mutation($input: [AddazureReplicationCenterInput!]!) {
  addazureReplicationCenter(input: $input, upsert: true) {
    numUids
  }
}`;
