import React from 'react';
import Navbar from '../components/navbar/navbar'
import Topstar from '../components/topStar/topstar'
import './home.css'

function Home() {
  return (
    <div>
      <Navbar />
      <div className='container-home'>
        <Topstar />
        <Topstar />
        <Topstar />
        <Topstar />
        <Topstar />
        <Topstar />
        <Topstar />
        <Topstar />
        <Topstar />
        <Topstar />
      </div>
    </div>
  )
}



export default Home