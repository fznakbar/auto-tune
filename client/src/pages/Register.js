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
    } else {
      console.log('wrong password')
    }
  }

  return(
    <div className="register" style={{height : "100vh"}}>
    <h1 className="p-2" style={{color : "white", backgroundColor : "black", opacity : "50%"}}>Auto Tune</h1>
    {/* <img className="img mt-0 p-0" alt="" src="../assets/logo.png" style={{"width : 15%;"></img> */}
      <div className="m-5" style={{display: "flex", flexDirection: "row", justifyContent : "center", alignContent : "center", alignItems : "center", flexWrap : "nowrap"}}>
        <div className="card" style={{opacity: "70%", backgroundColor: "black"}}>
          <h1 style={{color : "white", textAlign : "center"}} className="mt-3">Register</h1>
          <form onSubmit={register} className="ml-3 mr-3 mb-4 mt-2 p-3">
            <div className="form-group">
              <label style={{color : "white"}}>Email address :</label>
              <input onChange={e => setEmail(e.target.value)} style={{color : "black"}} type="email" className="form-control" required></input>
            </div>
            <div className="form-group">
              <label style={{color : "white"}}>Password :</label>
              <input onChange={e => setPassword(e.target.value)} style={{color : "black"}} type="password" className="form-control" required></input>
            </div>
            <div className="form-group">
              <label style={{color : "white"}}>Confirm Password :</label>
              <input onChange={e => setConfirmPassword(e.target.value)} style={{color : "black"}} type="password" className="form-control" required></input>
            </div>
            <button type="submit" className="btn btn-warning mb-1">Register</button><br></br>
            <button onClick={loginPage} className="btn btn-clear" style={{color : "#0048d9"}}>Already register ? Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register