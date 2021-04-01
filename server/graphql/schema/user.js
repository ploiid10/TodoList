const { mergeTypeDefs } = require('@graphql-tools/merge');

const UserTypeDef = `
# Represents a user
type User {
  email: String
  firstName: String
  lastName: String
  password: String
  userID: String
  tasks: [Task]
}
`

const LoginInputTypeDef = `
# Input type for logging in
input LoginInput {
  email: String!
  password: String!
}
`

const TokenPayload = `
# Payload type def for logged in user
type TokenPayload {
  token: String
}
`

const UserInputTypeDef = `
# Input for creating a User
  input UserInput {
    firstName: String!
    lastName: String!
    password: String!
    email: String!
  }
`

const QueryTypeDef = `
type Query {
  me: User
}
`

const MutationsTypeDef = `
type Mutation {
  login(
    input: LoginInput!
  ): TokenPayload

  signup(
    input: UserInput!
  ): TokenPayload
}
`

module.exports = {
  typeDefs: mergeTypeDefs([
    UserTypeDef,
    // Input types
    LoginInputTypeDef,
    UserInputTypeDef,
    // Payloads
    TokenPayload,
    // Queries and Mutations
    QueryTypeDef,
    MutationsTypeDef,
  ])
}