import React, { useEffect } from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css'


import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Beat from './pages/Beat'
import { useDispatch } from 'react-redux'
import { musics } from './store/actions/userAction'

function App() {
  const dispatch = useDispatch();
  const id = localStorage.id;
  useEffect(() => {
    if (localStorage.id) {
      dispatch(musics(id));
    }
    // eslint-disable-next-line
  }, [id])
  return (
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

          <Route exact path="/beat">
            <Beat />
          </Route>

        </Switch>
      </Router>
  );
}

export default App;
