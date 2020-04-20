import React from 'react'
import '../navbar/navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className='menu-container'>
        <div className='menu-item'>
          <span>Studio</span>
        </div>
        <div className='menu-item'>
          <span>Top Star</span>
        </div>
        <div className='menu-item'>
          <span>Beat</span>
        </div>
        <div className='menu-item'>
          <span>Profile</span>
        </div>
      </div>
      <div className='logout'>
        <span>Logout</span>
      </div>
    </div>
  )
}

export default Navbar