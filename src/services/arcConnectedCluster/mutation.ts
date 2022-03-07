export default `mutation($input: [AddazureArcConnectedClusterInput!]!) {
  addazureArcConnectedCluster(input: $input, upsert: true) {
    numUids
  }
}`;
