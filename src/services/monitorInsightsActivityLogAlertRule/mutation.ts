export default `mutation($input: [AddazureMonitorInsightsActivityLogAlertRuleInput!]!) {
  addazureMonitorInsightsActivityLogAlertRule(input: $input, upsert: true) {
    numUids
  }
}`
