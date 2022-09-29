export default `mutation($input: [AddazureVmScaleSetInput!]!) {
  addazureVmScaleSet(input: $input, upsert: true) {
    numUids
  }
}`
