export default `mutation($input: [AddazureStorageAccountInput!]!) {
  addazureStorageAccount(input: $input, upsert: true) {
    numUids
  }
}`;
