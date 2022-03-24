export default `mutation($input: [AddazureDiagnosticSettingInput!]!) {
  addazureDiagnosticSetting(input: $input, upsert: true) {
    numUids
  }
}`;
