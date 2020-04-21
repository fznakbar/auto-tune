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
      <div className='logout'>
        <span>Logout</span>
      </div>
    </div>
  )
}

export default Navbar