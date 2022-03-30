export default `mutation($input: [AddazureDataLakeStorageAccountInput!]!) {
  addazureDataLakeStorageAccount(input: $input, upsert: true) {
    numUids
  }
}`;
