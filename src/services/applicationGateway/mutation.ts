export default `mutation($input: [AddazureApplicationGatewayInput!]!) {
  addazureApplicationGateway(input: $input, upsert: true) {
    numUids
  }
}`;
