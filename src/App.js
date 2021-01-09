import './App.css'
import React, { useState, useEffect } from 'react'
import Home from './containers/home'
import { BrowserRouter as Router, 
         Route, 
         Switch } from 'react-router-dom'
import Projects from './containers/projects'
import AddProjects from './containers/add-projects'
import Login from './containers/login'
import { auth } from './services/firebase'
import PrivateRoute from './HOCs/PrivateRoute'
import PublicRoute from './HOCs/PublicRoute'

const App = () => {

  const [authentication, setAuthState] = useState({
    authenticated: false,
    initializing: true
  });

  useEffect(() => auth.onAuthStateChanged(user => {
    if (user)
      setAuthState({
        authenticated: true,
        initializing: false
      })
    else
      setAuthState({
        authenticated: false,
        initializing: false
      })
  }), [setAuthState])

  if (authentication.initializing) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="sr-only" />
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/projects">
            <Projects />
          </Route>

          <PublicRoute 
            path="/login" 
            authenticated={authentication.authenticated} 
            component={Login} />

          <PrivateRoute 
            path="/add-projects" 
            authenticated={authentication.authenticated} 
            component={AddProjects} />

        </Switch>
      </Router>
    </div>
  )
}

export default App;
