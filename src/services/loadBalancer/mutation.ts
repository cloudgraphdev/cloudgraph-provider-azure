export default `mutation($input: [AddazureLoadBalancerInput!]!) {
  addazureLoadBalancer(input: $input, upsert: true) {
    numUids
  }
}`;
