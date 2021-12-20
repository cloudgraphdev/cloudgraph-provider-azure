export default `mutation($input: [AddazureVirtualMachineInput!]!) {
  addazureVirtualMachine(input: $input, upsert: true) {
    numUids
  }
}`;
