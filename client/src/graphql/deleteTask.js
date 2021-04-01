import {gql} from '@apollo/client'

const deleteTaskMutation = gql`
  mutation deleteTask($input: TaskInput!) {
    deleteTask(input: $input) {
      success
    }
  }
`

export default deleteTaskMutation