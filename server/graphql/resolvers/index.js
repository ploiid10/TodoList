const {mergeResolvers} = require("@graphql-tools/merge");

const userResolvers = require('./user');
const taskResolvers = require('./task');

module.exports = mergeResolvers([
  userResolvers,
  taskResolvers,
])