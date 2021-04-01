import {createGlobalStyle} from 'styled-components'
import {Switch, Route, Redirect} from 'react-router-dom'

import Navbar from '../components/Navbar'

import routes from './routes'
function Layout() {
  return (
    <>
      <GlobalStyle/>
      <Navbar/>
      <Switch>
        {routes.map((route) => (
          <Route key={route.name} {...route}/>
        ))}
        <Route
          exact
          path="/"
        >
          <Redirect
            to="/login"
          />
        </Route>
      </Switch>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  html {
    min-height: 100%;
  }

  body {
    min-height: 100%;
    background-color: white;
    margin: 0;
    padding: 0;
  }
`

export default Layout