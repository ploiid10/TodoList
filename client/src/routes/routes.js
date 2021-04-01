import React from 'react'

import renderSuspense from './renderSuspense'

const Login = React.lazy(() => import('./Login'))
const Tasks = React.lazy(() => import('./Tasks'))
const Task = React.lazy(() => import('./Task'))
const AddTask = React.lazy(() => import('./AddTask'))
const Signup = React.lazy(() => import('./Signup'))
 
const routes = [{
  path: '/login',
  name: 'login',
  exact: true,
  render: renderSuspense(Login),
}, {
  path: '/signup',
  exact: true,
  name: 'signup',
  render: renderSuspense(Signup),
}, {
  path: '/tasks',
  name: 'tasks',
  exact: true,
  render: renderSuspense(Tasks, {
    requireAuth: true,
  }),
}, {
  path: '/task/:taskID',
  name: 'tasks',
  exact: true,
  render: renderSuspense(Task, {
    requireAuth: true,
  }),
}, {
  path: '/add-task',
  name: 'add-task',
  exact: true,
  render: renderSuspense(AddTask, {
    requireAuth: true,
  }),
}]

export default routes