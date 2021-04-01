import {gql} from '@apollo/client'

const updateTaskMutation = gql`
  mutation updateTask($input: TaskInput!) {
    updateTask(input: $input) {
      success
    }
  }
`

export default updateTaskMutation