import React from 'react'
import axios from 'axios';
import Icontrash from '../listbeat/icon/Icon-trash'
import './listbeat.css'
const Listbeat = (props) => {
  const deleteData = () => {
    const { id } = props
    axios({
      method: 'DELETE',
      url: `http://localhost:3000/musics/${id}`,
      headers: {
        id: localStorage.id
      }
    })
  }
  return (
    <div className='bar'>
      <div className='container-bar-player'>
        <div className='content-player'>
          <div className='circle-play-btn'>
            <div><i className="fas fa-music"></i></div>
          </div>
          <span>
            {props.title}
          </span>
        </div>
      </div>
      <div onClick={deleteData}>
        <Icontrash />
      </div>
    </div>
  )
}

export default Listbeat