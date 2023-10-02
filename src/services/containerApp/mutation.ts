export default `mutation($input: [AddazureContainerAppInput!]!) {
  addazureContainerApp(input: $input, upsert: true) {
    numUids
  }
}`
