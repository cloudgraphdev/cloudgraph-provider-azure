export default `mutation($input: [AddazureRouteFilterInput!]!) {
  addazureRouteFilter(input: $input, upsert: true) {
    numUids
  }
}`;
