export default `mutation($input: [AddazureAppGatewayInput!]!) {
  addazureAppGateway(input: $input, upsert: true) {
    numUids
  }
}`;
