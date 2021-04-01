import {useState, useEffect} from 'react'

import {useAuth} from '../context/AuthContext'
import {getToken, validateAndDecode} from '../utils/token'

function GuardedRouteRenderer({
  render,
  history,
}) {
  const [guardConditionPass, setGuardConditionPass] = useState(false)
  const {user} = useAuth()
  const checkAuth = () => {
    try {
      const token = getToken()
      if (!user || !token) {
        const error = new Error('User authentication is needed.')
        error.name = 'Unauthorized user.'
  
        throw error
      }
  
      validateAndDecode(token)
  
      setGuardConditionPass(true)
    } catch (err) {
      history.push('/login')
    }
  
  }
  useEffect(() => {
    checkAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return guardConditionPass ? render : null
}

export default GuardedRouteRenderer