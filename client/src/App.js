import React from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css'

import store from './store'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Topstar'
import Topstar from './pages/Topstar'
import Beat from './pages/Beat'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/top-star">
            <Topstar />
          </Route>

          <Route path="/beat">
            <Beat />
          </Route>

        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
