const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {verifyToken} = require('../utils/token');

const router = express.Router();

const schema = require('./schema');

router.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Allow', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
}, graphqlHTTP(req => {
  return {
    schema,
    pretty: true,
    graphiql: true,
    context: {
      authenticate: () => {
        // flag req that auth was required
        req.requireAuth = true
        return verifyToken(req)
      },
    }
  }
}));

module.exports = router