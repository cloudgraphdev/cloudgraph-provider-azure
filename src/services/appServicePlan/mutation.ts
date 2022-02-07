export default `mutation($input: [AddazureAppServicePlanInput!]!) {
  addazureAppServicePlan(input: $input, upsert: true) {
    numUids
  }
}`;
