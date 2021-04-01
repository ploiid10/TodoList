const moment = require('moment');
const {GraphQLScalarType} = require('graphql')
const {GraphQLError} = require('graphql/error')
const {Kind} = require('graphql/language')

const validate = (value) => {
  if (!moment(value).isValid()) {
    throw new TypeError(`Value is not a valid Date String: ${value}`)
  }
}

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'Date without timezone custom scalar type',
  parseValue(value) {
    validate(value)
    return value
  },
  serialize(value) {
    validate(value)
    return value
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only parse strings to dates but got a: ${ast.kind}`)
    }
    validate(ast.value)
    return ast.value
  }
})


module.exports = {
  GraphQLDate
}