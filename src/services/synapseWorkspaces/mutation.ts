export default `mutation($input: [AddazureSynapseWorkspaceInput!]!) {
  addazureSynapseWorkspace(input: $input, upsert: true) {
    numUids
  }
}`;
