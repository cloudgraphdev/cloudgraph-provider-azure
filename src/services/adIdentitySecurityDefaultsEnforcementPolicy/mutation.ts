export default `mutation($input: [AddazureAdIdentitySecurityDefaultsEnforcementPolicyInput!]!) {
  addazureAdIdentitySecurityDefaultsEnforcementPolicy(input: $input, upsert: true) {
    numUids
  }
}`;
