export default `mutation($input: [AddazurePrivateDnsZoneInput!]!) {
  addazurePrivateDnsZone(input: $input, upsert: true) {
    numUids
  }
}`;
