export default `mutation($input: [AddazureContainerAppsInput!]!) {
  addazureContainerApps(input: $input, upsert: true) {
    numUids
  }
}`
