export default `mutation($input: [AddazureLogProfileInput!]!) {
  addazureLogProfile(input: $input, upsert: true) {
    numUids
  }
}`;
