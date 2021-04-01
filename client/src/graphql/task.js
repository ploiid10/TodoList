import {gql} from '@apollo/client'

const taskQuery = gql`
  query task($input: TaskInput!){
    task (input: $input){
      taskID
      date
      note
    }
  }
`

export default taskQuery