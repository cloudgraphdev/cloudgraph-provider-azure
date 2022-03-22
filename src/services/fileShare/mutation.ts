export default `mutation($input: [AddazureFileShareInput!]!) {
  addazureFileShare(input: $input, upsert: true) {
    numUids
  }
}`;
