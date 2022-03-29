export default `mutation($input: [AddazureMetricAlertInput!]!) {
  addazureMetricAlert(input: $input, upsert: true) {
    numUids
  }
}`;
