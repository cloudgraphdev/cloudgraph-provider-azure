export default `mutation($input: [AddazureRedisCacheInput!]!) {
  addazureRedisCache(input: $input, upsert: true) {
    numUids
  }
}`;
