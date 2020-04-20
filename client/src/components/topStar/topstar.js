import React from 'react'
import '../topStar/topstar.css'


const Topstar = () => {
  return (
    <div className='container-card'>
      <div className='profile'>
        {/* <img src='https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' width='100%' height='100%' object-fit='fill'></img> */}
      </div>
      <h5>Song Title</h5>
      <h6>Name Profile</h6>
      <div className='icon-love'>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </span>
        <span>10</span>
      </div>
    </div>
  )
}

export default Topstar