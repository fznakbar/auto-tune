import React from 'react'
import IconComment from '../listbeat/icon/Icon-comment'
import Icontrash from '../listbeat/icon/Icon-trash'
import './listbeat.css'
const Listbeat = () => {
  return (
    <div className='bar'>
      <div className='container-bar-player'>
        <div className='content-player'>
          <div className='circle-play-btn'>
            <div><i class="fas fa-play"></i></div>
          </div>
          <span>
            Song Tittle
      </span>
        </div>
        <div className='box-icon-thumbs'>
          <div className='thumbs'>
            <div className='icon'>
              <i class="fas fa-thumbs-up"></i>
            </div>
            <span>10</span>
          </div>
          <div className='thumbs'>
            <div className='icon'>
              <i class="fas fa-thumbs-down"></i>
            </div>
            <span>5</span>
          </div>
        </div>
      </div>
      <IconComment />
      <Icontrash />
    </div>
  )
}

export default Listbeat