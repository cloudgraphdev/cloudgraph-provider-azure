export default `mutation($input: [AddazureTagInput!]!) {
  addazureTag(input: $input, upsert: true) {
    numUids
  }
}`;
