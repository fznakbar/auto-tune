import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Login(){
  let history = useHistory()
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  const registerPage = () =>{
    history.push('/register')
  }

  const login = (e) => {
    e.preventDefault()
      axios({
        method: 'POST',
        url: 'https://gentle-crag-62773.herokuapp.com/users/login',
        data: {
          username,
          password
        }
      })
      .then(({ data }) => {
        console.log(data)
        localStorage.setItem('id', data.id)
        localStorage.setItem('token', data.token)
        history.push("/")
      })
   
    history.push("/")
  }

  return(
    <div className="login" style={{height : "100vh"}}>
    <h1 className="pb-0" style={{textAlign : "right", paddingTop : "70px", paddingRight : "70px"}}>Welcome to, Auto Tune</h1>
    <h2 className="mt-0 pb-0" style={{textAlign : "right", paddingRight : "70px"}}>Where hands become a tone</h2>
      <div className="m-5" style={{display: "flex", flexDirection: "row", justifyContent : "left", flexWrap : "nowrap"}}>
        <div style={{position : 'absolute', textAlign : "left", right : "150px"}}>
          <h1 style={{textAlign : "center"}} className="mt-5">Login</h1>
            <form onSubmit={login}>
              <label>Username :</label>
              <input onChange={e => setUsername(e.target.value)} style={{color : "black"}} type="text" className="form-control" required></input>
              <label>Password :</label>
              <input onChange={e => setPassword(e.target.value)} style={{color : "black"}} type="password" className="form-control" required></input>
              <button type="submit" className="btn btn-warning mb-1 mt-4">Login</button><br></br>
              <button onClick={registerPage} className="btn btn-clear" style={{color : "#0048d9"}}>Don't have an account ? Register</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login