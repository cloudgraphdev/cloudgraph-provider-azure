export default `mutation($input: [AddazureMachineLearningWorkspaceInput!]!) {
  addazureMachineLearningWorkspace(input: $input, upsert: true) {
    numUids
  }
}`;
