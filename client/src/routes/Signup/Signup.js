import {useState} from 'react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'

import FormWrapper from '../../components/FormWrapper'
import InputText from '../../components/InputText'
import {requiredValidation, emailValidation} from '../../constants/validations'
import {useAuth} from '../../context/AuthContext'

function Signup({
  history,
}) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const {signup} = useAuth()

  const handleSetError = (key, value) => setErrors((errors) => ({
    ...errors,
    [key]: value,
  }))

  const handleFirstNameChange = debounce((e) => {
    setFirstName(e.target.value)
    const value = !requiredValidation(e.target.value) ? 'First name is required' : null
    handleSetError('firstName', value)
  }, 200)

  const handleLastNameChange = debounce((e) => {
    setLastName(e.target.value)
    const value = !requiredValidation(e.target.value) ? 'Last name is required' : null
    handleSetError('lastName', value)
  }, 200)

  const handleEmailChange = debounce((e) => {
    setEmail(e.target.value)
    const value = !emailValidation(e.target.value) ? 'Invalid email' : null
    handleSetError('email', value)
  }, 200)

  const handlePasswordChange = debounce((e) => {
    setPassword(e.target.value)
    const value = !requiredValidation(e.target.value) ? 'Password is required' : null
    handleSetError('password', value)
  }, 200)

  const isValid = !(errors 
    && (errors.firstName || errors.lastName 
      || errors.email || errors.password)
  )

  const handleSignup = async () => {
    const response = await signup({
      firstName,
      lastName,
      password,
      email,
    })
    if (response.success) {
      history.push('/tasks')
    } 
  }


  return (
    <FormWrapper>
      <div>
        <InputText
          type="text"
          name="firstName"
          label="First Name"
          onChange={(e) => handleFirstNameChange(e)}
          error={errors && errors.firstName}
        />        
        <InputText
          label="Last Name"
          type="text"
          name="lastName"
          onChange={(e) => handleLastNameChange(e)}
          error={errors && errors.lastName}
        />        
        <InputText
          type="text"
          name="email"
          label="Email"
          error={errors && errors.email}
          onChange={(e) => handleEmailChange(e)}
        />        
        <InputText
          type="password"
          name="password"
          label="Password"
          error={errors && errors.password}
          onChange={(e) => handlePasswordChange(e)}
        />      

        <button
          className={!isValid ? 'is-not-valid' : 'is-valid'}
          disabled={!isValid}
          onClick={handleSignup}
        >
          Signup
        </button>  

        <button
          className="signup"
          onClick={() => history.push('/login')}
        >
          Login
        </button>
      </div>
    </FormWrapper>
  )
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Signup