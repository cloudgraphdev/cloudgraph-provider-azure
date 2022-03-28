export default `mutation($input: [AddazureAppInsightsInput!]!) {
  addazureAppInsights(input: $input, upsert: true) {
    numUids
  }
}`
