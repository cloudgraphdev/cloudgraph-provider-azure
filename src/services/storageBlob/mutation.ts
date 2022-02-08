export default `mutation($input: [AddazureStorageBlobInput!]!) {
  addazureStorageBlob(input: $input, upsert: true) {
    numUids
  }
}`
