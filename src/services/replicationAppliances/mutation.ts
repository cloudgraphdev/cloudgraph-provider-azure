export default `mutation($input: [AddazureReplicationApplianceInput!]!) {
  addazureReplicationAppliance(input: $input, upsert: true) {
    numUids
  }
}`;
