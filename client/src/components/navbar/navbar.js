import React from 'react'
import { useHistory } from 'react-router-dom'
import '../navbar/navbar.css'

const Navbar = () => {
  const history = useHistory()
  return (
    <div className='navbar-container'>
      <div className='menu-container'>
        <div className='menu-item' onClick={() => { history.push('/') }}>
          <span>Studio</span>
        </div>
        <div className='menu-item' onClick={() => { history.push('/beat') }}>
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