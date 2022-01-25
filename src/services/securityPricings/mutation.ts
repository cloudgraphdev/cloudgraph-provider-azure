export default `mutation($input: [AddazureSecurityPricingInput!]!) {
  addazureSecurityPricing(input: $input, upsert: true) {
    numUids
  }
}`;
