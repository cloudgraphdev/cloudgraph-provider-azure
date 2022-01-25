export default `mutation($input: [AddazureSecuritySettingInput!]!) {
  addazureSecuritySetting(input: $input, upsert: true) {
    numUids
  }
}`;
