import {ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat} from '@apollo/client'

import history from '../services/history'
import {ERRORS as ERROR_TEXT, AUTH_LOCAL_STORAGE_KEY} from '../constants/auth'
import {getToken} from '../utils/token'

const GRAPHQL_HOST = process.env.GRAPHQL_HOST || 'http://localhost:5000/graphql'

const httpLink = new HttpLink({uri: GRAPHQL_HOST})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: getToken(),
    },
  })

  return forward(operation).map((item) => {
    if (item.data && item.data.token) {
      localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, item.data.token)
    }

    const ERRORS = [
      ERROR_TEXT.AUTH_REQUIRED,
    ]

    const {pathname} = history.location

    if (item.errors) {
      const {message} = item.errors[0]

      const error = ERRORS.find((error) => message.includes(error))
      const authenticatedPaths = [
        '/tasks',
      ]

      const pathFound = authenticatedPaths.find((path) => pathname.includes(path))

      if (pathFound && error) {
        history.push('/login')
      }
    }
    
    return item
  })
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      me: {
        fields: {
          tasks: {
            merge: false,
          },
        },
      },
    },
  }),
})

export default client