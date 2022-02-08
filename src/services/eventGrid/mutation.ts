export default `mutation($input: [AddazureEventGridInput!]!) {
  addazureEventGrid(input: $input, upsert: true) {
    numUids
  }
}`;
