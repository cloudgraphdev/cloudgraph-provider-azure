export default `mutation($input: [AddazureAksManagedClusterInput!]!) {
  addazureAksManagedCluster(input: $input, upsert: true) {
    numUids
  }
}`;
