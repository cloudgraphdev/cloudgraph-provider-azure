export default `mutation($input: [AddazureFunctionAppInput!]!) {
  addazureFunctionApp(input: $input, upsert: true) {
    numUids
  }
}`;
