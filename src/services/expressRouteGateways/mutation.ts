export default `mutation($input: [AddazureExpressRouteGatewayInput!]!) {
  addazureExpressRouteGateway(input: $input, upsert: true) {
    numUids
  }
}`;
