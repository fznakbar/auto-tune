import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Register(){
  let history = useHistory()
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')

  const loginPage = () =>{
    history.push('/login')
  }

  const register = (e) => {
    e.preventDefault()
    if(password === confirmPassword){
      console.log(email, password)
      history.push("/")
    } else {
      console.log('wrong password')
    }
  }

  return(
    <div className="register" style={{height : "100vh"}}>
    <h1 className="pb-0" style={{textAlign : "right", paddingTop : "70px", paddingRight : "70px"}}>Create your account</h1>
    <h2 className="mt-0 pb-0" style={{textAlign : "right", paddingRight : "70px"}}>It's free</h2>
      <div style={{position : 'absolute', textAlign : "left", right : "150px"}}>
          <h1 style={{textAlign : "center"}} className="mt-5">Register</h1>
            <form onSubmit={register}>
              <label>Username :</label>
              <input onChange={e => setEmail(e.target.value)} style={{color : "black"}} type="text" className="form-control" required></input>
              <label>Password :</label>
              <input onChange={e => setPassword(e.target.value)} style={{color : "black"}} type="password" className="form-control" required></input>
              <label>Confirm Password :</label>
              <input onChange={e => setConfirmPassword(e.target.value)} style={{color : "black"}} type="password" className="form-control" required></input>
              <button type="submit" className="btn btn-warning mb-1 mt-4">Register</button><br></br>
              <button onClick={loginPage} className="btn btn-clear" style={{color : "#0048d9"}}>Already have an account ? Login</button>
            </form>
        </div>
    </div>
  )
}

export default Register