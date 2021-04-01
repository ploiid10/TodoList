import {gql} from '@apollo/client'

const addTaskMutation = gql`
  mutation addTask($input: AddTaskInput!) {
    addTask(input: $input) {
      success
    }
  }
`

export default addTaskMutation