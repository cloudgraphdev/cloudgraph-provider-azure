export default `mutation($input: [AddazureActivityLogAlertInput!]!) {
  addazureActivityLogAlert(input: $input, upsert: true) {
    numUids
  }
}`;
