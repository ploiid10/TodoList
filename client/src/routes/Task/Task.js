/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useQuery, useMutation} from '@apollo/client'
import moment from 'moment'
import debounce from 'lodash/debounce'

import taskQuery from '../../graphql/task'
import updateTaskMutation from '../../graphql/updateTask'
import FormWrapper from '../../components/FormWrapper'
import InputText from '../../components/InputText'
import {requiredValidation} from '../../constants/validations'

function Task({
  match,
  history,
}) {

  const {taskID} = match.params
  const {loading, data} = useQuery(taskQuery, {
    variables: {
      input: {taskID},
    },
    fetchPolicy: 'network-only',
  })
  const [updateTask] = useMutation(updateTaskMutation)

  const [note, setNote] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [id, setTaskID] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (data && data.task && !loading) {
      const {task} = data
      setNote(task.note)
      setDate(moment(task.date).format('yyyy-MM-DD'))
      setTime(moment(task.date).format('HH:mm'))
      setTaskID(task.taskID)
    }
  }, [data, loading])


  if (loading) {
    return (
      <div>
        Fetching Task data...
      </div>
    )
  }


  const handleDateChange = debounce((e) => {
    setDate(e.target.value)
  }, 200)

  const handleNoteChange = debounce((e) => {
    setNote(e.target.value)
    const noteError = !requiredValidation(e.target.value) ? 'Note is required' : null
    setError((error) => ({
      ...error,
      note: noteError,
    }))
  }, 200)
  
  const handleTimeChange = debounce((e) => {
    setTime(e.target.value)
  }, 200)

  const handleSubmit = async () => {
    const newDate = moment(`${date} ${time}`)
    await updateTask({
      variables: {
        input: {
          date: newDate,
          taskID: id,
          note,
        },
      },
    })
    history.push('/tasks')
  }

  const isValid = !!note

  return (
    <FormWrapper>
      <div>
        <form>
          <InputText
            type="text"
            label="Note"
            name="note"
            defaultValue={note}
            onChange={(e) => handleNoteChange(e)}
            error={error && error.note}
          />
          <InputText
            type="date"
            label="Date"
            name="date"
            defaultValue={date}
            onChange={(e) => handleDateChange(e)}
          />
          <InputText
            type="time"
            label="Time"
            name="time"
            defaultValue={time}
            onChange={(e) => handleTimeChange(e)}
          />
          <button 
            type="button" 
            className={!isValid ? 'is-not-valid' : 'is-valid'} 
            onClick={handleSubmit}
          >
            Update
          </button>
        </form>
      </div>
    </FormWrapper>
  )
}

Task.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
}

Task.defaultProps = {
  match: null,
  history: null,
}



export default Task