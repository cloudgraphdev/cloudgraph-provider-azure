export default `mutation($input: [AddazureVirtualMachineScaleSetInput!]!) {
  addazureVirtualMachineScaleSet(input: $input, upsert: true) {
    numUids
  }
}`
