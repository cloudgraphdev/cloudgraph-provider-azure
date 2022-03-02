export default `mutation($input: [AddazureAutoProvisioningSettingInput!]!) {
  addazureAutoProvisioningSetting(input: $input, upsert: true) {
    numUids
  }
}`;
