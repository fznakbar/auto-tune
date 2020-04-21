import React from 'react'
import './beat.css'
import Navbar from '../components/navbar/navbar'
import Listbeat from '../components/listbeat/Listbeat'
import Arrowleft from '../components/arrows/Arrow-left'
import Arrowrigth from '../components/arrows/Arrow-rigth'
import Prev from '../components/playbtn/Prev'
import Forward from '../components/playbtn/forward'
import Play from '../components/playbtn/Play'


const Beat = () => {
  return (
    <div>
      <Navbar />
      <div className='container-beat'>
        <div className='container-list'>
          <Listbeat />
          <Listbeat />
          <Listbeat />
          <Listbeat />
          <Listbeat />
          <Listbeat />
          <Listbeat />
          <Listbeat />
          <Listbeat />
          <Listbeat />
        </div>
        <div className='container-thumbPlay'>
          <div className='container-arrow'>
            <Arrowleft />
            <Arrowrigth />
          </div>
          <div className='container-Coverplay'>
            <div className='cove-play'>
              <img src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' width='100%' height='100%' alt=''></img>
            </div>
          </div>
          <div className='songtitle'>
            <span>Song Title</span>
          </div>
          <div className='control-play'>
            <Prev />
            <Play />
            <Forward />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Beat