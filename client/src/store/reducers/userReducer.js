const defaultState = {
  user: [],
  musics: []
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return state
    case 'MUSIC':
      return { ...state, musics: state.musics.concat(action.payload) }
    default:
      return state
  }
}

export default userReducer