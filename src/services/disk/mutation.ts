export default `mutation($input: [AddazureDiskInput!]!) {
  addazureDisk(input: $input, upsert: true) {
    numUids
  }
}`;
