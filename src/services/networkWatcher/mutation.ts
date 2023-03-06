export default `mutation($input: [AddazureNetworkWatcherInput!]!) {
  addazureNetworkWatcher(input: $input, upsert: true) {
    numUids
  }
}`;
