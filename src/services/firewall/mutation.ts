export default `mutation($input: [AddazureFirewallInput!]!) {
  addazureFirewall(input: $input, upsert: true) {
    numUids
  }
}`;
