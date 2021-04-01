const {GraphQLDate} = require('./custom-types');

const {mergeTypeDefs} = require('@graphql-tools/merge');

const ScalarDate = `
# Scalar for Date
scalar GraphQLDate
`
const TaskTypeDef = `
# Represents a Task
type Task {
  taskID: String
  note: String
  date: GraphQLDate
}
`

const TaskInputTypeDef = `
input TaskInput {
  taskID: String!
  note: String
  date: GraphQLDate
}
`

const AddTaskInputTypeDef = `
input AddTaskInput {
  note: String!
  date: GraphQLDate!
}
`

const SuccessPayloadTypeDef = `
type SuccessPayload {
  success: Boolean
}
`

const QueryTypeDef = `
type Query {
  task(
    input: TaskInput!
  ): Task
}
`

const MutationTypeDef = `
type Mutation {
  deleteTask(
    input: TaskInput!
  ): SuccessPayload
  
  updateTask(
    input: TaskInput!
  ): SuccessPayload

  addTask (
    input: AddTaskInput!
  ): SuccessPayload
}
`

module.exports = {
  typeDefs: mergeTypeDefs([
    TaskTypeDef,
    // Inputs
    TaskInputTypeDef,
    AddTaskInputTypeDef,
    //Payloads,
    SuccessPayloadTypeDef,
    // Query and Mutations
    QueryTypeDef,
    MutationTypeDef,
    ScalarDate,
  ]),
  resolvers: {
    GraphQLDate,
  }
}