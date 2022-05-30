import './App.css'
import React, { useState, useEffect } from 'react'
import Home from './containers/home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Projects from './containers/projects'
import AddProjects from './containers/add-projects'
import Login from './containers/login'
import { auth } from './services/firebase'
import PrivateRoute from './HOCs/PrivateRoute'
import PublicRoute from './HOCs/PublicRoute'
import Blogs from './containers/blogs'
import Blog from './components/blog/blog'
import Admin from './containers/admin'

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

          <Route exact path="/blog">
            <Blogs />
          </Route>

          <Route exact path="/blog/:id">
            <Blog />
          </Route>

          <PublicRoute 
            exact path="/login" 
            authenticated={authentication.authenticated} 
            component={Login} />

          <PrivateRoute 
            exact path="/admin" 
            authenticated={authentication.authenticated} 
            component={Admin} />

          <PrivateRoute 
            exact path="/admin/add-projects" 
            authenticated={authentication.authenticated} 
            component={AddProjects} />

        </Switch>
      </Router>
    </div>
  )
}

export default App;
