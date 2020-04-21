import React from 'react'
import axios from 'axios';
import Icontrash from '../listbeat/icon/Icon-trash'
import './listbeat.css'
import { updateMusic } from '../../store/actions/userAction';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
const Listbeat = (props) => {
  const dispatch = useDispatch();
  const deleteData = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        const { id } = props
        axios({
          method: 'DELETE',
          url: `http://localhost:3000/musics/${id}`,
          headers: {
            token : localStorage.getItem('token')
          }
        })
          .then(() => {
            dispatch(updateMusic(id));
          })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
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