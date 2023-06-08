export default `mutation($input: [AddazureRouteTableInput!]!) {
  addazureRouteTable(input: $input, upsert: true) {
    numUids
  }
}`;
