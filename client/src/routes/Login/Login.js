/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import {useAuth} from '../../context/AuthContext'
import InputText from '../../components/InputText'
import FormWrapper from '../../components/FormWrapper'
import {emailValidation, requiredValidation} from '../../constants/validations'



function Login({history}) {
  const {login} = useAuth()

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = async () => {
    setErrors((errors) => ({
      ...errors,
      loginError: null,
    }))
    const response = await login(email, password)
    if (response && response.error) {
      return setErrors((errors) => ({
        ...errors,
        loginError: response.error.message,
      }))
    }
    history.push('/tasks')
  }

  const handleEmailChange = debounce((e) => {
    // eslint-disable-next-line no-console
    setEmail(e.target.value)
    const emailError = !emailValidation(e.target.value) ? 'Email is not valid' : null
    setErrors((errors) => ({
      ...errors,
      email: emailError,
    }))

  }, 200)

  const handlePasswordChange = debounce((e) => {
    setPassword(e.target.value)
    const passwordError = !requiredValidation(e.target.value) ? 'Password is required' : null
    setErrors((errors) => ({
      ...errors,
      password: passwordError,
    }))

  }, 200)
  
  const handleSignup = () => history.push('/signup')

  const isValidForm = !(errors && (errors.email || errors.password))
  return (
    <FormWrapper>
      <div>
        <form>
          <InputText 
            type="text" 
            label="Email" 
            onChange={(e) => handleEmailChange(e)}
            error={errors && errors.email}
          />
          <InputText 
            type="password" 
            label="Password"
            onChange={(e) => handlePasswordChange(e)}
            error={errors && errors.password}
          />
          <button 
            disabled={!isValidForm} 
            type="button"
            className={!isValidForm || (!email && !password) ? 'is-not-valid' : 'is-valid'} 
            onClick={handleClick}
          >
            Login
          </button>

          <button 
            type="button"
            className="signup"
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>
        {errors && errors.loginError && (
          <div className="login-error">
            {errors.loginError}
          </div>
        )}
      </div>
    </FormWrapper>
  )
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Login