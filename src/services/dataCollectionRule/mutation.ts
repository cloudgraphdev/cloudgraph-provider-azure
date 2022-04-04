export default `mutation($input: [AddazureDataCollectionRuleInput!]!) {
  addazureDataCollectionRule(input: $input, upsert: true) {
    numUids
  }
}`;
