import React from 'react'
import { useHistory } from 'react-router-dom'
import '../navbar/navbar.css'

const Navbar = (props) => {
  const history = useHistory()
  const beat = () => {
    if(props.localStream) {
      props.localStream.getTracks()[0].stop();
    }
    clearInterval(props.interval);
    history.push('/beat');
  }
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    history.push('/login');
  }
  return (
    <div className='navbar-container'>
      <div className='menu-container'>
        <div className='menu-item' onClick={() => { history.push('/') }}>
          <span>Studio</span>
        </div>
        <div className='menu-item' onClick={ beat }>
          <span>Beat</span>
        </div>
      </div>
      { localStorage.getItem('token') ? 
      <div className='logout' onClick={ logout }>
        <span>Logout</span>
      </div>
      :
      <div className='logout' onClick={ () => history.push('/login') }>
        <span>Login</span>
      </div>
      }
    </div>
  )
}

export default Navbar