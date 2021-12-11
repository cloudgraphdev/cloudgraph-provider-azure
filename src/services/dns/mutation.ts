export default `mutation($input: [AddazureDnsZoneInput!]!) {
  addazureDnsZone(input: $input, upsert: true) {
    numUids
  }
}`;
