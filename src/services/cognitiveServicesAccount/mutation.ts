export default `mutation($input: [AddazureCognitiveServicesAccountInput!]!) {
  addazureCognitiveServicesAccount(input: $input, upsert: true) {
    numUids
  }
}`;
