export default `mutation($input: [AddazureBillingInput!]!) {
  addazureBilling(input: $input, upsert: true) {
    numUids
  }
}`;
