export default `mutation($input: [AddazureAppServiceWebAppInput!]!) {
  addazureAppServiceWebApp(input: $input, upsert: true) {
    numUids
  }
}`;
