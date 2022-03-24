export default `mutation($input: [AddazureLogAnalyticsWorkspaceInput!]!) {
  addazureLogAnalyticsWorkspace(input: $input, upsert: true) {
    numUids
  }
}`
