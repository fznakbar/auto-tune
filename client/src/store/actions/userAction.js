import axios from 'axios'


export const login = data => {
  return async dispatch => {
    const res = await fetch('API')
    const user = await res.json()
    dispatch({
      type: 'LOGIN',
      payload: user
    })
  }
}

export const musics = (id) => async (dispatch) => {
  axios({
    method: 'GET',
    url: `https://gentle-crag-62773.herokuapp.com/users/${id}`,
    headers: {
      token: localStorage.token
    }
  })
    .then(({ data }) => {
      // console.log(data.Music, '<<<< data action')
      dispatch({
        type: 'MUSIC',
        payload: data.Music
      })

    })
    .catch(err => err)
}

export const updateMusic = (id) => async (dispatch, useState) => {
  const musicList = useState(state => state.userReducer.musics);
  const newMusicList = musicList.userReducer.musics.filter(x => {
    return x.id !== id;
  });
  dispatch({
    type: 'UPDATE_MUSIC',
    payload: newMusicList
  })
}

export const addMusic = (data) => async dispatch => {
  dispatch({
    type: 'ADD_MUSIC',
    payload: data
  })
}