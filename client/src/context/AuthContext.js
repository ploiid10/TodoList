/* eslint-disable react-hooks/exhaustive-deps */
// Libraries
import React, {useContext, useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'

// Constants
import {AUTH_LOCAL_STORAGE_KEY} from '../constants/auth'
import auth from '../clients/auth'

const userInitialState = {
  firstName: null,
  lastName: null,
  email: null,
  userID: null,
}

const AuthContext = React.createContext({
  user: userInitialState,
  login: async () => {},
  logout: () => {},
  signup: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(userInitialState)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    const data = await auth.checkAuth()
    
    initializeUser(data)
    setLoading(false)
  }

  const initializeUser = (data) => {
    if (!data) {
      logout()

      return
    }

    const {token, ...user} = data
    

    setUser(user)

    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, token)
  }

  const signup = async (input) => {
    const response = await auth.signup(input)

    const {error: responseError, token} = response


    let success = false
    let error = null

    if (responseError) {
      error = responseError
    }

    if (token) {
      localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, token)

      await checkAuth()

      success = true
      error = null
    }

    return {
      success,
      error,
    }
  }

  const login = async (email, password) => {

    const response = await auth.login({
      email,
      password,
    })

    const {error: responseError, token} = response

    let success = false
    let error = null

    if (responseError) {
      error = responseError
    }

    if (token) {
      localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, token)

      await checkAuth()

      success = true
      error = null
    }

    return {
      success,
      error,
    }
  }

  const logout = () => {
    setUser(userInitialState)
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const memoizedUser = useMemo(() => (user), [user])

  return (
    <AuthContext.Provider
      value={{
        user: memoizedUser,    
        login,
        logout,
        signup,
      }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}