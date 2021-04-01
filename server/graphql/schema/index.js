const {mergeTypeDefs, mergeResolvers} = require('@graphql-tools/merge');
const {makeExecutableSchema} = require('graphql-tools');

const funcResolvers = require('../resolvers');

const {typeDefs: userTypeDefs} = require('./user');
const {
  typeDefs: taskTypeDefs, 
  resolvers: taskResolvers,
} = require('./task');

module.exports = makeExecutableSchema({
  typeDefs: mergeTypeDefs([
    taskTypeDefs,
    userTypeDefs
  ]),
  resolvers: mergeResolvers([
    funcResolvers,
    taskResolvers,
  ]),
})