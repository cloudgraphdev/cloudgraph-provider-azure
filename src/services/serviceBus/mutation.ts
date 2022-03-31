export default `mutation($input: [AddazureServiceBusInput!]!) {
  addazureServiceBus(input: $input, upsert: true) {
    numUids
  }
}`;
