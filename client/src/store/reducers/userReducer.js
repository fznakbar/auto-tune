const defaultState = {
  user: [],
  musics: []
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'MUSIC':
      return { ...state, musics: action.payload }
    case 'UPDATE_MUSIC':
      return { ...state, musics: action.payload };
    case 'ADD_MUSIC':
      return { ...state, musics: state.musics.concat(action.payload) };
    default:
      return state
  }
}

export default userReducer