import queryString from 'query-string'
import decode from 'jwt-decode'

import history from '../services/history'
// Constants
import {AUTH_LOCAL_STORAGE_KEY, ERRORS} from '../constants/auth'

const {INVALID_TOKEN_ERROR} = ERRORS
/**
 * Create specific error for decode token util.
 *
 * @param {String} message Error message
 * @returns {Error} Error object
 */
const createError = (message) => {
  const error = new Error(`Authentication Service: validateAndDecodeToken > ${message}`)
  error.name = INVALID_TOKEN_ERROR
  return error
}

export const getToken = ()  => {
  // Get token from query string
  const query = queryString.parse(history.location.search)

  // If query token does not exist, get from local storage
  return query.token ? query.token : localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
}

/**
 * Decode an unexpired token.
 *
 * @param {String} token jwt token
 *
 * @returns {Object|null} Decoded token
 */
export const validateAndDecode = (token) => {
  if (!token) {
    throw createError('No token provided.')
  }

  const decoded = decode(token)

  if (!decoded) {
    throw createError('Token is invalid.')
  }

  const {exp} = decoded

  const currentTime = new Date().getTime() / 1000

  if (currentTime > exp) {
    throw createError('Token is expired.')
  }

  return decoded
}