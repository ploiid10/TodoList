// Libraries
import {gql} from '@apollo/client'

// Clients
import {getToken, validateAndDecode} from '../utils/token'

import graphql from './graphql'

// Utils

export const checkAuth = async () => {
  const token = getToken()

  try {
    if (!token) {
      throw new Error('No token found')
    }

    const decoded = validateAndDecode(token)

    if (!decoded) {
      throw new Error('Invalid token')
    }

    const query = gql`
      query me {
        me {
          userID
          email
          firstName
          lastName
        }
      }
    `

    const response = await graphql.query({
      query,
    })

    const {data} = response

    if (!data || !data.me) {
      return null
    }

    return {
      ...data.me,
      token,
    }
  } catch (error) {
    return null
  }
}


export const login = async (input) => {
  try {
    const mutation = gql `
      mutation login($input: LoginInput!) {
        auth: login(input: $input) {
          token
        }
      }
    `
    const response = await graphql.mutate({
      mutation,
      variables: {
        input,
      },
    })

    const {data} = response

    if (!data || !data.auth) {
      // TODO: Improve error
      throw new Error('Something wen\'t wrong')
    }

    return data.auth
  } catch (error) {
    return {error}
  }
}

export const signup = async (input) => {
  try {
    const mutation = gql `
      mutation signup($input: UserInput!) {
        auth: signup(input: $input) {
          token
        }
      }
    `
    const response = await graphql.mutate({
      mutation,
      variables: {
        input,
      },
    })

    const {data} = response

    if (!data || !data.auth) {
      // TODO: Improve error
      throw new Error('Something wen\'t wrong')
    }

    return data.auth
  } catch (error) {
    return {error}
  }
}

const auth = {
  checkAuth,
  login,
  signup,
}

export default auth