export default `mutation($input: [AddazureLogAnalyticsSolutionInput!]!) {
  addazureLogAnalyticsSolution(input: $input, upsert: true) {
    numUids
  }
}`
