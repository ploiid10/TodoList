/* eslint-disable no-unused-vars */
import {useState} from 'react'
import debounce from 'lodash/debounce'
import {useMutation} from '@apollo/client'
import moment from 'moment'
import PropTypes from 'prop-types'

import FormWrapper from '../../components/FormWrapper'
import InputText from '../../components/InputText'
import {requiredValidation} from '../../constants/validations'
import addTaskMutation from '../../graphql/addTask'

function AddTask({history}){

  const [note, setNote] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [addTask, {data}] = useMutation(addTaskMutation)
  
  const handleNoteChange = debounce((e) => {
    setNote(e.target.value)
    const noteError = !requiredValidation(e.target.value) ? 'Note is required' : null
    setErrors((errors) => ({
      ...errors,
      note: noteError,
    }))
  }, 200)

  const handleTimeChange = debounce((e) => {
    setTime(e.target.value)
  }, 200)

  const handleDateChange = debounce((e) => {
    setDate(e.target.value)
  }, 200)

  const handleButtonClick = async () => {
    const newDate = moment(`${date} ${time}`)
    setSubmitting(true)
    await addTask({
      variables: {
        input: {
          note,
          date: newDate,
        },
      },
    })

    history.push('/tasks')
  }
  
  const isValid = note && time && date

  return (
    <FormWrapper>
      <div>
        <InputText
          type="text"
          name="note"
          label="Note"
          onChange={(e) => handleNoteChange(e)}
          error={errors && errors.note}
        />
        <InputText
          type="date"
          name="date"
          label="Date"
          onChange={(e) => handleDateChange(e)}
          error={errors && errors.date}
        />
        <InputText
          type="time"
          name="time"
          time="Time"
          onChange={(e) => handleTimeChange(e)}
          error={errors && errors.time}
        />
        <button
          type="button"
          disabled={submitting}
          className={!isValid ? 'is-not-valid' : 'is-valid'}
          onClick={handleButtonClick}
        >
          Add Task
        </button>
      </div>
    </FormWrapper>
  )
}

AddTask.propTypes = {
  history: PropTypes.object.isRequired,
}

export default AddTask