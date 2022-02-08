export default `mutation($input: [AddazureEventHubInput!]!) {
  addazureEventHub(input: $input, upsert: true) {
    numUids
  }
}`;
