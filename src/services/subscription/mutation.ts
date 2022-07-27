export default `mutation($input: [AddazureSubscriptionInput!]!) {
  addazureSubscription(input: $input, upsert: true) {
    numUids
  }
}`
