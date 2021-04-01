import {useQuery, useMutation} from '@apollo/client'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import tasksQuery from '../../graphql/tasks'
import deleteTaskMutation from '../../graphql/deleteTask'

const Wrapper = styled.div`
  display: block;
  margin: 4rem 8rem;
  .no-tasks-content {
    margin-top: 5rem;
    text-align: center;
  }

  .add-task-action {
    text-align: center;
    padding: 3rem 0;
   .btn-add-task {
    background-color: #23aaaa;
    border-color: #23aaaa;
    border: none;
    padding: 10px;
    color: #fff;
    border-radius: 4px;
   } 
  }

  .has-task {
    float: right;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;

    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    tr:nth-child(2) {
      background-color: #dddddd;
    }
    button {
      border: none;
      border-radius: 2px;
      color: #fff;
      padding: 0.5rem;
      outline: none;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }

      &.update {
        background-color: #008CBA;
      }

      &.delete {
        background-color: #f44336;
      }

      &:first-child {
        margin-right: 0.5rem;
      }
    }
  }
`

function Tasks({
  history,
}) {

  const {loading, data, refetch} = useQuery(tasksQuery, {
    fetchPolicy: 'network-only',
  })

  const [deleteTask] = useMutation(deleteTaskMutation)
  const handleAddTask = () => history.push('/add-task')
  const handleDeleteTask = async (taskID) => {
    await deleteTask({
      variables: {
        input: {taskID},
      },
    })
    await refetch()
  }

  if (loading) {
    return (
      <div>Fetching tasks..</div>
    )
  }

  const tasks = data && data.me && data.me.tasks
  

  return (
    <Wrapper>
      <div className="add-task-action">
        <button className={`btn-add-task ${tasks.length > 0 && 'has-task'}`} onClick={handleAddTask}>Add task</button>
      </div>
      {tasks && tasks.length < 1 && (
        <div className="no-tasks-content">
          You do not have any tasks as of the moment!
        </div>
      )}
      {tasks && tasks.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>
              Task Note
              </th>
              <th>
              Date
              </th>
              <th>
              Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const handleClickEdit = () => {
                history.push(`/task/${task.taskID}`)
              }
              return (
                <tr key={task.taskID}>
                  <td>
                    {task.note}
                  </td>
                  <td>
                    {moment(task.date).format('YYYY-MM-DD hh:mm a')}
                  </td>
                  <td>
                    <button className="update" onClick={handleClickEdit}>Edit</button>
                    <button className="delete" onClick={() => handleDeleteTask(task.taskID)}>Delete</button>
                  </td>
                </tr>
              )})}
          </tbody>
        </table>
      )}
    </Wrapper>
  )
}

Tasks.propTypes = {
  history: PropTypes.object,
}

Tasks.defaultProps = {
  history: null,
}

export default Tasks