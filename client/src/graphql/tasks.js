import {gql} from '@apollo/client'

const tasksQuery = gql`
  query {
    me {
      tasks {
        note
        taskID
        date
      }
    }
  }
`

export default tasksQuery